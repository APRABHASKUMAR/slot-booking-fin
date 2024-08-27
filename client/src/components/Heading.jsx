import React from "react";

function Heading(props){
    return <div className="mb-5">
        <h1 className = "big-heading">{props.greeting}<span className="gradient">{props.title}</span></h1>
    </div>
}

export default Heading;