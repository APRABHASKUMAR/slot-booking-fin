import React from "react";
import MediumHeading from "../components/MediumHeading";
import Select from "../components/Select";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = ()=>{
    return <div>
        <Header />
        <div className="display container">
        <MediumHeading 
        title = "Book your lab slot"
        />
        <Select />
        </div>
        {/* <Footer /> */}
    </div>
}

export default Home;