import "./App.css";
import ClickToComponent from "./ClickToComponent";
import Parent from "./Parent";

// React
// https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

function App() {
  return (
    <div>
      <div className="App">
        Container
        <Parent title="parent" list={[1, 2, 3, 4]} />
      </div>

      <ClickToComponent />
    </div>
  );
}

export default App;
