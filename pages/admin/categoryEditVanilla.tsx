// https://github.com/josdejong/jsoneditor
"use client";
// import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeaderBasic from "../../components/HeaderBasic";
import Seo from "../../components/Seo";
// import VanillaJSONEditor from "../../components/VanillaJSONEditor";
import { useState, useEffect, useCallback } from "react";
import type { Content, JSONContent, OnChangeStatus } from "vanilla-jsoneditor";
import useGetUserData from "../../hooks/useGetUserData";
import useIsAdmin from "../../hooks/useIsAdmin";
import Loading from "../../components/AnimtaionLoading";

const VanillaJSONEditor = dynamic(
  () => import("../../components/VanillaJSONEditor"),
  { ssr: false }
);

const App = () => {
  const { replace } = useRouter();
  const { data: userData, isFetched } = useGetUserData();
  const isAdmin = useIsAdmin(userData);

  useEffect(() => {
    if (userData && !isAdmin) {
      window.alert("권한이 없습니다.");
      replace("/", undefined, { shallow: true });
    }
  }, [isAdmin, replace, userData]);

  useEffect(() => {
    if (isFetched && !userData) {
      replace(
        {
          pathname: "/login",
          query: {
            from: "/admin",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [isFetched, replace, userData]);

  const [showEditor, setShowEditor] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [json, setJson] = useState<Content>({
    json: {
      // greeting: "Hello World",
      // color: "#ff3e00",
      // ok: true,
      // values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    // text: undefined,
  });
  const handler = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      setJson(content);
    },
    [json]
  );

  useEffect(() => {
    // if (typeof window === "undefined") return;

    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch("/api/cat-repo");
      // convert the data to json
      const json = await response.json();

      // set state with the result
      setJson({ json: json });
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  //   const catResponse = fetch("/api/cat-repo");
  //   const catData = await catResponse.json();

  // catData
  //     {
  //     array: [1, 2, 3],
  //     boolean: true,
  //     null: null,
  //     number: 123,
  //     object: { a: "b", c: "d" },
  //     string: "Hello World",
  //   }

  // const onChangeJSON = (updatedJson) => {
  //   setJson(updatedJson);
  // };

  // const updateTime = () => {
  //   const time = new Date().toISOString();
  //   setJson({ ...json, time });
  // };

  const saveData = async () => {
    const response = await fetch("/api/cat-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify((json as JSONContent).json, null, 2),
    });
    const data = await response.json();
    console.log(data);
  };

  // if (typeof window === "undefined") return null;

  return (
    <main className="page-container ">
      <Seo title="categoryEdit" />
      <HeaderBasic title={{ text: "Category Edit" }} />
      {/* <h1>JSONEditor React demo</h1> */}
      {isAdmin ? (
        <div className="App">
          {/* <h1>svelte-jsoneditor in React</h1> */}
          <p>
            <label>
              <input
                type="checkbox"
                checked={showEditor}
                onChange={() => setShowEditor(!showEditor)}
              />{" "}
              Show JSON editor
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={readOnly}
                onChange={() => setReadOnly(!readOnly)}
              />{" "}
              Read only
            </label>
          </p>

          {showEditor && (
            <>
              <h2>Category Editor</h2>
              <div className="my-editor">
                <VanillaJSONEditor
                  content={json}
                  readOnly={readOnly}
                  onChange={handler}
                />
              </div>
            </>
          )}

          {/* <>
          <h2>Contents</h2>
          <pre>
            <code>{JSON.stringify(json, null, 2)}</code>
          </pre>
        </> */}
          <button onClick={saveData}>Save</button>
        </div>
      ) : (
        <div className="flex grow items-center justify-center">
          <Loading />
        </div>
      )}
    </main>
  );
};

export default App;
