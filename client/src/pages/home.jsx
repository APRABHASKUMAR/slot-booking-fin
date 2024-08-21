import React from "react";
import Heading from "../components/Heading";
import Select from "../components/Select";

const Home = ()=>{
    return <div className="display container">
        <Heading 
        title = "Book your lab slot"
        />
        <Select />
    </div>
}

export default Home;