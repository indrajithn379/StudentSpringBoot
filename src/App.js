import React, { useState } from "react";
import AddStudentForm from "./AddStudentForm";
import axiosconfig from "./api/axiosconfig";

function App() {
  return (
    <div className="App">
      <AddStudentForm />
    </div>
  );
}

export default App;
