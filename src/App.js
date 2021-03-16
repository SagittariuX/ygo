import "./App.css";
import SearchBar from "./components/SearchBar";
import CardGallery from "./components/CardGallery";

const { REACT_APP_VERSION } = process.env;
function App() {
  console.log({ REACT_APP_VERSION });
  return (
    <main>
      <SearchBar />

      <CardGallery />
    </main>
  );
}

export default App;
