import React from 'react';
import '../stylizer/BookingSuccess.css';

const BookingSuccess = ({ show }) => {
    return (
        <div className={`booking-success ${show ? 'show' : ''}`}>
            <div className="success-icon">
                <svg width="100px" height="100px" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#4caf50" strokeWidth="10"/>
                    <path fill="none" stroke="#4caf50" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" d="M30 50 L45 65 L70 35">
                        <animate attributeName="stroke-dasharray" from="0,100" to="60,100" dur="0.5s" fill="freeze" />
                    </path>
                </svg>
            </div>
            <h3>Booking Successful</h3>
        </div>
    );
};

export default BookingSuccess;
