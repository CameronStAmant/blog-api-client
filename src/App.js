import './App.css';
import Home from './components/Home';

function App(props) {
  return <Home authState={props.authState} />;
}

export default App;
