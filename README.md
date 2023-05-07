<a href="https://raebef.vercel.app/" target="_blank">프로젝트 링크</a>
<a href="https://github.com/RAREBEEF/raebef" target="_blank">깃헙 링크</a>

Next.js를 이용해 쇼핑몰 웹사이트를 제작해 보았다.
사용된 버전은 13이지만... 딱히 13에서 추가된 기능을 사용해보지는 않았다. 이번 프로젝트가 끝나면 13의 새로 추가된 기능을 한 번 경험해 볼 예정이다.

기존의 프로젝트에서는 상태 관리에 **redux**를 사용해 왔는데 딱히 만족스럽지는 않았다. 서버 상태 관리에 특화된 라이브러리가 아니기 때문에 간단한 데이터를 서버에서 불러와 앱 전역에 뿌려주기 위해 미들웨어, 액션과 리듀서를 작성하던 추억들이 아직까지 생생하다. 따라서 이번 프로젝트에서는 redux보다 **서버 상태를 관리**하는데 더 특화된 **react-query**를 처음으로 도입해 사용해 보았다.

# 사이트맵

```
┏━ 홈
┣━ 컬렉션
┃    ┣━ 컬렉션 목록
┃    ┗━ 컬렉션 상세
┣━ 제품
┃    ┣━ 제품 목록(필터 검색)
┃    ┣━ 제품 목록(키워드 검색)
┃    ┗━ 제품 상세
┣━ 결제
┃    ┣━ 결제 진행
┃    ┣━ 결제 성공
┃    ┗━ 결제 실패
┣━ 관리자
┃    ┣━ 메뉴
┃    ┣━ 주문 내역
┃    ┣━ 컬렉션
┃    ┃    ┣━ 컬렉션 추가
┃    ┃    ┗━ 컬렉션 수정
┃    ┗━ 제품
┃         ┣━ 제품 추가
┃         ┗━ 제품 수정
┣━ 계정
┣━ 로그인
┣━ 회원가입
┣━ 비밀번호 재설정
┣━ 카트
┣━ 이용 약관
┗━ 개인정보 처리 방침
```

# **네비게이션 바**

