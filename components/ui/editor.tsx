"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgeStore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const {edgestore} = useEdgeStore();


  const handleUpload = async(file: File )=>{
    const response = await edgestore.publicFiles.upload({
        file
    })

    return response.url
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
      uploadFile : handleUpload
    // onEditorContentChange(ed)
  });

  const handleChange = ()=>{
   console.log(editor.document)
   onChange(JSON.stringify(editor.document).toString())
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={handleChange}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};
