import React, { useEffect, useState } from "react";
import { fetchCourses, deleteCourse } from "../api";

function CourseList() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const res = await fetchCourses();
    setCourses(res.data);
  };

  const handleDelete = async (code) => {
    await deleteCourse(code);
    loadCourses();
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <h3>Courses</h3>
      <ul>
        {courses.map((c) => (
          <li key={c.code}>
            {c.code} - {c.name}
            <button onClick={() => handleDelete(c.code)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
