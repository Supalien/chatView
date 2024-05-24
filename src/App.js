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
  let msgs = Object.groupBy(messages, (m) => m.date);
  console.log(msgs);
  // for each date create a list of messages for that date
  msgs = Object.keys(msgs).map(key => <>
      {msgs[key].map((m, c) => m.author !== designated? 
      <Message className="message-container designated" msg={m} key={c}></Message> :
      <Message className="message-container other" msg={m} key={c}></Message>).reverse()}
      <div className="date-container"><p>{key}</p></div>
      </>
  );
  //   m => m.author !== designated? 
  // <Message className="message-container designated" msg={m} key={c}></Message> :
  // <Message className="message-container other" msg={m} key={c}></Message>);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Welcome to ChatView! 
        </h1>
        <div className="Phone-frame" onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className='Chat-container'>
            {msgs.reverse()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
