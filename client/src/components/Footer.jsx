import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto bg-dark">
        <div className="container" >
            <div className="row">
                <div className="col">
                    <p className="text-muted mb-0 mt-1">
                        <strong className="clr">
                            An Institution Deemed to be University estd. vide Sec.3
                            of the UGC Act,1956 under notification # F.12-23/63.U-2 of
                            Jun 18,1964
                        </strong>
                        <br/><small className="clr">Designed and developed by <a className="text-reset text-decoration-none" href="https://codeargo.com/">Code Argo</a></small>
                    </p>
                </div>
                <div className="col">
                    <div className="d-flex flex-row-reverse">
                        <img className="pull-right" src="3IS.png" height="80"/>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    
  )
}

export default Footer;