import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'rsuite';

function ChangePassword({ showModal, handleClose }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
    // Validate inputs
    if (!username || !newPassword) {
      setErrorMessage('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }), // Send username and new password
      });

      const data = await response.json();

      if (response.status === 200) {
        alert('Password changed successfully');
        handleClose(); // Close the modal on success
      } else {
        setErrorMessage(data.error || 'Error changing password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error connecting to the server');
    }
  };

  return (
    <Modal open={showModal} onClose={handleClose} size="xs">
      <Modal.Header>
        <Modal.Title>Change User Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Form fluid>
          <Form.ControlLabel>Username</Form.ControlLabel>
          <Input
            value={username}
            onChange={(value) => setUsername(value)}
            type="text"
            placeholder="Enter username"
          />
          <Form.ControlLabel>New Password</Form.ControlLabel>
          <Input
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
            type="password"
            placeholder="Enter new password"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleChangePassword} appearance="primary">
          Change Password
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
