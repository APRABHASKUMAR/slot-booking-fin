import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Select() {
    // State variables
    const [courses, setCourses] = useState([]);
    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isCourseSelected, setIsCourseSelected] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    useEffect(() => {
        axios.get('/api/courses')
            .then(response => {
                console.log('Courses fetched:', response.data); // Log fetched courses
                setCourses(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the courses!", error);
            });
    }, []);
    
    useEffect(() => {
        if (selectedCourse) {
            axios.get(`/api/dates?courseId=${selectedCourse}`)
                .then(response => {
                    console.log('Dates fetched:', response.data); // Log fetched dates
                    setDates(response.data);
                    setIsCourseSelected(true);
                })
                .catch(error => {
                    console.error("There was an error fetching the dates!", error);
                });
        } else {
            setDates([]);
            setIsCourseSelected(false);
            setIsDateSelected(false);
            setSlots([]);
        }
    }, [selectedCourse]);
    
    useEffect(() => {
        if (selectedCourse && selectedDate) {
            axios.get(`/api/slots?courseId=${selectedCourse}&date=${selectedDate}`)
                .then(response => {
                    console.log('Slots fetched:', response.data); // Log fetched slots
                    setSlots(response.data);
                    setIsDateSelected(true);
                })
                .catch(error => {
                    console.error("There was an error fetching the slots!", error);
                });
        } else {
            setSlots([]);
            setIsDateSelected(false);
        }
    }, [selectedDate]);    
    

    // Handle course selection
    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    // Handle date selection
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Handle slot selection
    const handleSlotChange = (e) => {
        setSelectedSlot(e.target.value);
    };

    //Handle booking
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBookClick = () => {
        // Fetch generated credentials from the server
        axios.get('http://localhost:5000/api/generate-credentials')
            .then(response => {
                setUsername(response.data.username);
                setPassword(response.data.password);
                alert(`Course: ${selectedCourse}\nDate: ${selectedDate}\nSlot: ${selectedSlot}\n\nUsername: ${response.data.username}\nPassword: ${response.data.password}`);
            })
            .catch(error => {
                console.error("There was an error generating the credentials!", error);
            });
    };


    return <div className="bottom">
        
        <div className="col-12"> 
            <label for="id_course" className="form-label">Course / Experiment:</label>
            <select 
                    name="course" 
                    className="form-control" 
                    id="id_course"
                    value={selectedCourse}
                    onChange={handleCourseChange}
                >
                    {/* <option value="">--- Select Course ---</option> */}
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            <div className="mb-3" ><small id="total-slots-available" className="form-text">Slots remaining: xxx</small></div>
        </div>

        <div className="col-12">
        <label for="id_date" className="form-label">Date:</label>
        <div className="mb-3">
                    <select 
                        className="form-control" 
                        name="date" 
                        id="id_date" 
                        value={selectedDate}
                        onChange={handleDateChange}
                        disabled={!isCourseSelected}
                    >
                        {/* <option value="">--- Select Date ---</option> */}
                        {dates.map(date => (
                            <option key={date.value} value={date.value}>
                                {date.label}
                            </option>
                        ))}
                    </select>
        </div>
        </div>

        <div className="col-12">
            <label for="id_slot" className="form-label">Slot:</label>
            <select 
                    className="form-control" 
                    name="slot" 
                    id="id_slot" 
                    value={selectedSlot}
                    onChange={handleSlotChange}
                    disabled={!isDateSelected}
                >
                    {/* <option value="">--- Select Slot ---</option> */}
                    {slots.map(slot => (
                        <option key={slot.value} value={slot.value}>
                            {slot.label}
                        </option>
                    ))}
                </select>
            <small id="slot-length" className="form-text">Slot length: 1 hour</small>
        </div>

        <div className="col-md">
            <div className="d-grid gap-2">
                <label className="form-label">&nbsp;</label>
                <input 
                        className="btn btn-primary" 
                        id="submit-btn" 
                        type="submit" 
                        value="Book" 
                        disabled={!selectedSlot || !selectedCourse || !selectedDate}
                        // onClick={() => alert(`Course: ${selectedCourse}\nDate: ${selectedDate}\nSlot: ${selectedSlot}`)}
                        onClick = {handleBookClick} 
                    />
            </div>
        </div>
    </div>
}

export default Select;