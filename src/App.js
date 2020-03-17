import exifr from "exifr/dist/lite.legacy.umd";
import React, { useRef, useState } from "react";
import "./index.css";

export default function App() {
  const fileRef = useRef(null);
  const [orientation, setOrientation] = useState(null);

  const onFileChange = () => {
    const fileReader = new FileReader();

    fileReader.onload = e => {
      const buffer = fileReader.result;

      exifr
        .orientation(buffer)
        .then(x => { setOrientation(typeof x === "undefined" ? null : x); })
        .catch(e => { if (console) { console.error(e); } });
    };

    fileReader.readAsArrayBuffer(fileRef.current.files[0]);
  };

  return (
    <div className="App">
      <input
        type="file"
        ref={fileRef}
        accept="image/jpeg"
        onChange={onFileChange}
      />
      <div className="Body">
        <label>Orientation</label>
        <span>{orientation === null ? "NULL" : orientation}</span>
      </div>
    </div>
  );
}
