package com.example.timetable.model;

import java.util.ArrayList;
import java.util.List;

public class Timetable {
    private List<Course> courses = new ArrayList<>();
    private List<TimeSlot> timeSlots = new ArrayList<>();

    public List<Course> getCourses() { return courses; }
    public void setCourses(List<Course> courses) { this.courses = courses; }

    public List<TimeSlot> getTimeSlots() { return timeSlots; }
    public void setTimeSlots(List<TimeSlot> timeSlots) { this.timeSlots = timeSlots; }

    public void addCourse(Course course) { courses.add(course); }
    public void removeCourse(String courseCode) {
        courses.removeIf(c -> c.getCourseCode().equals(courseCode));
    }

    public void addTimeSlot(TimeSlot slot) { timeSlots.add(slot); }
    public void removeTimeSlot(String day, int start, int end) {
        timeSlots.removeIf(t -> t.getDayOfWeek().equals(day) && t.getStartTime() == start && t.getEndTime() == end);
    }
}
