import React from "react";

function Heading(props){
    return <div className="mb-5">
        <h1 className = "outfit-heading">{props.title}</h1>
    </div>
}

export default Heading;