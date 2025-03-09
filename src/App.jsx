import "@src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@src/pages/Home"
import Game from "@src/pages/Game";
import Lesson from "@src/pages/Lesson";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/lesson" element={<Lesson />}/>
        <Route path="/lesson/:steps" element={<Lesson />}/>
        <Route path="/game" element={<Game />}/>
      </Routes>
    </Router>
    </>
  );
}


export default App;
