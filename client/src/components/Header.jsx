import React from "react";

function Header() {
    const username = localStorage.getItem("userName");
  return (
    <header>
        
        <div className="header" style={{backgroundColor:"#f5f5f5", marginBottom: "5px"}}>
            <img src="logo.gif" style={{height: "100px"}}/>
        </div>
        
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">RemoteX</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    

<li className="nav-item">
    <a className="nav-link" href="/report">Report</a>
</li>

<li className="nav-item">
    <a className="nav-link" href="/csv-upload/">CSV Upload</a>
</li>
<li className="nav-item">
    <a className="nav-link" href="/admin" target="_blank">Administration</a>
</li>



                    </ul>
                    
                    <ul className="navbar-nav mb-2 mb-md-0">
                        
                        
                        <li className="nav-item">
                            <a className="nav-link" href="https://wilpqueries.bits-pilani.ac.in/" target="_blank">Student Care Helpdesk</a>
                        </li>
                    
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="/">Logout</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;