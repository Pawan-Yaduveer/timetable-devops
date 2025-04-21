package com.example.timetable.controller;

import com.example.timetable.model.Course;
import com.example.timetable.model.TimeSlot;
import com.example.timetable.model.Timetable;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "*")
public class TimetableController {

    private static final Logger logger = LoggerFactory.getLogger(TimetableController.class);
    private Timetable timetable = new Timetable();

    @PostConstruct
    public void init() {
        logger.info("✅ Logging system is active.");
    }

@PostMapping("/course")
public String addCourse(@RequestBody Course course) {
    timetable.addCourse(course);
    logger.info("Adding new course: Course Code - {}, Course Name - {}", course.getCourseCode(), course.getCourseName());
    logger.warn("This is a WARNING log while adding course {}", course.getCourseCode());
    logger.error("This is an ERROR log for testing purposes");
    logger.debug("DEBUG: Added course object: {}", course);
    return "Course added successfully";
}

    @DeleteMapping("/course/{code}")
    public String removeCourse(@PathVariable String code) {
        try {
            if (code == null || code.equalsIgnoreCase("null")) {
                logger.warn("Received invalid course code: {}", code);
                return "Invalid course code";
            }
            timetable.removeCourse(code);
            logger.info("Course removed: {}", code);
            return "Course removed successfully";
        } catch (Exception e) {
            logger.error("Error removing course with code {}: {}", code, e.getMessage(), e);
            return "Error removing course";
        }
    }

    @PostMapping("/timeslot")
    public String addTimeSlot(@RequestBody TimeSlot slot) {
        try {
            logger.debug("Received request to add time slot: {}", slot);
            timetable.addTimeSlot(slot);
            logger.info("Time slot added successfully: {} from {} to {}", slot.getDayOfWeek(), slot.getStartTime(), slot.getEndTime());
            return "Time slot added successfully";
        } catch (Exception e) {
            logger.error("Error adding time slot: {}", e.getMessage(), e);
            return "Error adding time slot";
        }
    }

    @DeleteMapping("/timeslot")
    public String removeTimeSlot(@RequestParam String day,
                                 @RequestParam int start,
                                 @RequestParam int end) {
        try {
            logger.debug("Received request to remove time slot: {} from {} to {}", day, start, end);
            timetable.removeTimeSlot(day, start, end);
            logger.info("Time slot removed: {} from {} to {}", day, start, end);
            return "Time slot removed successfully";
        } catch (Exception e) {
            logger.error("Error removing time slot for {} from {} to {}: {}", day, start, end, e.getMessage(), e);
            return "Error removing time slot";
        }
    }

    @GetMapping
    public Timetable getTimetable() {
        try {
            long startTime = System.currentTimeMillis();
            Timetable timetable = this.timetable;
            long endTime = System.currentTimeMillis();
            logger.info("Fetched timetable in {} ms", (endTime - startTime));
            return timetable;
        } catch (Exception e) {
            logger.error("Error fetching timetable: {}", e.getMessage(), e);
            return null;
        }
    }

    @GetMapping("/course")
    public List<Course> getCourses() {
        try {
            logger.debug("Fetching all courses");
            return timetable.getCourses();
        } catch (Exception e) {
            logger.error("Error fetching courses: {}", e.getMessage(), e);
            return null;
        }
    }

    @GetMapping("/timeslot")
    public List<TimeSlot> getTimeSlots() {
        try {
            logger.debug("Fetching all time slots");
            return timetable.getTimeSlots();
        } catch (Exception e) {
            logger.error("Error fetching time slots: {}", e.getMessage(), e);
            return null;
        }
    }
}
