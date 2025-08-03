// src/App.jsx

import Header from "./components/Header";
import WeatherContainer from "./components/WeatherContainer";
import SearchBar from "./components/SearchBar";

function App() {
  return (
     <> 
     <Header />
    <WeatherContainer >
      <SearchBar />
        </WeatherContainer>
    </>
  );
}

export default App;