// mockFileUpload.ts
export interface UploadResult {
  url: string;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  // Simulate a delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a fake URL for the uploaded file
  const fakeUrl = `https://fake-upload-url.com/${file.name}`;

  return { url: fakeUrl };
}

export function useEdgeStore() {
  return {
    publicFiles: {
      upload: uploadFile,
    },
  };
}
