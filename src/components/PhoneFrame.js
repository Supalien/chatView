import { useState, useEffect, createRef, Fragment } from 'react';
import Message from './Message.js';
import { getMessages, getDesignated } from '../utils.js';

function PhoneFrame(props) {
  const [messages, setMessages] = useState(null);
  const [designated, setDesignated] = useState(null);
  const [file, setFile] = useState(props.file);
  const ref = createRef();

  useEffect(() => {
    if (file && file.type === 'text/plain') {
      file.text().then(res => { setMessages(getMessages(res)) });
      setDesignated(getDesignated(file.name));
    }
  }, [file, props.file])


  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation()
    setFile(e.dataTransfer.files[0]);
    console.log(`${e.dataTransfer.files.length} files dropped at PhoneFrame #${props.id}`);
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  if (messages == null || designated == null) {
    return (
      <div className="Phone-frame" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className='Chat-container'>
          <Message className="message-container other" msg={{ content: "You can also click below if you don't want to drag.", time: "00:02" }}>
            <input type="file" accept=".txt" ref={ref} onChange={handleChange} />
            <button className="btn" onClick={() => { ref.current.click() }}>
              Select File
            </button>
          </Message>
          <Message className="message-container other" msg={{ content: "Or drag multiple chat files outside of this phone to view them all at once.", time: "00:01" }}></Message>
          <Message className="message-container designated" msg={{ content: "Drag your chat-file into this phone.", time: "00:00" }}></Message>
          <div className="date-container"><p>02/02/2020</p></div>
          <Message className="message-container other" msg={{ content: "When you do that, WhatsApp will ask you to choose between two options. choose \"Without media\".", time: "00:02" }}></Message>
          <Message className="message-container designated" msg={{ content: "Then tap the three dots on the corner, tap \"More\" and then \"Export chat\"", time: "00:01" }}></Message>
          <Message className="message-container designated" msg={{ content: "To get your chat-file, go to WhatsApp and choose a chat.", time: "00:00" }}></Message>
          <div className="date-container"><p>12/02/2021</p></div>
        </div>
      </div>
    );
  }

  let msgs = Object.groupBy(messages, (m) => m.date);
  let c = 0;
  msgs = Object.keys(msgs).map((key, cc) => <Fragment key={cc}>
    {msgs[key].map(m => m.author !== designated ?
      <Message className="message-container designated" msg={m} key={c++} id={c}></Message> :
      <Message className="message-container other" msg={m} key={c++} id={c}></Message>).reverse()}
    <div className="date-container" key={c++}><p>{key}</p></div>
  </Fragment>
  );
  msgs.reverse();
  return (
    <div className="Phone-frame" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className='Chat-container'>
        {msgs}
      </div>
    </div>
  );
}

export default PhoneFrame;