import { FunctionComponent, ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export const FileDropzone: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        if (typeof reader.result === "string") {
          JSON.parse(reader.result);
          // dataSourceDispatch(setJSONAction("Needs title", json));
        } else {
          // dataSourceDispatch(setErrorAction("Can't read file"));
        }
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: { "application/json": [".json"], "text/*": [".txt", ".json"] },
    noDragEventsBubbling: true,
  });

  return (
    <div
      {...getRootProps()}
      className={"absolute w-screen h-screen m-0 p-0 left-0 top-0"}
    >
      <div
        className={`${
          isDragActive ? "" : "hidden"
        } absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center`}
      >
        <div className={"text-center"}>
          {/*<input {...getInputProps()} />*/}
          <ArrowDownTrayIcon className={"w-72 h-72 text-white"} />
          <p className={"text-white text-2xl"}>
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
