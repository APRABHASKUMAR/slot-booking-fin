import React from "react";

function Select(){
    return <div className="width">
        <div>
            <label for="id_course" className="form-label">Course / Experiment:</label>
            <select name="course" className="form-control" required="" id="id_course">
                <option value="" selected="" aria-placeholder="hello"></option>

                <option value="124">ADAS LAB</option>

            </select>
            <div className="mb-3" ><small id="total-slots-available" className="form-text">Slots remaining: xxx</small></div>
        </div>

        <div>
        <label for="id_date" className="form-label">Date:</label>
        <div className="mb-3">
        <select class="form-control" name="date" id="id_date" required=""><option value="" id="date-placeholder"></option><option value="2024-08-20 (Tuesday)">2024-08-20 (Tuesday)</option></select>
        </div>
        </div>

        <div>
            <label for="id_slot" className="form-label">Slot:</label>
            <select className="form-control" name="slot" id="id_slot" required="" disabled="true">
                <option value="" id="slot-placeholder"></option>
            </select>
            <small id="slot-length" className="form-text">Slot length: 1 hour</small>
        </div>

        <div className="col-md">
            <div className="d-grid gap-2">
                <label className="form-label">&nbsp;</label>
                <input className="btn btn-primary width" id="submit-btn" type="submit" value="Book" disabled="true" />
            </div>
        </div>

    </div>
}

export default Select;