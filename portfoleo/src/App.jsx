import PorfoleoSection from "./componentes/PorfoleoSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PorfoleoSection />} />
      </Routes>
    </Router>
  );
}

export default App;
