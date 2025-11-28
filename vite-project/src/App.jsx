import { useState, useEffect } from "react";
import ButtonA from "./components/BtnA.jsx";
import ButtonI from "./components/BtnI.jsx";
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
  const [Countries, setCountries] = useState([]); //Store country data
  const [showA, setShowA] = useState(false);
  const [showI, setShowI] = useState(false);

  // Fetch the countries once the page is loaded.
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        // Clean the data
        const formatted = data.map((c) => ({
          name: c.name?.official || "unknown",
          capital: c.capital ? c.capital[0] : "No Capital",
          flag: c.flags?.png || "",
          borders: c.borders || [],
          cca3: c.cca3,
        }));

        setCountries(formatted);
      } catch (err) {
        console.log("API error:", err);
      }
    }

    loadData(); //Calls the function
  }, []); // Leave the array empty, so it only runs once

  return (
    <>
      <Header />

      <div className="btn-area">
        <ButtonA onclick={() => setShowA(!showA)} />
        <ButtonI onclick={() => setShowI(!showI)} />
      </div>

      {showA && <p>You clicked button A!</p>}
      {showI && <p>You clicked button I!</p>}

      <h2>Total Countries Loaded: {Countries.length}</h2>
    </>
  );
}

export default App;
