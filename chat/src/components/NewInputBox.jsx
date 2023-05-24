import React, { useState } from 'react';

function Fopert() {
  const [fileContents, setFileContents] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setFileContents(contents);
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Preview fileContents={fileContents} />
    </div>
  );
}

function Preview({ fileContents }) {
  if (!fileContents) {
    return null; // Don't show anything if there is no file selected
  }

  if (typeof fileContents === 'string' && fileContents.startsWith('data:image/')) {
    return <img src={fileContents} alt="File preview" />;
  } else if (typeof fileContents === 'string' && fileContents.startsWith('data:application/pdf')) {
    return <iframe srcDoc={fileContents} title="File preview" />;
  } else {
    return <textarea value={fileContents} />;
  }
}

export default Fopert;
