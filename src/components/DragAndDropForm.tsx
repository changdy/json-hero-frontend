import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";
import { createFromFile } from "~/api/create";

export function DragAndDropForm() {
  const filenameRef = useRef<string>("");
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const firstFile = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        if (reader.result == null) {
          return;
        }

        let jsonValue: string | undefined = undefined;

        if (typeof reader.result === "string") {
          jsonValue = reader.result;
        } else {
          const decoder = new TextDecoder("utf-8");
          jsonValue = decoder.decode(reader.result);
        }

        invariant(jsonValue, "jsonValue is undefined");

        try {
          const result = await createFromFile(filenameRef.current || firstFile.name, jsonValue);
          if (result.id) {
            navigate(`/j/${result.id}`);
          }
        } catch {
          // Handle error
        }
      };
      reader.readAsArrayBuffer(firstFile);
      filenameRef.current = firstFile.name;
    },
    [navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    multiple: false,
    accept: { "application/json": [".json"] },
  });

  return (
    <div
      {...getRootProps()}
      className="block min-w-[300px] cursor-pointer rounded-md border-2 border-dashed border-slate-600 bg-slate-900/40 p-4 text-base text-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
    >
      <input {...getInputProps()} />
      <div className="flex items-center">
        <ArrowDownCircleIcon
          className={`mr-3 inline h-6 w-6 ${
            isDragActive ? "text-lime-500" : ""
          }`}
        />
        <p className={`${isDragActive ? "text-lime-500" : ""}`}>
          {isDragActive
            ? "Now drop to open it…"
            : "Drop a JSON file here, or click to select"}
        </p>
      </div>
    </div>
  );
}
