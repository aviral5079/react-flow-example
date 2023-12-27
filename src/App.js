import "./App.css";
// import CustomNodeFlow from "./components/CustomNode/Graph";
// import UpdateNode from "./components/UpdateNode/Graph";
import CustomNodeFlow from "./components/ExpandCollapse/Graph";

function App() {
  return (
    <div className="App">
      <CustomNodeFlow />
      {/* <UpdateNode /> */}
    </div>
  );
}

export default App;
