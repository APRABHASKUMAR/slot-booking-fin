import React, { useState } from "react";
import { Sidenav, Nav, CustomProvider, Toggle, Modal, Button, Alert } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import ExitIcon from '@rsuite/icons/Exit';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import PageEndIcon from '@rsuite/icons/PageEnd';
import PageTopIcon from '@rsuite/icons/PageTop';
import DetailIcon from '@rsuite/icons/Detail';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import AdminIcon from '@rsuite/icons/Admin';
import CalendarIcon from '@rsuite/icons/Calendar';
import GlobalIcon from '@rsuite/icons/Global';
import "../stylizer/Sidenav.css";
import Logout from "../pages/logout";
import CreateUser from "./CreateUser";
import ChangePassword from "./ChangePassword.jsx";

function Navigator({onBookingClick, onUpcomingBookingsClick, onPastBookingsClick, loggedInUser}) {
  const [isHoveringAdmin, setIsHoveringAdmin] = useState(false);
  const [isHoveringLogOut, setIsHoveringLogOut] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openChangePasswordModal = () => setShowModal(true);
  const closeChangePasswordModal = () => setShowModal(false);
  
  const checkUserExistence = async (username) => {
    try {
      const response = await fetch('http://localhost:5000/admin/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),  // Send username in the request body
      });
  
      const data = await response.json();
      // console.log('Response:', data);  // Log the response from the backend

      // Check status code directly
      if (response.status === 200) {
        alert(data.message);  // If user exists, show alert
      } else if (response.status === 404) {
        alert(data.message);  // If user doesn't exist, show alert
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      alert('Error checking user existence');
    }
  };

  const openLogoutConfirmation = () => {
    setShowModal(true);
    console.log("modal opens");
  }

  const handleLogout = () => {
    console.log("logout");
    logout();
    setShowModal(false);
    navigate('/');
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const headerStyles = {
    padding: 20,
    paddingBottom: 10,
    fontSize: 22,
    background: '#1A1D24',
    color: ' #fff',
  };

  const userInfoStyles = {
    fontSize: 12,
    padding: 20,
    paddingTop: 5,
  }

  const instance = (
    <div className="fixed-sidenav" style={{ width: 240 }}>
      {/* <div style={headerStyles}>
        <Toggle
          onChange={setExpanded}
          checked={expanded}
          checkedChildren="Expand"
          unCheckedChildren="Collapse"
        />
        <hr />
      </div> */}
      <Sidenav 
        appearance="default"
        expanded={expanded}
        activeKey={activeKey}  
        onSelect={setActiveKey}
      >
        <Sidenav.Header>
          <div style={headerStyles}>RemoteX</div>
          <div style={userInfoStyles}>
            Logged in as: {loggedInUser}
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<CalendarIcon />} onSelect={onBookingClick}>
              Book A New Slot
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<PageEndIcon />} onSelect={onUpcomingBookingsClick}>
              Upcoming Bookings
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<PageTopIcon />} onSelect={onPastBookingsClick}>
              Past Bookings
            </Nav.Item>
            <Nav.Item eventKey="4" icon={<DetailIcon />}>
              Report
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<FileUploadIcon />}>
              CSV Upload
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Nav className="push-bottom">
          <Nav.Item eventKey="6" icon={<AdminIcon />}
                    style = {isHoveringAdmin ? {color: 'white', backgroundColor: '#59CE8F'} : {color: '#59CE8F', backgroundColor: 'transparent'}}
                    onMouseEnter={() => setIsHoveringAdmin(true)}
                    onMouseLeave={() => setIsHoveringAdmin(false)}>
            Administrator
          </Nav.Item>
          <Nav.Item eventKey="7" icon={<ExitIcon />} 
                    style={isHoveringLogOut ? { color: 'white', backgroundColor: '#FF1E00' } : { color: '#FF1E00', backgroundColor: 'transparent' }}
                    onMouseEnter={() => setIsHoveringLogOut(true)}
                    onMouseLeave={() => setIsHoveringLogOut(false)}
                    onSelect={openLogoutConfirmation}>
            Log Out
          </Nav.Item>
          {/* <Nav.Item eventKey="6" icon={<AdminIcon />}
                    style = {isHoveringAdmin ? {color: 'white', backgroundColor: '#59CE8F'} : {color: '#59CE8F', backgroundColor: 'transparent'}}
                    onMouseEnter={() => setIsHoveringAdmin(true)}
                    onMouseLeave={() => setIsHoveringAdmin(false)}
                    onSelect={checkUserExistence("Administrator")}>
            Test
          </Nav.Item> */}
          <Modal backdrop="static" open={showModal} onClose={handleClose} size="xs">
                <Modal.Header>
                    <Modal.Title>Log Out Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLogout} appearance="danger" style={{backgroundColor: "red"}}>
                        Log Out
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Nav>
      </Sidenav>
    </div>
  );

  return <CustomProvider theme="dark">
    {instance}
    {/* CreateUser Modal */}
    {/* <ChangePassword showModal={showModal} handleClose={closeChangePasswordModal} /> */}
  </CustomProvider>;
}

export default Navigator;
