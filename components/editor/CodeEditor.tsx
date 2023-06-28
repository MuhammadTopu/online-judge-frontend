"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  handleEditorChange,
  language = "cpp",
}: {
  handleEditorChange?: (value: any, event: any) => void;
  language?: string;
}) {
  return (
    <Editor
      // height="90vh"
      height="50vh"
      width="40vw"
      // defaultLanguage="javascript"
      defaultLanguage={language}
      // defaultValue="// some comment"
      defaultValue={`#include<stdio.h>

int main(){
    printf("Hello world");
    return 0;
}`}
      onChange={handleEditorChange}
    />
  );
}
