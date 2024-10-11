"use client";

import { useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { uploadFile } from "@/src/mockBackend/mockApi";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

// Custom WebSocket implementation that does nothing
class NoOpWebSocket extends EventTarget {
  constructor(url: string, protocols?: string | string[]) {
    super();
    console.log('NoOpWebSocket constructor called with URL:', url);
  }
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    console.log('NoOpWebSocket send called with data:', data);
  }
  close(code?: number, reason?: string) {
    console.log('NoOpWebSocket close called with code:', code, 'and reason:', reason);
  }
}

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const handleUpload = async (file: File) => {
    try {
      const res = await uploadFile(file);
      return res.url;
    } catch (error) {
      console.error("Failed to upload file:", error);
      return "";
    }
  };

  useEffect(() => {
    // Replace the global WebSocket with our no-op version
    (global as any).WebSocket = NoOpWebSocket;
  }, []);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  const handleEditorChange = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Editor;
