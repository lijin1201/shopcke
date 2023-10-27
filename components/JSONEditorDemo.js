// https://lightrun.com/answers/vankop-jsoneditor-react-jsoneditor-can-now-be-used-as-a-controlled-component

//"jsoneditor-react" ==Bing==>
// https://www.bing.com/ck/a?!&&p=e98a950b1958619fJmltdHM9MTY5NzE1NTIwMCZpZ3VpZD0yYjJmZGUwYi02YzUzLTZjYzYtMzE3Yi1jY2E2Njg1MzZhYWQmaW5zaWQ9NTQ1MQ&ptn=3&hsh=3&fclid=2b2fde0b-6c53-6cc6-317b-cca668536aad&psq=jsoneditor-react&u=a1aHR0cHM6Ly9yZWFjdGpzZXhhbXBsZS5jb20vYS1zaW1wbGUtcmVhY3QtY29tcG9uZW50LXRvLWhhbmRsZS1qc29uLWVkaXRpbmcvIzp-OnRleHQ9cmMtanNvbi1lZGl0b3IlMjBBJTIwc2ltcGxlJTIwcmVhY3QlMjBjb21wb25lbnQlMjB0aGF0JTIwaGFuZGxlcyUyMHlvdXIseW91JTIwdG8lMjBlZGl0JTIwdGhlJTIwSlNPTiUyMG9uJTIwdGhlJTIwZ28u&ntb=1

import React, { useRef, useEffect } from "react";
// import JSONEditor from "jsoneditor";
// import "jsoneditor/dist/jsoneditor.css";
// import "./JSONEditorDemo.css";

const JSONEditorDemo = ({ json, onChangeJSON }) => {
  const containerRef = useRef(null);
  const jsonEditorRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      mode: "tree",
      onChangeJSON: onChangeJSON,
    };

    // jsonEditorRef.current = new JSONEditor(containerRef.current, options);
    // jsonEditorRef.current.set(json);

    return () => {
      if (jsonEditorRef.current) {
        jsonEditorRef.current.destroy();
      }
    };
  }, [json, onChangeJSON]);

  useEffect(() => {
    if (jsonEditorRef.current) {
      jsonEditorRef.current.update(json);
    }
  }, [json]);

  return <div className="jsoneditor-react-container" ref={containerRef} />;
};

export default JSONEditorDemo;
