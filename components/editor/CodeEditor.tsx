"use client";
import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  handleEditorChange,
  children,
}: {
  handleEditorChange?: (value: any, event: any) => void;
  children?: React.ReactNode;
}) {
  return (
    <Editor
      // height="90vh"
      height="50vh"
      width="50vw"
      // defaultLanguage="javascript"
      defaultLanguage="cpp"
      defaultValue="// some comment"
      onChange={handleEditorChange}
    />
  );
}
