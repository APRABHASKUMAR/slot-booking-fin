import React from "react";
import "../stylizer/Home.css"
import Select from "../components/Select";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = ()=>{
    return <div>
        {/* <Header /> */}
        <div className="display container">
        <Select />
        </div>
        {/* <Footer /> */}
    </div>
}

export default Home;