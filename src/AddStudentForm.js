import React, { useState, useEffect } from "react";
import axiosconfig from "./api/axiosconfig";
import "./App.css"; // Importing CSS file

const AddStudentForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);

  // Function to fetch students data
  const fetchStudents = async () => {
    try {
      const response = await axiosconfig.get("/api/students");
      setStudents(response.data); // Assuming the response.data is an array of students
    } catch (error) {
      console.error("Error fetching students:", error.response.data);
    }
  };

  useEffect(() => {
    if (showStudents) {
      fetchStudents();
    }
  }, [showStudents]); // Fetch students data when showStudents state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", { name, age, city });

    try {
      const response = await axiosconfig.post("/api/students", {
        name,
        age: parseInt(age),
        city,
      });

      setMessage("Student added successfully!");
      console.log("Response:", response.data);
      // Refresh the students list after adding a new student
      fetchStudents();
    } catch (error) {
      setMessage("Failed to add student");
      console.error("Error adding student:", error.response.data);
    }
  };

  const handleShowStudents = () => {
    setShowStudents((prevState) => !prevState); // Toggle the showStudents state
  };

  return (
    <div className="container">
      <h2>Student Form </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form><br />
      {message && <div className="message">{message}</div>}

      {/* Button to show all students */}
      <button onClick={handleShowStudents} className="btn-show">
        {showStudents ? "Hide All Students" : "Show All Students"}
      </button>

      {/* Displaying all students */}
      {showStudents && (
        <div>
          <h2>All Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <strong>Name:</strong> {student.name}, <strong>Age:</strong>{" "}
                {student.age}, <strong>City:</strong> {student.city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
