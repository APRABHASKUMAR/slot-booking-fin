import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';
import MeadiumHeading from '../components/MediumHeading';
import SelectReport from '../components/SelectReport';
function Report(){  
  return (
    <div className='page'>
      <Header/>
      <div className="display container" >
        <MeadiumHeading title="Bookings Report"/>
        <SelectReport />
      </div>
      {/* <Footer /> */}
    </div>
    
  )
}

export default Report;