![](https://velog.velcdn.com/images/drrobot409/post/5579c62d-2373-4e8d-a603-3b5d4a4d959b/image.png)

네비게이션 바는 뷰포트에 고정되어 항상 눈에 들어오도록 하였다.

항상 상단에 고정되어 있는 만큼 최대한 간결하고 만드는게 좋겠다고 생각은 했지만 딱히 넣을 항목도 없어서 깔끔한 레이아웃으로 탄생하였다.

네비게이션 바의 항목으로는 **홈(로고), 컬렉션, 카테고리, 검색, 프로필과 카트(비로그인 시 로그인 버튼)**가 있다.

카트는 담긴 제품 수를 아이콘 옆에 출력하도록 하였다.

## **카테고리 목록**

![](https://velog.velcdn.com/images/drrobot409/post/3ac1b1b4-1924-487a-bf6a-11bf74f8df62/image.png)

네비게이션의 카테고리 항목은 이벤트에 따라 두 가지 기능이 동작한다.

1. 클릭 시 전체 제품 목록으로 이동
2. 마우스오버 시 카테고리 목록 드롭다운

하지만 모바일 등 터치 환경에서는 항목 터치 시 두 가지 이벤트가 모두 트리거되어 드롭다운이 내려오다가 전체 제품 목록으로 이동되는 현상이 발생한다.

따라서 css의 미디어 쿼리를 통해 진짜(?) hover가 가능한 환경에서만 드롭다운이 내려오도록 처리하였다.

```scss
@media (hover: hover) {
  .btn--category:hover {
    .category__dropdown {
      // 드롭다운 활성화
    }
  }
}
```

## **검색**

![](https://velog.velcdn.com/images/drrobot409/post/aa6db5ea-7643-471b-ac14-47956901a0f7/image.png)
키워드를 통해 제품을 검색할 수 있는 검색 버튼이다.
키워드 검색에 대한 자세한 내용은 후술.

![](https://velog.velcdn.com/images/drrobot409/post/72618186-2a64-48fc-a722-2a50033deee6/image.png)
반응형 레이아웃으로 네비게이션 바의 너비가 좁아지면 검색창을 하단에 별도로 분리하였다.

# **컬렉션**

![](https://velog.velcdn.com/images/drrobot409/post/d79a33cf-15ed-47b1-8ea8-fe60fc4cb3a0/image.png)

사이트의 홈에 접속하면 가장 먼저 보이는 부분이다.
크게 썸네일(영상) 부분과 그 아래 제품 슬라이드로 나뉜다.

## **썸네일**

말 그대로 썸네일이다. 컬렉션을 대표할 수 있는 영상을 삽입하였다.

특별한 점은 없고 `<poster>` 태그를 이용해 영상이 로드되기 전에는 별도로 지정한 이미지가 출력될 수 있도록 하였다. _~~(썸네일의 썸네일)~~_

## **제품 슬라이드**

![](https://velog.velcdn.com/images/drrobot409/post/ec454abd-19bc-403d-ae31-fa315941cf52/image.png)
컬렉션에 포함된 제품 목록을 슬라이드로 구현하였다.

이전 프로젝트에서도 슬라이드를 구현할 일이 몇 번 있었는데 개인 홈페이지를 만들 때는 Swiper 라이브러리를 사용했었고 그 이후에 만든 Splatoon 3 홈페이지 클론에서는 외부 라이브러리의 도움 없이 직접 구현했었다. 이번에 만든 슬라이드 역시 직접 구현해 보았다.

사실 슬라이드 기능 자체는 버튼을 클릭하면 슬라이드 컨테이너를 좌우로 `(아이템 너비 * n)` 만큼 이동 시키는게 다라서 구현하기 어렵지 않지만 슬라이드를 **반응형**으로 만드는 것과 **드래그** 기능을 구현하는 점은 조금 귀찮을 수 있다.

### **반응형 슬라이드**

![](https://velog.velcdn.com/images/drrobot409/post/6c22f7cd-c946-48c9-887d-16e69256dcc5/image.png)

슬라이드를 반응형으로 만들 때 가장 중요한 부분은 뷰포트 너비에 따라 가변하는 아이템의 너비를 정확하게 전달할 수 있는가에 있다. 그 너비가 정확해야 슬라이드가 의도한 만큼 움직이고 멈추기 때문이다.

아이템의 너비를 구하는 근본적인 방법은 아래와 같다.

`(슬라이드 페이지 너비 / 한 페이지에 표시할 아이템의 수)`

만약 아이템들 사이에 여백이 존재하지 않는다면 여기서 끝이지만 여백이 존재한다면 그 여백까지 추가로 계산해 주어야 한다.

여기서 한 가지 간단한 팁이 있는데, 아이템 사이에 여백을 줄 때 `gap`이나 `margin` 등 외부 여백을 사용하는 대신 `padding` 을 사용해 각 아이템의 내부에 여백을 주면 별도로 여백을 계산할 필요가 없어진다. 그러면 아이템의 스타일을 마구 변경해도 아이템의 너비 구하는 공식은 변하지 않기 때문에 유지보수에도 유리하다.

### **슬라이드 드래그**

모바일 환경에서 자연스럽게 작동되기 위해서는 드래그를 통해 페이지를 전환할 수 있어야 한다.

드래그 기능은 컨테이너의 스크롤과 `scoll-snap` 을 통해 구현하 수 있을 것 같긴 하지만 시도해 보지는 않았다. 어차피 마우스로 드래그를 하려면 별도의 JS 코드가 개입해야 할 것이고, `scoll-snap` 때문에 드래그 구현보다 반응형으로 만드는게 더 번거로울 것 같았기 때문이다.

내가 사용한 방법은 터치 이벤트를 통해 터치 이동 거리만큼 슬라이드를 이동시키고, 터치가 끝나면 현재 슬라이드 위치에서 가장 가까운 페이지로 슬라이드를 재정렬하는 방식이다.

드래그의 진행 단계에 따라 이벤트 리스너를 추가하고 슬라이드를 제어하면 된다.

1. **touchstart**

   - 터치 시작 좌표를 저장

   - touchmove와 touchend 이벤트 리스너를 등록

   - 슬라이드에 `transition` 이 적용되어 있다면 이 단계에서 비활성화 해야 드래그 시 움직임이 자연스럽다.

2. **touchmove**

   - 터치 시작 좌표와 현재 좌표를 계산하여 이동 거리를 저장

   - 슬라이드의 초기 위치에서 계산한 이동 거리만큼 슬라이드 이동

3. **touchend**

   - touchmove 이벤트 리스너 제거

   - 비활성화한 `transition` 복구

   - 슬라이드의 현재 위치에서 가장 가까운 페이지로 페이지 재정렬

<br/>

아래는 프로젝트에 적용한 코드이며 참고용으로만 보면 좋을 듯 하다.

```typescript
useEffect(() => {
  if (!slideRef.current) return;

  /////////////// 지역 변수 선언 /////////////////////////
  const slide = slideRef.current;

  // 슬라이드의 초기 위치
  const slideInitX =
    maxPage === 9
      ? -slideItemWidth * slidePage
      : -slideItemWidth * 2 * slidePage;

  // 터치 시작 위치
  let touchStartX: number;

  // 터치 이동 거리
  let touchMoveX: number;
  ////////////////////////////////////////////////////

  const touchMoveHandler = (e: TouchEvent) => {
    if (!slideRef.current) return;
    const slide = slideRef.current;

    // 슬라이드의 초기 위치에 터치 이동 거리를 더한 만큼 슬라이드를 이동시킨다.
    touchMoveX = e.touches[0].clientX - touchStartX;
    slide.style.transform = `translateX(${slideInitX + touchMoveX}px)`;
  };

  const touchEndHandler = (e: TouchEvent) => {
    setDragging(false);

    // 현재 슬라이드 위치에서 가장 가까운 페이지로 페이지 적용
    const newPage = slidePage + Math.round(touchMoveX / -slideItemWidth);
    setSlidePage(newPage <= 0 ? 0 : newPage >= maxPage ? maxPage : newPage);
    moveSlide();

    window.removeEventListener("touchmove", touchMoveHandler);
  };

  const touchStartHandler = (e: TouchEvent) => {
    setAutoSlide(false);
    setDragging(true);

    touchStartX = e.touches[0].clientX;
    window.addEventListener("touchmove", touchMoveHandler);
    window.addEventListener("touchend", touchEndHandler, { once: true });
  };

  return () => {
    slide.removeEventListener("touchstart", touchStartHandler);
    window.removeEventListener("touchmove", touchMoveHandler);
    window.removeEventListener("touchend", touchEndHandler);
  };
}, [maxPage, moveSlide, slideItemWidth, slidePage]);
```

마우스로 드래그할 수 있도록 적용하고 싶다면 이벤트와 값 등을 마우스 관련 내용으로 대체하여 같은 내용의 리스너를 추가하면 된다.

다만 마우스의 경우 아이템에 링크가 걸려있으면 드래그가 정상적으로 작동하지 않고 끝날 때(`mouseup`) 클릭 이벤트가 트리거되어 마우스의 위치에 있는 아이템의 링크로 이동된다. 아래의 코드를 `mousemove` 이벤트 리스너에 추가하여 드래그 시 링크 이동을 방지할 수 있다.

```js
// 이벤트 기본 동작을 취소하지 않으면 원하는 방식으로 드래그가 작동하지 않는다.
// 터치 이벤트의 기본 동작을 취소하면 링크 이동이 아예 막히니 마우스 이벤트만 기본 동작을 취소한다.
if (e.cancelable) e.preventDefault();
// ±25px 이상 이동이 발생하면 드래그로 간주하여 링크 이동이 비활성화된다.
// 25는 본인이 생각한 드래그의 최소 기준값으로 바꿔서 사용하면 된다.
if (Math.abs(touchMoveX) >= 25) {
  // ToDo: blockLink의 값으로 아이템의 pointer-events를 제어하기
  setBlockLink(true);
}
```

### **페이지네이션**

페이지네이션은 자신의 key가 현재 페이지와 일치하면 색이 바뀌고 누르면 key로 페이지가 변경되는 동그라미들을 전체 페이지 수 만큼 추가하면 된다.

```jsx
const paginationGenerator = () => {
  let dots: Array<JSX.Element> = [];

  for (let i = 0; i <= maxPage; i++) {
    dots.push(
      <div
        key={i}
        className={`h-2 w-2 cursor-pointer rounded-full ${
          i === slidePage ? "bg-zinc-600" : "bg-zinc-200"
        }`}
        onClick={() => {
          setSlidePage(i);
        }}
      />
    );
  }

  return dots;
};
```

# **툴바**

![](https://velog.velcdn.com/images/drrobot409/post/35925f9c-7219-4823-9fea-cc9176157337/image.png)

우측 하단에 위치한 toTop, 공유, 관리자 버튼의 모임이다.

## **공유 버튼**

![](https://velog.velcdn.com/images/drrobot409/post/bc59a896-35dc-4f7c-b61f-9f0b1bbbf780/image.png)

**Web Share API**를 이용한 공유 기능을 구현하였다.

![](https://velog.velcdn.com/images/drrobot409/post/5ddbe467-d270-4ede-9457-0ca798cf1fc6/image.png)

API를 지원하는 브라우저의 경우 브라우저에 내장된 공유 기능이 실행되고, 지원하지 않을 경우 링크를 복사한 뒤 복사 되었다는 알림창을 출력하도록 하였다.

```js
const share = async (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  const url = process.env.NEXT_PUBLIC_ABSOLUTE_URL + asPath;

  if (typeof window === "undefined") return;

  if (window.navigator.share) {
    await window.navigator.share({ text: url }).catch((error) => {
      console.error(error);
    });
  } else {
    window.navigator.clipboard.writeText(url).then(() => {
      triggerAlert();
    });
  }
};
```

# **제품 탐색**

전체 제품 혹은 필터와 키워드 등으로 제품을 탐색할 수 있다.

제품의 데이터는 **React-Query** 를 이용해 **Firebase** 에서 불러온다.

적용할 필터는 인터페이스로 제어할 수 있으며 키워드 검색은 네비게이션 바의 검색창을 이용하면 된다.

인터페이스를 이용해 필터를 제어할 경우 **url의 쿼리 스트링**에도 즉시 반영되며, 반대로 url로 필터를 적용해도 인터페이스에 적용된 필터가 반영되도록 하였다.

_예시 : https://raebef.netlify.app/products/categories/clothes/outer?orderby=popularity&gender=all&size=xs+s+m+l&color=gray_

## **필터**

![](https://velog.velcdn.com/images/drrobot409/post/99dc9eea-c2a7-4250-b374-9eae761df0b4/image.png)

필터를 이용해 원하는 제품을 탐색할 수 있다. 우측 상단의 필터 버튼을 눌러 창을 토글할 수 있다.

적용 가능한 필터는 **메인 카테고리, 서브 카테고리, 성별, 사이즈, 색상, 정렬 순서**가 있다. 정렬 순서는 **인기순, 최신순, 가격 높은 순과 낮은 순** 총 4가지 중 선택할 수 있으며, 기본값은 인기순이다.

인기순에서 정렬을 결정하는 값은 판매량이며 사용자가 제품을 주문할 때 실제로 서버의 제품 데이터에서 구매 수량만큼 값이 증가하도록 구현하였다.

사이즈는 복수 선택이 가능하지만 성별과 색상은 전체 혹은 단일 선택만 가능하도록 만들었는데, 이는 파이어 베이스 쿼리 성능의 한계로 인한 어쩔 수 없는 결정이었다. **Firestore에서 배열 탐색절은 쿼리문당 최대 1개만 사용**할 수 있기 때문이다.

색상을 복수 선택할 수 있다면 좋았겠지만 제품 데이터 구조상 사이즈는 배열이기 때문에 사이즈를 탐색하기 위해서는 어차피 `array-contains` 절을 사용해야 하고 이 시점에서 배열 탐색절 개수 한계에 도달한다. 결국 울며 겨자먹기로 사이즈에 복수 선택 기능을 부여할 수 밖에 없었다.

## **키워드 검색**

![](https://velog.velcdn.com/images/drrobot409/post/c4bdce67-93c2-4cad-b637-1975317e87bb/image.png)

검색의 경우 네비게이션 바에 위치한 검색창을 이용하면 된다.

검색 기능은 제품의 태그에 검색 키워드가 존재하는지 탐색하여 일치하는 결과를 출력한다.

태그는 제품을 등록/수정할 때 기본적으로 카테고리와 서브 카테고리, 제품명, 성별 등이 자동 생성되며 그 외에 원하는 태그를 입력할 수도 있다.

검색 기능에도 배열 탐색절이 사용되기 때문에 필터와 병행하는데 제약이 많다. 따라서 키워드 검색 시 필터는 사용할 수 없도록 제한하였다.

# **제품 목록**

![](https://velog.velcdn.com/images/drrobot409/post/67afcc9b-77c3-41d7-9bac-af3a81b5b316/image.png)

제품을 탐색할 때 나열되는 제품의 목록이다.

## **무한 스크롤 (useInfiniteQuery)**

![](https://velog.velcdn.com/images/drrobot409/post/a1767b7a-df5b-41d8-8451-618c6dc397c3/image.png)

버튼 클릭 시 무한 스크롤이 트리거 되어 스크롤을 내리면 다음 제품 목록을 불러오도록 구현하였다.

기능의 구현에는 **React-Query** 의 `useInfiniteQuery`를 사용하였다.

### **스크롤 복원**

무한 스크롤은 그 특성상 스크롤 복원 기능이 함께 구현되지 않으면 UX가 썩 좋지 않다.

불러온 데이터의 `cacheTime` 과 `staleTime` 을 늘려 매 번 데이터가 새로고침 되는 것을 방지하고 Next.js의 scroll restoration을 통해 스크롤 복원 기능을 구현하였다.

![](https://velog.velcdn.com/images/drrobot409/post/29bc3c91-522e-478c-86fd-c1af178216da/image.png)

또한 목록 페이지 로딩 시 의도치 않게 페이지의 높이가 초기화되는 것을 방지하기 위해 로드 된 제품의 개수를 `localStorage` 에 저장하고 페이지 로딩 중 그 개수만큼 스켈레톤을 출력하여 그 높이를 유지하였다.

# **스켈레톤 로더**

![](https://velog.velcdn.com/images/drrobot409/post/638c4627-38ca-4aa8-b446-39355e87222b/image.png)

좋은 UX를 위해서는 데이터를 불러올 때 빈 화면 대신 로딩 화면을 출력하는 것이 좋다. 스켈레톤 로더는 이 로딩 화면의 방식 중 한가지로, 내용을 불러오기 전까지 내용이 없는 뼈대를 대신 출력하는 방법이다.

스켈레톤 로더를 구현하는데는 아마 여러 방법이 존재하겠지만, 내가 사용한 방법은 스켈레톤 컴포넌트를 별도로 생성하여 로딩 중에 대신 렌더링하는 것이다.

이 방법의 단점은 페이지의 스타일이 변경될 경우 스켈레톤 컴포넌트의 스타일도 직접 수정해주어야 하기 때문에 유지보수 측면에서 썩 좋지는 않다는 점이다. 어차피 뼈대만 출력하기 때문에 세부적인 스타일은 크게 중요하지 않지만 레이아웃은 어느 정도 확립된 후에 작업하는 것이 좋다.

![](https://velog.velcdn.com/images/drrobot409/post/29016bc2-ec70-47ac-9469-3176016ad912/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/e03df998-ebe4-44c6-a235-e346c8b81207/image.png)

프로젝트에서 스켈레톤 로더를 적용한 부분은 홈 화면, 제품 목록, 카트, 주문 내역 등이다.
원래는 제품 상세 페이지도 스켈레톤 로더를 구현했으나 정적 페이지로 업데이트하며 삭제하였다. 제품 상세 페이지의 정적 페이지 관련 내용은 후술.

# **북마크**

![](https://velog.velcdn.com/images/drrobot409/post/9449dc68-6cdc-40f6-bb4a-62c12474ea84/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/727d995c-93b0-435d-9533-5bbd3c10d68c/image.png)

관심있는 제품을 따로 저장해 둘 때 사용하는 기능으로 카트와는 용도가 사뭇 다른 기능이다.

북마크한 **제품의 id를 유저 데이터의 bookmark 필드에 저장**하는 방법으로 구현하였으며 아이콘을 구분하여 북마크 전/후를 식별할 수 있도록 하였다.

## **북마크 낙관적 업데이트**

북마크 추가의 프로세스는 대략 아래와 같다.

1. 북마크 버튼을 누른다.
2. 서버와 통신해 해당 제품 id를 북마크 필드에 추가한다.
3. 업데이트 된 북마크 필드를 다시 불러온다.
4. 아이콘이 업데이트된다.

하지만 유저가 북마크 기능을 사용할 때 실제로 보여지는 과정은 아래와 같다.

1. 북마크 버튼을 누른다.
2. 아이콘이 업데이트 된다.

따라서 눈에 보이지 않는 중간 과정이 길어질수록 버튼의 피드백 딜레이도 길어지고 유저는 사이트가 느리다는 생각을 갖게 된다.

이 피드백을 최대한 앞당기기 위해서는 중간 과정에 소요되는 시간을 줄이는 것이 가장 좋은 방법이지만, 서버 통신과 같은 요인은 소요 시간을 줄이는데 한계가 있다. 하지만 **낙관적 업데이트**를 사용하면 이 한계를 뛰어넘을 수 있다.

낙관적 업데이트는 이름 그대로 서버에 요청한 데이터의 업데이트가 당연히 성공할 것이라는 초긍정 마인드와 함께 **클라이언트의 데이터를 먼저 업데이트** 해버리는 방법이다. 북마크 추가 프로세스에서 가장 긴 시간을 차지할 것으로 예상되는 서버 통신을 기다리지 않고 데이터를 업데이트 하기 때문에 거의 즉각적인 피드백을 기대할 수 있다.

당연히 성공할 것으로 예상하고 실행하는 업데이트이기 때문에 웬만하면 성공 할만한 요청에 사용하는 것이 좋지만 실패할 경우에 대비해 업데이트를 롤백할 부분도 생각해두어야 한다.

```js
const add = useMutation(addBookmark, {
  // 결과에 관계 없이 mutation 완료시 쿼리 무효화(다시 쿼리 요청)
  onSettled: () =>
    queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchInactive: true,
    }),
  // 낙관적 업데이트
  onMutate: async ({ productId }) => {
    // 낙관적 업데이트에 앞서 쿼리 취소
    await queryClient.cancelQueries({ queryKey: ["user"] });
    // 기존 데이터
    const prevData: UserData | undefined = queryClient.getQueryData(["user"]);
    // 업데이트 적용 데이터
    const newData = {
      ...prevData,
      bookmark: prevData?.bookmark
        ? [...prevData?.bookmark, productId]
        : [productId],
    };
    // 업데이트 실시
    queryClient.setQueryData(["user"], () => newData);

    // 에러를 대비해 기존 데이터 킵
    return { prevData };
  },
  // 에러시 롤백
  onError: (error, payload, context) => {
    queryClient.setQueryData("user", context?.prevData);
  },
});
```

# **제품 상세 페이지**

![](https://velog.velcdn.com/images/drrobot409/post/3f9f5ca4-bee0-49e3-9235-d2cfb0a27a29/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/f9476cf9-2c5c-4922-bfc7-db5d6921a54d/image.png)

제품 상세 페이지는 구매와 직결된 여러 중요한 버튼과 기능들이 집결되어 있기 때문에 모바일 환경을 고려한 반응형에 나름 신경을 써보았다.

## **정적 페이지 생성**

![](https://velog.velcdn.com/images/drrobot409/post/c69fde11-9917-4231-9b23-80d4f3927e8c/image.png)

제품 페이지는 정적 페이지로 생성하였다. 정적 페이지가 검색 엔진 최적화에 좋기 때문이다. 또한 페이지의 오픈그래프나 트위터카드에 제품 사진과 정보를 포함하기 위한 이유도 있다.

### **getStaticProps**

정적 페이지는 **Next.js**의 **`getStaticProps`**를 사용해 생성하였다.

`getStaticProps`를 이용한 정적 페이지 생성은 빌드 시 페이지 구축에 필요한 모든 데이터를 불러온 뒤 데이터를 페이지에 정적으로 고정시켜 빌드하게 된다. 따라서 빌드 이후 서버의 데이터가 변경되어도 이미 빌드 된 페이지의 데이터는 일반적인 방법으로는 업데이트 되지 않는다.

### **revalidate (ISR)**

다시 빌드하면 정적 페이지에도 업데이트가 적용 되기는 하지만 변경 사항이 발생할 때 마다 매 번 다시 빌드할 수는 없으므로 **`revalidate`** 를 통해 페이지의 재생성을 요청하는 방법을 사용할 수 있는데 이러한 방식의 업데이트 가능한 정적 페이지 기능을 **ISR**이라 부른다.

`revalidate`를 통해 페이지가 재생성되는 과정을 이해하기 쉽게 풀어서 나열하면 아래와 같다.

1. 클라이언트에서 제품 A의 상세 페이지를 서버에 요청
2. 서버는 이미 빌드되어 있는 A 상세 페이지를 클라이언트에 전달
   2-1. 동시에 `revalidate` 트리거 타이머가 실행
3. 타이머가 종료되면 서버에서 해당 페이지의 데이터를 업데이트하여 다시 빌드

이러한 방식은 빌드되어 있는 정적 페이지를 우선 전달함으로써 검색 엔진 최적화 등의 이점을 살릴 수 있음과 동시에 정적 페이지 전달 완료 후 서버에서 페이지의 데이터를 새롭게 업데이트하여 다음 번 요청 시에는 최신화된 데이터를 제공할 수 있다는 장점이 존재한다. 다만 사이트를 다시 로드해야 업데이트된 페이지를 확인할 수 있다.

`revalidate`를 적용하는 방법은 `getStaticProps` 의 리턴 객체에 트리거 타임을 명시해주면 된다.

```js

export async function getStaticProps({ params }: any) {
  const { id } = params;

  if (!id) return { props: { isError: true } };

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef).catch((error) => {
    console.error(error);
  });

  return {
    props: (docSnap?.data() as ProductType) || { isError: true },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const paths: Array<{ params: { id: string } }> = [];

  querySnapshot.forEach((doc) => {
    paths.push({ params: { id: doc.data().id } });
  });

  return { paths, fallback: true };
}
```

### **on-Demand Revalidate**

또한 **`on-Demand Revalidate`** 를 사용해 변경 사항이 발생하는 등 특정 상황에서만 페이지 업데이트를 트리거할 수도 있다.

원래 배포에 사용해오던 Netlify가 해당 기능을 지원하지 않는다는 사실을 뒤늦게 알게 되어 vercel로 호스팅을 변경하였다.

해당 코드는 아래와 같다.

```js
// pages/api/revalidate.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body } = req;

  // Check for secret to confirm this is a valid request
  if (query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const targetPath =
    body.target === "product"
      ? "/products/product/"
      : body.target === "collection"
      ? "/collections/"
      : "";

  if (targetPath === "") {
    return res.status(401).json({ message: "Invalid target" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    if (typeof body.id === "string") {
      await res.revalidate(targetPath + body.id);
    } else {
      body.id.forEach(async (id: string) => {
        await res.revalidate(targetPath + id);
      });
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
```

```js
// hooks/useProduct.ts
// 아래 함수를 데이터 업데이트 후 실행하면 된다.
const revalidate = async (id: string) => {
  await axios.request({
    method: "POST",
    url:
      process.env.NEXT_PUBLIC_ABSOLUTE_URL +
      "/api/revalidate?secret=" +
      process.env.NEXT_PUBLIC_REVALIDATE_TOKEN,
    headers: {
      "Content-Type": "application/json",
    },
    data: { target: "product", id },
  });
};
```

## **옵션 선택**

![](https://velog.velcdn.com/images/drrobot409/post/08f15500-4644-44a8-8595-f60681ece5a7/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/828974a7-8769-41fe-9f47-b25f05f293f4/image.png)

구매 혹은 카트에 추가할 제품의 사이즈와 수량을 입력하는 공간이다.

뭔가 따로 부르는 명칭이 있을 것 같기는 하지만 나는 '임시 카트' 라는 별명을 붙이고 프로젝트를 진행하였다. 제품을 담고 직접 구매 단계로 이동할 수 있지만 진짜 카트는 이미 존재하기 때문에 붙인 별명이다.

![](https://velog.velcdn.com/images/drrobot409/post/af812a0c-3c31-4636-a307-cca904233338/image.png)

옵션의 재고가 부족할 경우 해당 옵션은 품절 문구를 띄우고 선택할 수 없도록 처리하였다.

또한 해당 제품이 이미 카트에 추가되어 있는 경우 제품 페이지에 접근했을 때 임시 카트를 자동으로 카트의 데이터에 맞게 업데이트 하도록 하였다.

# **카트**

![](https://velog.velcdn.com/images/drrobot409/post/c519efe5-4a44-41b5-81bd-502bdee9ab80/image.png)

카트는 여러 종류의 제품을 한 번에 구매할 수 있도록 도와주는 기능이다.

담아둔 제품의 가격과 선택 옵션, 총 금액 등의 정보를 요약해서 보여줄 수 있도록 하였으며 제품을 클릭하여 해당 제품의 상세 페이지로 이동할 수 있다.

# **제품 구매**

## **주문 정보**

![](https://velog.velcdn.com/images/drrobot409/post/d34a07f7-e55b-46b3-b07f-28df5b1de6c4/image.png)

제품 결제에 앞서 주문 정보를 입력하는 공간이다.

프로필 페이지에서 주문 정보를 저장할 수 있으며, 저장한 데이터가 존재할 경우 제품 구매시 기본값으로 채워진다.

### **주소 검색**

![](https://velog.velcdn.com/images/drrobot409/post/37e59c84-9a5d-44b7-ab72-34e949b35fc3/image.png)

주소 검색은 카카오 api를 활용하였다.

`react-daum-postcode` 패키지를 설치하면 매우 간단하게 컴포넌트 방식으로 주소 검색창을 임베드할 수 있으며 `onComplete` 혹은 `autoClose` 등 여러 유용한 이벤트와 속성을 커스텀해 상황에 맞게 처리할 수 있다.

```jsx
<DaumPostcodeEmbed
  style={{
    height: showSearch ? "500px" : "0px",
    border: showSearch ? "1px solid #71717a" : "none",
    borderRadius: "15px",
    overflow: "hidden",
  }}
  onComplete={onAddressSearchComplete}
  autoClose={false}
/>
```

선택한 주소의 데이터는 onComplete 핸들러로 전달되며 핸들러에서 데이터 처리 방법을 결정하면 된다.

```js
const onAddressSearchComplete = (data: Address) => {
  setAddressData({
    address: data.address || "",
    postCode: data.zonecode || "",
    additional: "",
  });

  setShowSearch(false);
};
```

## **결제 (Toss Payments)**

당연하지만 쇼핑몰을 운영하는 입장에서는 가장 중요한 기능이다. 결제가 안되면 수익을 낼 수 없기 때문이다.

결제 연동 api는 종류가 다양하지만 나는 토스 페이먼츠를 선택했다. 예전에 잠시 api 연동을 테스트했던 적도 있고, 또 평소에 자주 사용하는 앱이기 때문에 왠지 친숙했다.

### **11-1. 결제 생성 및 요청**

![](https://velog.velcdn.com/images/drrobot409/post/04fe4dfd-d33f-48d3-805e-2490d892e680/image.png)

주문 정보 입력을 마치고 하단의 결제 버튼을 클릭하면 Toss Payments의 결제창이 출력된다. 카드사를 선택하고 안내에 따라 결제 과정을 진행하면 결제 요청 단계가 완료된다.

```js
tossPayments
  ?.requestPayment("카드", {
  	...orderData,
  	successUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/success?target=${target}`,
  	failUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/fail`,
})
```

결제 요청의 성공/실패 여부에 따라 이동할 url을 지정할 수 있다. 요청 결과에 따른 다음 과정은 해당 url 페이지 컴포넌트에서 처리하면 된다. 이 때 url과 함께 전달되는 파라미터로 `orderId`, `paymentKey` 그리고 `amount`가 있다.

<br/>

**_2023.05.01 내용 추가_**

완성 후 방치해둔터라 건드린 부분이 없는데 잘 되던 결제가 생성 단계에서 에러가 발생하는 현상을 확인했다. 심지어 분명히 결제가 작동했던 과거 빌드 버전에서도 같은 에러가 발생했다.

발생한 에러는 **400 INVALID_REQUEST** 에러이며 내용은 **"필수 파라미터가 누락되었습니다."**

현재 사용하는 api에서 **필수 파라미터**는 **amount, orderId, successUrl, failUrl, orderName** 이렇게 다섯 가지인데 전부 위 코드의 `...orderData` 에 포함된 부분임에도 해당 에러가 발생했다. 

테스트를 위해 필수 파라미터를 고의로 누락시킬 경우 해당 파라미터의 이름을 정확히 명시하며 누락되었다는 에러가 발생하는 점을 확인했는데, 이 말은 실제로 저 다섯 가지의 필수 파라미터가 누락되어 발생한 에러는 아니라는 의미이다.

원인은 필수 파라미터의 누락이 아니라** 불필요한 파라미터의 존재** 때문이었다. 
위에서 사용한 `orderData` 에는 api의 필수 파라미터도 존재하지만 주문 정보 관리를 위해 db에 업로드할 다른 파라미터도 함께 포함되어 있었다. 이 부분을 고려하지 않고 비구조화하여 api에 전달했기 때문에 발생한 문제로 보인다. 해당 부분을 아래와 같이 수정한 이후 에러가 발생하지 않는 것을 확인했다.

```js
tossPayments
  .requestPayment("카드", {
  amount: orderData.amount,
  orderId: orderData.orderId,
  orderName: orderData.orderName,
  customerName: orderData.customerName,
  successUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/success?target=${target}`,
  failUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/fail`,
})
```

원래 작동하던 부분인데 안되는걸 보니 api에 뭔가 업데이트가 있었던 모양이다.

### **2. 결제 확인**

결제의 요청이 끝났으면 전달 받은 쿼리 파라미터를 이용해 결제해야 할 금액과 실 결제금액을 비교해 확인해야 한다. 금액이 일치할 경우 아래처럼 결제 확인 데이터를 담은 객체를 토스에 전송하여 결제 확인을 기다리면 된다.

```js
const fetchConfirmPayment = async (data: ConfirmPaymentData | null) => {
  if (!data) return;

  // https://api.tosspayments.com/v1/payments/confirm
  const url = "/api/confirmPayment";

  const Authorization =
    "Basic " +
    Buffer.from(
      process.env.NEXT_PUBLIC_TOSS_SECRET_KEY as string,
      "utf8"
    ).toString("base64");

  const options = {
    method: "POST",
    url,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    data,
  };

  const response = await axios.request(options);

  return response.data;
};
```

### **3. 결제 완료**

![](https://velog.velcdn.com/images/drrobot409/post/5f4b83e3-ab21-429b-8538-402f111ede30/image.gif)

결제 확인이 정상적으로 완료되면 결제 정보가 담긴 객체를 전달받을 수 있다. 이 데이터를 이용해 주문의 상태를 업데이트하고 결제가 모두 완료되었음을 유저에게 알리면 된다.

나는 결제 완료 안내에 `lottie.js` 의 애니메이션을 이용하였다. 관련 내용은 후술.

### **결제 취소**

완료된 결제의 취소는 결제건을 구분할 `paymentKey`와 취소 이유가 필요하다. 취소의 요청의 코드는 확인 요청과 크게 다르지 않다. 마찬가지로 취소가 완료되면 취소 정보를 담은 객체가 전달되는데, 이 데이터를 이용해 주문의 상태를 업데이트하면 된다.

```js
const fetchCancelPayment = async ({
  paymentKey,
  cancelReason,
}: {
  paymentKey: string | null;
  cancelReason: string;
}) => {
  if (!paymentKey) return;

  //  https://api.tosspayments.com/v1/payments/:paymentkey/cancel
  const url = "/api/cancelPayment/" + paymentKey;

  const Authorization =
    "Basic " +
    Buffer.from(
      process.env.NEXT_PUBLIC_TOSS_SECRET_KEY as string,
      "utf8"
    ).toString("base64");

  const options = {
    method: "POST",
    url,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    data: { cancelReason },
  };

  const response = await axios.request(options);

  return response.data;
};
```

# **주문 내역**

![](https://velog.velcdn.com/images/drrobot409/post/e171a4f3-96ca-40ec-8209-baf91f7844e9/image.png)

내가 주문한 제품들을 확인할 수 있는 기능이다.
주문 id와 상태, 정렬 기준을 필터링할 수 있다.

![](https://velog.velcdn.com/images/drrobot409/post/09c0514b-20e3-457e-8080-0fa8dcff69be/image.png)

각 주문의 자세한 내용은 해당 주문 탭을 눌러 확인할 수 있다.  
주문 상세는 별도의 페이지를 만드는 대신 클릭 시 주문의 id를 url 쿼리 파라미터로 전달하고 해당 주문의 상세 정보 탭을 펼치는 방법을 사용했다.

또한 주문 상세 탭에서 해당 주문과 결제를 취소할 수 있도록 하였다.

# **백오피스**

백오피스이긴 하지만 사실은 거의 구색만 갖춰 놓은 상태이다. 쇼핑몰이 뒤에서 어떻게 돌아가는지 아는 내용이 별로 없기 때문에 자세한 배송 관리나 재고 관리 등의 구현은 힘들었다.

구현되어 있는 기능은 **제품의 추가/수정, 컬렉션의 추가/수정, 주문의 상태 변경과 간단한 대시보드**이다.

## **주문 관리**

![](https://velog.velcdn.com/images/drrobot409/post/eb0ee32e-4c87-49c2-b458-aff0ef32ac0e/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/392eee6d-25ed-4174-aae1-3dd16684573d/image.png)

앞서 설명한 주문 내역과 UI는 거의 같지만 기능적으로는 모든 유저의 주문을 확인할 수 있다는 점, 유저의 id를 필터링할 수 있는 점, 그리고 주문의 상태를 변경할 수 있다는 차이점이 있다.

또한 일반 유저는 결제 완료, 제품 준비 중, 배송 중, 배송 완료, 환불 완료
등 진행이나 결과가 명확한 주문만 조회되는 반면에 관리자는 결제 진행 중이나 결제 실패와 같이 모든 상태의 주문을 조회할 수 있다.

## **제품 & 컬렉션 관리**

![](https://velog.velcdn.com/images/drrobot409/post/07a720e7-b966-4001-bcb6-47dff7929308/image.png)

![](https://velog.velcdn.com/images/drrobot409/post/ec718581-2abf-40c6-97b5-8fd496034a1c/image.png)

새로운 제품과 컬렉션을 등록할 수 있다.  
이미 등록되어 있는 제품의 수정은 해당 제품의 상세 페이지에서 접근할 수 있다. 컬렉션도 마찬가지.

![](https://velog.velcdn.com/images/drrobot409/post/10acc2ff-baa9-42d1-9c24-81a0fa20c5d1/image.png)

## **대시보드**

![](https://velog.velcdn.com/images/drrobot409/post/5e0e6c39-b401-4a31-9988-e92aa798770e/image.png)

쇼핑몰의 실적을 확인할 수 있는 대시보드 페이지이다. 대시보드가 프로젝트의 메인은 아니기 때문에 몇가지 KPI만 구현하였다. 그리고 내 생각이지만 대시보드는 외부에서 만든 다음에 웹으로 임베드하는게 여러 방면에서 더 좋지 않나라는 개인적인 의견이다. 직접 해보지는 않았지만 Looker Studio(구 Data Studio)도 임베드를 지원하는 것으로 알고 있다.

차트는 `chart.js` 를 이용해 구현하였다. `react-cartjs-2` 가 컴포넌트 방식의 차트 삽입을 가능케 해주기는 하지만 제대로 공부하고 사용하지 않으면 원하는 차트를 만드는데 시간이 좀 걸릴 것 같다. 나도 y축을 하나 더 추가하려고 공식 문서를 읽는데 꽤 많은 시간을 투자했다.

```jsx
<Line
  data={chartData}
  options={{
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "GMV 추이",
      },
      subtitle: {
        display: true,
        text: "23년 1월 이전 데이터는 차트 테스트를 위해 추가한 가상 데이터이며 주문 내역은 존재하지 않습니다.",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        title: {
          display: true,
          text: "총매출",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "주문수",
        },
        min: 0,
        ticks: {
          autoSkip: false,
          callback: function (label) {
            if (Math.floor(label as number) === label) {
              return label;
            }
          },
        },
      },
    },
  }}
/>
```

컴포넌트와 props로 차트의 틀을 잡은 뒤 양식에 맞춰 데이터를 던져주면 차트가 출력된다.

```js
{
  labels: Object.keys(data),
    datasets: [
      {
        id: "amount",
        type: "line",
        fill: true,
        label: "매출액",
        data: Object.values(data).map((cur) => cur.amount),
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        type: "bar",
        barPercentage: 0.3,
        yAxisID: "y1",
        id: "orders",
        label: "주문수",
        data: Object.values(data).map((cur) => cur.orders),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
}
```

# **Lottie animation**

**`Lottie.js`** 는 에어비앤비에서 만든 라이브러리로, 다양한 애니메이션 효과를 적은 리소스로 사용할 수 있게 해준다.

애프터 이펙트 등의 툴에서 제작한 애니메이션을 json으로 내보낸 뒤 Lotti.js에 적용해 사용할 수 있다. 또한 https://lottiefiles.com/ 에서 다른 사람들이 만들어 둔 다양한 애니메이션들을 확인해보고 직접 사용할 수도 있다.

```jsx
import doneAnimation from "../public/json/done-dark.json";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

interface Props {
  show: boolean;
}

const Done: React.FC<Props> = ({ show }) => {
  const animator = useRef < HTMLDivElement > null;

  useEffect(() => {
    if (!animator.current) return;

    const animation = Lottie.loadAnimation({
      container: animator.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: doneAnimation,
    });

    show && animation.play();

    return () => {
      animation.destroy();
    };
  }, [show]);

  return (
    <div className="flex w-full items-center justify-center transition-all">
      <div ref={animator} className="w-full max-w-[300px]" />
    </div>
  );
};

export default Done;
```
