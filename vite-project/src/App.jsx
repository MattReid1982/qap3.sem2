//Imports from other components for function
import { useState, useEffect } from "react";
import ButtonA from "./components/BtnA.jsx";
import ButtonI from "./components/BtnI.jsx";
import "./App.css";
import Header from "./components/Header.jsx";

//useState functions
function App() {
  const [Countries, setCountries] = useState([]); //Store country data
  const [filtered, setFiltered] = useState([]);

  // Fetch the countries once the page is loaded.
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3"
        );

        const data = await res.json();

        // Clean the data
        const formatted = data.map((c) => {
          return {
            name: c.name?.official || "Unknown",
            capital: c.capital ? c.capital[0] : "No Capital",
            flag: c.flags?.png || "",
            borders: c.borders,
            cca3: c.cca3,
          };
        });
        //Error message if applicable
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
  // Display the Data selected
  return (
    <>
      {/* Header/ buttons and table */}
      <Header />

      <div className="btn-area">
        <ButtonA onClick={() => filterByLetter("A")} />
        <ButtonI onClick={() => filterByLetter("I")} />
      </div>

      <h2>Total Countries Loaded: {Countries.length}</h2>

      <table className="country-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Borders</th>
          </tr>
        </thead>
        <tbody>
          {/* Filter the data for the table and set key to allow it to display properly in browser */}
          {filtered.map((c) => (
            <tr key={c.cca3}>
              <td>
                <img src={c.flag} width="40" />
              </td>
              <td>{c.name}</td>
              <td>{c.capital}</td>
              <td>{c.borders.length > 0 ? c.borders.join(", ") : "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
// Export the app
export default App;
