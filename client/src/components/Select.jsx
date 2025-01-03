import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../stylizer/Select.css"
import MediumHeading from "../components/MediumHeading";
import BookingConfirmationModal from "./BookingConfirmationModal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Sidenav from "./Sidenav";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'; 

 
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
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [view, setView] = useState("bookings");

      // Fetch the user object from localStorage and parse it
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email || '';
      // Get the email and extract the username before the '@'
      const userid = user?.email.split('@')[0] || ''; // Handle if user or email is undefined
 
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
            // axios.get(`/api/dates?courseId=${selectedCourse}`)
            axios.get(`/api/dates`)
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
            // axios.get(`/api/slots?courseId=${selectedCourse}&date=${selectedDate}`)
            axios.get(`/api/slots`)
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
    const handleBookClick = () => {
        const bookingData = {
            courseId: selectedCourse,
            date: selectedDate,
            slot: selectedSlot,
            userId: userid 
        };

        axios.post('/api/bookings/new', bookingData)
            .then(response => {
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
                // Reset form
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
    
    // const handleBookClick = () => {
    //     // Fetch generated credentials from the server
    //     axios.get('http://localhost:5000/api/generate-credentials')
    //         .then(response => {
    //             setUsername(response.data.username);
    //             setPassword(response.data.password);
    //             setShowModal(true);
    //             setShowSuccess(true);
    //             setTimeout(() => setShowSuccess(false), 3000);
    //         })
    //         .catch(error => {
    //             console.error("There was an error generating the credentials!", error);
    //         });
    // };

    const handleBookingClick = () => {
        setView("bookings");
        console.log('Navigating to Book a New Slot');
      };
    
    //Handle upcoming bookings
    const handleUpcomingBookingsClick = () => {
        console.log("Attempting to fetch upcoming bookings");
        axios.get(`http://localhost:5000/api/bookings/upcoming`, { params: { userId: userid } })
            .then(response => {
                console.log('Data:', response.data);
                if(response.data.length === 0){
                    console.log("No upcoming bookings found");
                }
                else {
                    setUpcomingBookings(response.data);
                    setView("upcomingBookings");
                }
            })
            .catch(error => {
                console.error('Complete Error:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    }
    
      const handlePastBookingsClick = () => {
        console.log("Attempting to fetch past bookings");
        axios.get(`http://localhost:5000/api/bookings/past`, { params: { userId: userid } })
            .then(response => {
                console.log('Data:', response.data);
                if(response.data.length === 0){
                    console.log("No past bookings found");
                }
                else {
                    setPastBookings(response.data);
                    setView("pastBookings");
                }
            })
            .catch (error => {
                console.error('Complete Error:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
      }

    
 
 
    return <div>

        <Sidenav 
            onBookingClick={handleBookingClick}
            onUpcomingBookingsClick={handleUpcomingBookingsClick}
            onPastBookingsClick={handlePastBookingsClick}
            loggedInUser = {userid}
        />

        {view === "bookings" && (
            <div className="bottom">
            <div className="booking-card">
    
                <MediumHeading 
                title = "Book your lab slot"
                />
                <div className="col-12 mb-4 mt-5"> 
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
        
                <div className="col-12 mb-4">
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
        
                <div className="col-12">
                    <div className="d-grid gap-2">
                        <label className="form-label">&nbsp;</label>
                        <input 
                                className="btn btn-primary" 
                                id="submit-btn" 
                                type="submit" 
                                value="Book Slot" 
                                disabled={!selectedSlot || !selectedCourse || !selectedDate}
                                onClick = {handleBookClick} 
                            />
                    </div>
                </div>
            </div>
            </div>
        )}

        {view === "upcomingBookings" && (
            // Upcoming bookings table view
            <div className="upcoming-bookings">
            <MediumHeading title="Your Upcoming Bookings" />
            {upcomingBookings.length > 0 ? (
                <Table
                    className='table-custom'
                    height={400}
                    data={upcomingBookings}
                >
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

                    <Column width={80} fixed="right">
                        <HeaderCell>Actions</HeaderCell>

                        <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                            Connect
                            </Button>
                            
                        )}
                        </Cell>
                        
                    </Column>
                </Table>
            ) : (
                <p>No upcoming bookings found.</p>
            )}
            </div>
        )}

        {view === "pastBookings" && (
            // Upcoming bookings table view
            <div className="past-bookings">
            <MediumHeading title="Your Past Bookings" />
            {upcomingBookings.length > 0 ? (
                <Table
                    className='table-custom'
                    height={400}
                    data={pastBookings}
                >
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

                    <Column width={80} fixed="right">
                        <HeaderCell>Actions</HeaderCell>

                        <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                            Connect
                            </Button>
                            
                        )}
                        </Cell>
                        
                    </Column>
                </Table>
            ) : (
                <p>No past bookings found.</p>
            )}
            </div>
        )}
        

        <div className='dialog' >
            {/* Dialog Component */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Booking Status"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
 
        {/* Show success message or error */}
        {/* {showSuccess && <p>Booking successful!</p>}
        {bookingError && <p className="error-message">{bookingError}</p>} */}
 
          {/* Modal for booking confirmation */}
          <BookingConfirmationModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                course={selectedCourse}
                date={selectedDate}
                slot={selectedSlot}
                username={username}
                password={password}
            />
    </div>
    
}
 
export default Select;