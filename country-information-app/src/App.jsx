import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CountryInformation } from "./components/CountryInformation";
import { NeighborsA } from "./components/NeighborsA";
import { CountryInformation } from "./components/Country";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CountryInformation />
    </div>
  );
}

export default App;
