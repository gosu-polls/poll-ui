import './components/css/App.css';
import {Home} from './components/Home'



function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"> </header>
          {console.log("Env: ", process.env.NODE_ENV)}
          <Home />
      </div>
    </>
  );
}

export default App;
