import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaBook, FaChalkboardTeacher, FaClock, FaCalendarAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default function App() {
  const baseUrl = 'http://13.51.11.25:8080/api/timetable';

  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');

  const [timeSlots, setTimeSlots] = useState([]);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slotCourseCode, setSlotCourseCode] = useState('');

  const fetchCourses = async () => {
    const res = await fetch(`${baseUrl}`);
    const data = await res.json();
    setCourses(data.courses || []);
    setTimeSlots(data.timeSlots || []);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const newCourse = { courseCode, courseName, instructorName };
    try {
      const res = await fetch(`${baseUrl}/course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        toast.success('✅ Course added successfully!');
        setCourseCode('');
        setCourseName('');
        setInstructorName('');
        fetchCourses();
      } else {
        toast.error('❌ Failed to add course');
      }
    } catch (err) {
      toast.error('❌ Network error');
    }
  };

  const timeToInt = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    return hour * 100 + minute;
  };

  const handleTimeSlotSubmit = async (e) => {
    e.preventDefault();
    const newSlot = {
      dayOfWeek: day,
      startTime: timeToInt(startTime),
      endTime: timeToInt(endTime),
      courseCode: slotCourseCode,
    };

    try {
      const res = await fetch(`${baseUrl}/timeslot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlot),
      });

      if (res.ok) {
        toast.success('✅ Time slot added successfully!');
        setDay('');
        setStartTime('');
        setEndTime('');
        setSlotCourseCode('');
        fetchCourses();
      } else {
        toast.error('❌ Failed to add time slot');
      }
    } catch (err) {
      toast.error('❌ Network error');
    }
  };

  const groupedSlots = timeSlots.reduce((acc, slot) => {
    const day = slot.dayOfWeek || 'Unknown';
    if (!acc[day]) acc[day] = [];
    acc[day].push(slot);
    return acc;
  }, {});

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <h1>📘 Timetable Manager</h1>

      <form className="course-form" onSubmit={handleCourseSubmit}>
        <h2><FaBook /> Add Course</h2>
        <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
        <input type="text" placeholder="Instructor Name" value={instructorName} onChange={(e) => setInstructorName(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>

      <form className="timeslot-form" onSubmit={handleTimeSlotSubmit}>
        <h2><FaClock /> Add TimeSlot</h2>
        <input type="text" placeholder="Day (e.g. Monday)" value={day} onChange={(e) => setDay(e.target.value)} required />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <input type="text" placeholder="Course Code" value={slotCourseCode} onChange={(e) => setSlotCourseCode(e.target.value)} required />
        <button type="submit">Add TimeSlot</button>
      </form>

      <div className="course-list">
        <h2><FaChalkboardTeacher /> All Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.courseCode}>
              <strong>{course.courseCode}</strong>: {course.courseName}<br />
              👨‍🏫 <em>{course.instructorName}</em>
            </li>
          ))}
        </ul>
      </div>

      <div className="timeslot-grid">
        <h2><FaCalendarAlt /> Weekly Timetable</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Course Code</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedSlots).map(([day, slots]) =>
              slots.map((slot, idx) => (
                <tr key={`${day}-${idx}`}>
                  {idx === 0 && (
                    <td rowSpan={slots.length}><strong>{day}</strong></td>
                  )}
                  <td>🕒 {String(slot.startTime).padStart(4, '0')} - {String(slot.endTime).padStart(4, '0')}</td>
                  <td>📘 {slot.courseCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
