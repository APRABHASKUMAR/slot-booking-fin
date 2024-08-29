import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function BookingConfirmationModal({ show, onHide, course, date, slot, username, password }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Course:</strong> {course}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Slot:</strong> {slot}</p>
                <p>-------------------------------------</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Password:</strong> {password}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookingConfirmationModal;
