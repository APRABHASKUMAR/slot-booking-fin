import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';
function Home(){  
  return (
    <div className='page'>
      <Header/>
      <Content title="Lab Access Booking"/>
        <Footer />
    </div>
    
  )
}

export default Home;