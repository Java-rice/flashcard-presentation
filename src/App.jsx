import "@src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@src/pages/Home";
import Game from "@src/pages/Game";
import Lesson from "@src/pages/Lesson";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questions from "@src/components/Questions";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/lesson/:steps" element={<Lesson />} />
          <Route path="/game" element={<Game />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
