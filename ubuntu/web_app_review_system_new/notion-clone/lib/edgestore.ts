"use client";

import { uploadFile, UploadResult } from "./mockFileUpload";
import React from 'react';

export const useEdgeStore = () => {
  return {
    publicFiles: {
      upload: uploadFile,
    },
  };
};

export const EdgeStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};
