import React, { useState } from "react";
import { addCourse } from "../api";

function CourseForm({ onAdd }) {
  const [course, setCourse] = useState({ code: "", name: "" });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse(course);
    onAdd();
    setCourse({ code: "", name: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="code" value={course.code} onChange={handleChange} placeholder="Code" required />
      <input name="name" value={course.name} onChange={handleChange} placeholder="Name" required />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;
