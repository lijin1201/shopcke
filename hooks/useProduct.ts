import { useMutation, useQueryClient } from "react-query";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../fb";
import { ImageType, ProductType } from "../types";
import axios from "axios";

const useProduct = () => {
  const queryClient = useQueryClient();

  const set = useMutation(setProduct, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "productsByFilter",
          "productsCountByFilter",
          "productsById",
          "productsFromCart",
        ],
      }),
    retry: false,
  });

  const deleteProduct = useMutation(deleteProductFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "productsByFilter",
          "productsCountByFilter",
          "productsById",
          "productsFromCart",
        ],
      }),
    retry: false,
  });
  //deleteOptionThumbFn
  const deleteOptionThumb = useMutation(deleteOptionThumbFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "productsByFilter",
          "productsCountByFilter",
          "productsById",
          "productsFromCart",
        ],
      }),
    retry: false,
  });
  return { deleteProduct, set, deleteOptionThumb };
};

export default useProduct;

const setProduct = async ({
  product,
  files,
  isEdit = false,
}: {
  product: ProductType;
  files: {
    thumbnail: FileList | null;
    detailImgs: FileList | null;
    optionsImage: FileList | null;
  };
  isEdit?: boolean;
}) => {
  const finalProduct = { ...product };
  let thumbnail: ImageType;
  const detailImgs: Array<ImageType> = [];
  const optionsImage: Array<ImageType> = [];

  // 대표 사진이 변경된 경우
  if (files.thumbnail) {
    thumbnail = { src: "", id: files.thumbnail[0].name };

    const imgStorageRef = ref(
      storage,
      `products/${product.id}/${thumbnail.id}`
    );

    await uploadBytes(imgStorageRef, files.thumbnail[0]);

    thumbnail.src = await getDownloadURL(imgStorageRef);

    finalProduct.thumbnail = thumbnail;
  }

  // 상세 사진이 변경된 경우
  if (files.detailImgs) {
    for (let i in Object.keys(files.detailImgs)) {
      const newDetailImg = { src: "", id: "" };

      newDetailImg.id = files.detailImgs[i].name;

      const imgStorageRef = ref(
        storage,
        `products/${product.id}/${newDetailImg.id}`
      );

      await uploadBytes(imgStorageRef, files.detailImgs[i]);

      newDetailImg.src = await getDownloadURL(imgStorageRef);

      detailImgs.push(newDetailImg);

      finalProduct.detailImgs = detailImgs;
    }
  }

  if (files.optionsImage) {
    for (let i in Object.keys(files.optionsImage)) {
      const newOptionImg = { src: "", id: "" };

      newOptionImg.id = files.optionsImage[i].name;

      const imgStorageRef = ref(
        storage,
        `products/${product.id}/${newOptionImg.id}`
      );

      await uploadBytes(imgStorageRef, files.optionsImage[i]);

      newOptionImg.src = await getDownloadURL(imgStorageRef);

      optionsImage.push(newOptionImg);

      finalProduct.optionsThumb = optionsImage;
    }
  }

  if (!isEdit) {
    // 업로드
    await setDoc(doc(db, "products", product.id), finalProduct).then(() =>
      revalidate(product.id)
    );
  } else {
    // 수정
    await updateDoc(doc(db, "products", product.id), finalProduct).then(() =>
      revalidate(product.id)
    );
  }
};

// 제품 데이터 제거
const deleteProductFn = async (productId: string) => {
  if (!productId) return;

  const docRef = doc(db, "products", productId);

  await deleteDoc(docRef)
    .then(() => revalidate(productId))
    .catch((error) => {
      switch (error.code) {
        default:
          console.error(error);
          break;
      }
    });
};

const deleteOptionThumbFn = async ({
  product,
  optionsThumb,
}: {
  product: ProductType;
  optionsThumb: Array<ImageType>; // FileList | null;
}) => {
  const finalProduct = { ...product };
  if (optionsThumb?.length > 0) {
    for (let i in Object.keys(optionsThumb)) {
      const imgStorageRef = ref(
        storage,
        `products/${product.id}/${optionsThumb[i].id}`
      );

      await deleteObject(imgStorageRef);
    }
    //storage file was deleted with the following commented (assitned with [])
    finalProduct.optionsThumb = [];
    await updateDoc(doc(db, "products", product.id), finalProduct).then(() =>
      revalidate(product.id)
    );
  }
};

/**
 * 정적 페이지 업데이트,
 * */
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
