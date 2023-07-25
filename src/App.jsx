import './components/css/App.css';
import {Home} from './components/Home'
// import { Collapsible } from './components/Collapsible';



function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"> </header>
          {/* <Collapsible label="Introduction" >
          <h1>introduction</h1>
          <p>
            The collapsible component puts long sections of the information under a
            block enabling users to expand or collapse to access its details.
          </p>
          </Collapsible> */}
          <Home />
      </div>
    </>
  );
}

export default App;
