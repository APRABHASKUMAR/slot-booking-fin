import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';
import AdminContent from '../components/AdminContent';
function Admin(){  
  return (
    <div className='page'>
      
      <AdminContent/>
        <Footer />
    </div>
    
  )
}

export default Admin;