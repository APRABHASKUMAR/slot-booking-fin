import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingConfirmationModal from "./BookingConfirmationModal";
// import Alert from 'react-bootstrap/Alert';
import BookingSuccess from './BookingSuccess';
// import SuccessAnimation from "./SuccessAnimation";

function Select() {
    const [courses, setCourses] = useState([]);
    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isCourseSelected, setIsCourseSelected] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    // Fetch Courses
    useEffect(() => {
        axios.get('/api/courses')
            .then(response => {
                setCourses(response.data);
                console.log('Courses fetched:', response.data);
            })
            .catch(error => console.error("Error fetching courses", error));
    }, []);

    // Fetch Dates
    useEffect(() => {
        axios.get('/api/dates')
            .then(response => {
                setDates(response.data);
                console.log('Dates fetched:', response.data);
            })
            .catch(error => console.error("Error fetching dates", error));
    }, []);

    // Fetch Slots
    useEffect(() => {
        axios.get('/api/slots')
            .then(response => {
                setSlots(response.data);
                console.log('Slots fetched:', response.data);
            })
            .catch(error => console.error("Error fetching slots", error));
    }, []);

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setIsCourseSelected(true);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setIsDateSelected(true);
    };

    const handleSlotChange = (e) => {
        setSelectedSlot(e.target.value);
    };

    return (
        <div>
            <select value={selectedCourse} onChange={handleCourseChange}>
                <option value="">Select Course</option>
                {courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
            </select>

            <select value={selectedDate} onChange={handleDateChange} disabled={!isCourseSelected}>
                <option value="">Select Date</option>
                {dates.map(date => <option key={date.value} value={date.value}>{date.label}</option>)}
            </select>

            <select value={selectedSlot} onChange={handleSlotChange} disabled={!isDateSelected}>
                <option value="">Select Slot</option>
                {slots.map(slot => <option key={slot.value} value={slot.value}>{slot.label}</option>)}
            </select>
        </div>
    );
}

export default Select;
