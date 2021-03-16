import "./App.css";
import SearchBar from "./components/SearchBar";
import CardGallery from "./components/CardGallery";
import React, { useState } from "react";

function App() {
  const [searchResult, setSearchResult] = useState({ data: null });
  const handleSearchData = (data) => {
    setSearchResult(data);
  };

  return (
    <main>
      {/* {console.log(searchResult)} */}
      <SearchBar onSuccessSearch={handleSearchData} />
      <CardGallery searchResult={searchResult} />
    </main>
  );
}

export default App;
