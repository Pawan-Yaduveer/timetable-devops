import axios from "axios";

const API_BASE = "http://13.51.11.25:8080/api/timetable"; // change IP if deployed

export const fetchCourses = () => axios.get(`${API_BASE}/course`);
export const addCourse = (course) => axios.post(`${API_BASE}/course`, course);
export const deleteCourse = (code) => axios.delete(`${API_BASE}/course/${code}`);

export const fetchTimeSlots = () => axios.get(`${API_BASE}/timeslot`);
export const addTimeSlot = (slot) => axios.post(`${API_BASE}/timeslot`, slot);
export const deleteTimeSlot = (params) =>
  axios.delete(`${API_BASE}/timeslot`, { params });
