import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../stylizer/Login.css";
import background from '../images/network.svg';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
import useAutofillStyle from '../fix/useAutofillStyle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Custom hook to handle autofill styles
    useAutofillStyle(emailRef, { 'color': 'white' }, { 'color': 'white', 'background-color': 'transparent' });
    useAutofillStyle(passwordRef, { 'color': 'white' }, { 'color': 'white', 'background-color': 'transparent' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            login(response.data.user); // Use the login function from AuthContext
            navigate('/home');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Login failed');
        }
    };

    return (
        <div className='login-container' style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundColor: `rgba(0, 0, 255, 0.5)`}}>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='p-4 d-flex flex-column align-items-center mx-auto w-100'>
                                <h2 className="mb-2 mt-3">Login to <span className="fw-bold accent">RemoteX</span></h2>
                                <p className="text-white-50 mb-5">Please enter your email and password</p>
                                <form onSubmit={handleLogin} className='align-center'>
                                    <MDBInput 
                                        wrapperClass='mb-4 mx-5 w-100' 
                                        labelClass='text-white' 
                                        label='Email address' 
                                        id='formControlLg' 
                                        type='email' 
                                        size="lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete='off'
                                        ref={emailRef}
                                    />
                                    <MDBInput 
                                        wrapperClass='mb-4 mx-5 w-100' 
                                        labelClass='text-white' 
                                        label='Password' 
                                        id='formControlLg' 
                                        type='password' 
                                        size="lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete='off'
                                        ref={passwordRef}
                                    />
                                    {error && <div className="text-danger mb-3">{error}</div>}
                                    <MDBBtn style={{ backgroundColor: '#00affa' }} className='mx-2 px-5 accent' color='primary' size='lg' type="submit">
                                        Login
                                    </MDBBtn>
                                </form>
                                {/* <div className='d-flex flex-row mt-3 mb-5'>
                                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='facebook-f' size="lg"/>
                                    </MDBBtn>
                                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='twitter' size="lg"/>
                                    </MDBBtn>
                                    <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='google' size="lg"/>
                                    </MDBBtn>
                                </div> */}
                                {/* <div>
                                    <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
                                </div> */}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Login;
