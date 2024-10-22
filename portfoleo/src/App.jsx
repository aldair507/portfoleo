import PorfoleoSection from "./componentes/PorfoleoSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-[80%] mx-auto">
      <Router basename="/portfoleo">
        <Routes>
          <Route path="/" element={<PorfoleoSection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
