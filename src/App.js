import {useState} from "react";
import './App.css';
import Message from './components/Message';
import {getMessages, getDesignated} from './utils.js';
import {messages as testMessages, designated as testDesignated} from './testData.js';

function App() {
  //const [file, setFile] = useState(null);
  let file;
  const [messages, setMessages] = useState(testMessages);
  const [designated, setDesignated] = useState(testDesignated);

  function handleDragOver(e) {
    e.preventDefault();
    console.log('handleDragOver', handleDragOver);
  }
  function handleDrop(e) {
    console.log('handleDrop', e);
    e.preventDefault();
    file = (e.dataTransfer.files[0]);
    if (file && file.type === 'text/plain'){
      file.text().then(res => {setMessages(getMessages(res))});
      setDesignated(getDesignated(file.name));
    }
    else console.log('error', e);
  }
  const msgs = messages.map((m,c) => m.author !== designated? 
  <Message className="message-container designated" content={m.content} key={c}></Message> :
  <Message className="message-container other" content={m.content} key={c}></Message>);
  console.log(msgs);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Welcome to ChatView! 
        </h1>
        <div className="Phone-frame" onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className='Chat-container'>
            {msgs}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
