package com.example.timetable.model;

public class Course {
    private String courseName;
    private String courseCode;
    private String instructorName;

    public Course() {}

    public Course(String courseName, String courseCode, String instructorName) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructorName = instructorName;
    }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
}
