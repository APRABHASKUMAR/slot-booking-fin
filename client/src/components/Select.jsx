import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../stylizer/Select.css";
import MediumHeading from "../components/MediumHeading";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Sidenav from "./Sidenav";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';

function Select() {
    const [courses, setCourses] = useState([]);
    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isCourseSelected, setIsCourseSelected] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [view, setView] = useState("bookings");

    // Retrieve user email from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email || '';

    // Fetch courses on component mount
    useEffect(() => {
        axios.get('/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses!", error));
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            axios.get(`/api/dates`)
                .then(response => {
                    setDates(response.data);
                    setIsCourseSelected(true);
                })
                .catch(error => console.error("Error fetching dates!", error));
        } else {
            setDates([]);
            setIsCourseSelected(false);
            setIsDateSelected(false);
            setSlots([]);
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedCourse && selectedDate) {
            axios.get(`/api/slots`)
                .then(response => {
                    setSlots(response.data);
                    setIsDateSelected(true);
                })
                .catch(error => console.error("Error fetching slots!", error));
        } else {
            setSlots([]);
            setIsDateSelected(false);
        }
    }, [selectedDate]);

    // Handle booking
    const handleBookClick = () => {
        const bookingData = {
            courseId: selectedCourse,
            date: selectedDate,
            slot: selectedSlot,
            userId: user?.email.split('@')[0] || ''
        };

        axios.post('/api/bookings/new', bookingData)
            .then(response => {
                // Booking successful, send email confirmation
                axios.post('/api/book/sendEmail', {
                    email,
                    courseId: selectedCourse,
                    date: selectedDate,
                    slot: selectedSlot
                })
                .then(() => {
                    setDialogMessage('Booking successful! A confirmation email has been sent.');
                    setDialogOpen(true);
                })
                .catch(err => {
                    setDialogMessage('Booking successful! But an error occurred while sending the email.');
                    setDialogOpen(true);
                });

                // Reset booking fields
                setSelectedCourse("");
                setSelectedDate("");
                setSelectedSlot("");
                setIsCourseSelected(false);
                setIsDateSelected(false);
            })
            .catch(error => {
                setDialogMessage('Failed to book the slot. Please try another slot.');
                setDialogOpen(true);
            });
    };

    // Handle upcoming bookings
    const handleUpcomingBookingsClick = () => {
        axios.get(`/api/bookings/upcoming`, { params: { userId: user?.email.split('@')[0] || '' } })
            .then(response => {
                setUpcomingBookings(response.data);
                setView("upcomingBookings");
            })
            .catch(error => console.error("Error fetching upcoming bookings", error));
    };

    return (
        <div>
            <Sidenav 
                onBookingClick={() => setView("bookings")}
                onUpcomingBookingsClick={handleUpcomingBookingsClick}
                loggedInUser={user?.email.split('@')[0] || ''}
            />

            {view === "bookings" ? (
                <div className="bottom">
                    <div className="booking-card">
                        <MediumHeading title="Book your lab slot" />
                        <div className="col-12 mb-4 mt-5"> 
                            <label htmlFor="id_course" className="form-label">Course / Experiment:</label>
                            <select 
                                name="course" 
                                className="form-control" 
                                id="id_course"
                                value={selectedCourse}
                                onChange={e => setSelectedCourse(e.target.value)}
                            >
                                <option value="" disabled>Select a course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 mb-4">
                            <label htmlFor="id_date" className="form-label">Date:</label>
                            <select 
                                className="form-control" 
                                name="date" 
                                id="id_date" 
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                disabled={!isCourseSelected}
                            >
                                <option value="" disabled>Select a date</option>
                                {dates.map(date => (
                                    <option key={date.value} value={date.value}>{date.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12">
                            <label htmlFor="id_slot" className="form-label">Slot:</label>
                            <select 
                                className="form-control" 
                                name="slot" 
                                id="id_slot" 
                                value={selectedSlot}
                                onChange={e => setSelectedSlot(e.target.value)}
                                disabled={!isDateSelected}
                            >
                                <option value="" disabled>Select a slot</option>
                                {slots.map(slot => (
                                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12">
                            <div className="d-grid gap-2">
                                <button 
                                    className="btn btn-primary" 
                                    id="submit-btn" 
                                    onClick={handleBookClick}
                                    disabled={!selectedCourse || !selectedDate || !selectedSlot}
                                >
                                    Book Slot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="upcoming-bookings">
                    <MediumHeading title="Your Upcoming Bookings" />
                    {upcomingBookings.length > 0 ? (
                        <Table height={400} data={upcomingBookings}>
                            <Column width={200} align="center" fixed>
                                <HeaderCell>Course</HeaderCell>
                                <Cell dataKey="courseName" />
                            </Column>
                            <Column width={200} align="center">
                                <HeaderCell>Date</HeaderCell>
                                <Cell dataKey="date" />
                            </Column>
                            <Column width={200} align="center">
                                <HeaderCell>Slot</HeaderCell>
                                <Cell dataKey="slot" />
                            </Column>
                        </Table>
                    ) : (
                        <p>No upcoming bookings found.</p>
                    )}
                </div>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Booking Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Select;
