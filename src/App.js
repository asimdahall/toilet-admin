import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ToiletList from "./components/ToiletList";
import ToiletDetails from "./components/ToiletDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index exact element={<ToiletList />} />
        <Route path="/toilets/:id" element={ToiletDetails} />
      </Routes>

      {/* Add other routes here */}
    </Router>
  );
}

export default App;
