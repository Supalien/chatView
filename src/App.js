import './App.css';
import { useState } from 'react';
import PhoneFrame from "./components/PhoneFrame.js";
function App() {
  const [files, setFiles] = useState(null);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
    console.log(`${e.dataTransfer.files.length} files dropped at main`);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Welcome to ChatView! 
        </h1>
      </header>
      <main className='App-main' onDragOver={handleDragOver} onDrop={handleDrop}>
        {files ?
        Array.from(files).map((file, k) => <PhoneFrame file={file} key={k} id={k}></PhoneFrame>):
        <PhoneFrame></PhoneFrame>}
      </main>
    </div>
  );
}

export default App;
