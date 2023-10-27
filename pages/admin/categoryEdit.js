// https://github.com/josdejong/jsoneditor

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeaderBasic from "../../components/HeaderBasic";
import Seo from "../../components/Seo";
//import JSONEditorDemo from "../../components/JSONEditorDemo";
// import "./App.css";

const JSONEditorDemo = dynamic(
  () => import("../../components/JSONEditorDemo"),
  { ssr: false }
);

const App = () => {
  const [json, setJson] = useState();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch("/api/cat-repo");
      // convert the data to json
      const json = await response.json();

      // set state with the result
      setJson(json);
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

  const onChangeJSON = (updatedJson) => {
    setJson(updatedJson);
  };

  const updateTime = () => {
    const time = new Date().toISOString();
    setJson({ ...json, time });
  };

  const saveData = async () => {
    const response = await fetch("/api/cat-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="page-container ">
      <Seo title="categoryEdit" />
      <HeaderBasic title={{ text: "Category Edit" }} />
      {/* <h1>JSONEditor React demo</h1> */}
      <div className="contents ">
        <div className="menu">
          <button onClick={updateTime}>
            Create/update a field &quot;time&quot;
          </button>
        </div>
        {/* <JSONEditorDemo json={json} onChangeJSON={onChangeJSON} /> */}
        <div className="code">
          <pre>
            <code>{JSON.stringify(json, null, 2)}</code>
          </pre>
        </div>
      </div>
      <button onClick={saveData}>Save</button>
    </main>
  );
};

export default App;
