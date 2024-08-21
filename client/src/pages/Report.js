import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';
function Report(){  
  return (
    <div className='page'>
      <Header/>
      <Content title="Bookings Report"/>
        <Footer />
    </div>
    
  )
}

export default Report;