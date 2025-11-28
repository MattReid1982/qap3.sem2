import { useState, useEffect } from "react";
import ButtonA from "./components/BtnA.jsx";
import ButtonI from "./components/BtnI.jsx";
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
  const [Countries, setCountries] = useState([]); //Store country data
  const [filtered, setFiltered] = useState([]);

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

  // Filter logic
  function filterByLetter(letter) {
    const result = Countries.filter((c) => c.name.startsWith(letter));
    setFiltered(result);
  }

  return (
    <>
      <Header />

      <div className="btn-area">
        <ButtonA onClick={() => filterByLetter("A")} />
        <ButtonI onClick={() => filterByLetter("I")} />
      </div>

      <h2>Total Countries Loaded: {Countries.length}</h2>
      <ul>
        {filtered.map((c) => (
          <li key={c.cca3}>
            <img src={c.flag} width="30" alt="" /> {c.name} - {c.capital}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
