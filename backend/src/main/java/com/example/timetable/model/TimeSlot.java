package com.example.timetable.model;

public class TimeSlot {
    private String dayOfWeek;
    private int startTime;
    private int endTime;

    public TimeSlot() {}

    public TimeSlot(String dayOfWeek, int startTime, int endTime) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public int getStartTime() { return startTime; }
    public void setStartTime(int startTime) { this.startTime = startTime; }

    public int getEndTime() { return endTime; }
    public void setEndTime(int endTime) { this.endTime = endTime; }
}
