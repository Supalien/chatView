import { useState } from 'react';
import Message from './Message.js';
import {getMessages, getDesignated} from '../utils.js';
import {messages as testMessages, designated as testDesignated} from '../testData.js';

function PhoneFrame(props) {
  const [messages, setMessages] = useState(testMessages);
  const [designated, setDesignated] = useState(testDesignated);

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    let file = (e.dataTransfer.files[0]);
    if (file && file.type === 'text/plain'){
      file.text().then(res => {setMessages(getMessages(res))});
      setDesignated(getDesignated(file.name));
    }
    else console.log('error', e);
  }
  let msgs = Object.groupBy(messages, (m) => m.date);
  msgs = Object.keys(msgs).map(key => <>
    {msgs[key].map((m, c) => m.author !== designated? 
    <Message className="message-container designated" msg={m} key={c}></Message> :
    <Message className="message-container other" msg={m} key={c}></Message>).reverse()}
    <div className="date-container"><p>{key}</p></div>
    </>
  );

  console.log('messages', messages)
  
  return (
    <div className="Phone-frame" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className='Chat-container'>
        {msgs.reverse()}
      </div> 
    </div>
  );
}

export default PhoneFrame;