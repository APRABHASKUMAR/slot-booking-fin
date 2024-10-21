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

function Navigator({onBookingClick, onUpcomingBookingsClick, onPastBookingsClick, loggedInUser}) {
  const [isHoveringAdmin, setIsHoveringAdmin] = useState(false);
  const [isHoveringLogOut, setIsHoveringLogOut] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  
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
            <Nav.Item eventKey="1" active icon={<CalendarIcon />} onSelect={onBookingClick}>
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
  </CustomProvider>;
}

export default Navigator;
