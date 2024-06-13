import { useState, useEffect} from 'react';
import Message from './Message.js';
import {getMessages, getDesignated} from '../utils.js';
import {messages as testMessages, designated as testDesignated} from '../testData.js';

function PhoneFrame(props) {
  const [messages, setMessages] = useState(testMessages);
  const [designated, setDesignated] = useState(testDesignated);
  const [file, setFile] = useState(props.file);

  useEffect(() => {
    if (file && file.type === 'text/plain'){
      file.text().then(res => {setMessages(getMessages(res))});
      setDesignated(getDesignated(file.name));
    }
  }, [file])


  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation()
    setFile(e.dataTransfer.files[0]);
    console.log(`${e.dataTransfer.files.length} files dropped at PhoneFrame #${props.id}`);
  }

  let msgs = Object.groupBy(messages, (m) => m.date);
  msgs = Object.keys(msgs).map(key => <>
    {msgs[key].map((m, c) => m.author !== designated? 
    <Message className="message-container designated" msg={m} key={c} id={c}></Message> :
    <Message className="message-container other" msg={m} key={c} id={c}></Message>).reverse()}
    <div className="date-container" key={key}><p>{key}</p></div>
    </>
  );
  
  return (
    <div className="Phone-frame" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className='Chat-container'>
        {msgs.reverse()}
      </div> 
    </div>
  );
}

export default PhoneFrame;