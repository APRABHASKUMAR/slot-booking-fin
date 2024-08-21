import React from 'react'
import OAuth from '../components/oauth';
import Header from '../components/Header';
import Footer from '../components/Footer';
const Login = () => {
  return (
    <div className='page'>
      
      <Header/>
      <h1 style={{display:'flex',justifyContent:'center',alignItems: 'center',
         height: '100vh', 
      }}>Welcome to RemoteX</h1>
        <OAuth />
        <Footer />
    </div>
    
  )
}

export default Login
