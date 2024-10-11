import React, { useState } from "react";
import { Sidenav, Nav, CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
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

function Navigator({onBookingClick, onUpcomingBookingsClick, onPastBookingsClick}) {
  const [isHoveringAdmin, setIsHoveringAdmin] = useState(false);
  const [isHoveringLogOut, setIsHoveringLogOut] = useState(false);
  
  const headerStyles = {
    padding: 20,
    fontSize: 22,
    background: '#1A1D24',
    color: ' #fff',
  };

  const instance = (
    <div className="fixed-sidenav" style={{ width: 240 }}>
      <Sidenav appearance="default">
        <Sidenav.Header>
          <div style={headerStyles}>RemoteX</div>
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
                    onMouseLeave={() => setIsHoveringLogOut(false)}>
            Logout
          </Nav.Item>
        </Nav>
      </Sidenav>
    </div>
  );

  return <CustomProvider theme="dark">
    {instance}
  </CustomProvider>;
}

export default Navigator;
