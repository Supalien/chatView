import './App.css';
import PhoneFrame from "./components/PhoneFrame.js";
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>
        Welcome to ChatView! 
        </h1>
      </header>
      <main className='App-main'>
        <PhoneFrame></PhoneFrame>
        <PhoneFrame></PhoneFrame>
      </main>
    </div>
  );
}

export default App;
