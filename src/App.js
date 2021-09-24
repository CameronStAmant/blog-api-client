import './App.css';
import Home from './components/Home';

function App(props) {
  return (
    <div className="bg-gray-600 min-h-screen">
      <Home authState={props.authState} />
    </div>
  );
}

export default App;
