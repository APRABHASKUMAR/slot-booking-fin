import React from "react";

function Select(){
    return <div className="bottom">
        <div className="col-12"> 
            <label for="id_course" className="form-label">Course / Experiment:</label>
            <select menuPortalTarget={document.body} menuPosition={'fixed'} name="course" className="form-control" required="" id="id_course">
                <option value="" selected="" aria-placeholder="hello"></option>

                <option value="124">ADAS LAB</option>

            </select>
            <div className="mb-3" ><small id="total-slots-available" className="form-text">Slots remaining: xxx</small></div>
        </div>

        <div className="col-12">
        <label for="id_date" className="form-label">Date:</label>
        <div className="mb-3">
        <input type="date" name="from_date" class="form-control" required="" id="id_from_date" />
        </div>
        </div>

        <div className="col-12">
            <label for="id_slot" className="form-label">Slot:</label>
            <input type="date" name="from_date" class="form-control" required="" id="id_from_date" />
            <small id="slot-length" className="form-text">Slot length: 1 hour</small>
        </div>

        <div className="col-md">
            <div className="d-grid gap-2">
                <label className="form-label">&nbsp;</label>
                <input className="btn btn-primary" id="submit-btn" type="submit" value="Submit" disabled="true" />
            </div>
        </div>
        
    </div>
}

export default Select;