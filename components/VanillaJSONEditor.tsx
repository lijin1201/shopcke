// import { JSONEditor, Content, OnChange } from "vanilla-jsoneditor";
import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";
import { useState, useEffect, useRef } from "react";
// import { CategoryDataType } from "../types";
// import dynamic from "next/dynamic";
// import "./VanillaJSONEditor.css";

// import "ace-builds";
// import "ace-builds/webpack-resolver";

// interface SvelteJSONEditorProps {
//   content?: Content | undefined;
//   readOnly?: boolean | undefined;
//   onChange?: OnChange | undefined;
// }

//export default function SvelteJSONEditor(props: SvelteJSONEditorProps) {
const VanillaJSONEditor: React.FC<JSONEditorPropsOptional> = (props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JSONEditor | null>(null);
  //   const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    // setShowChild(true);
    // let JSONEditor;
    // if (typeof window !== "undefined") {
    //   //   const { JSONEditor } = dynamic(() => import("vanilla-jsoneditor"), {
    //   //     ssr: false,
    //   //   });
    //   JSONEditor = require("vanilla-jsoneditor");
    // }
    // if (JSONEditor && refContainer.current) {

    // if (typeof window !== "undefined") {
    // if (refContainer.current) {
    // create editor

    console.log("create editor", refContainer.current);

    refEditor.current = new JSONEditor({
      target: refContainer.current!,
      // props: {},
      props,
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        console.log("destroy editor");
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
    // }
    // }
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      console.log("update props", props);
      refEditor.current.updateProps(props);
    }
  }, [props]);

  //   if (!showChild) {
  //     return null;
  //   }
  // if (typeof window === "undefined") return null;
  return (
    <div>
      <div className="vanilla-jsoneditor-react" ref={refContainer}></div>
    </div>
  );
};

export default VanillaJSONEditor;
