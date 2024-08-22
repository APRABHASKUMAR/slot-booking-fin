import React from "react";
// import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtn } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function Select(){
    return <div className="bottom">
        {/* <MDBDropdown dropright group>
        <MDBDropdownToggle>Dropright</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Action</MDBDropdownItem>
          <MDBDropdownItem link>Another action</MDBDropdownItem>
          <MDBDropdownItem link>Something else here</MDBDropdownItem>
          <MDBDropdownItem divider />
          <MDBDropdownItem link>Separated link</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown> */}
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
        <select class="form-control" name="date" id="id_date" required=""><option value="" id="date-placeholder"></option><option value="2024-08-20 (Tuesday)">2024-08-20 (Tuesday)</option></select>
        </div>
        </div>

        <div className="col-12">
            <label for="id_slot" className="form-label">Slot:</label>
            <select className="form-control" name="slot" id="id_slot" required="" disabled="true">
                <option value="" id="slot-placeholder"></option>
            </select>
            <small id="slot-length" className="form-text">Slot length: 1 hour</small>
        </div>

        <div className="col-md">
            <div className="d-grid gap-2">
                <label className="form-label">&nbsp;</label>
                <input className="btn btn-primary" id="submit-btn" type="submit" value="Book" disabled="true" />
            </div>
        </div>
        
        {/* <div>
        <button className="forButton hover:shadow-[0_0px_20px_0px_#FFFFFF_inset] bg-black/10 shadow-[0_0px_2px_0px_#FFFFFF_inset] w-[32px] ai-dt:w-[133px] flex flex-row items-center justify-center gap-[8px] h-[32px] ai-dt:h-[41px] rounded-[32px] ai-dt:rounded-[56px]  border-white/20"><span class="hidden ai-dt:block text-[16px] font-medium">Generate</span><img alt="" loading="lazy" width="13" height="16" decoding="async" data-nimg="1" style="color:transparent" srcset="/__dora__/morpheus/_next/image?url=https%3A%2F%2Fcdn-www.dora.run%2F__dora__%2Fmorpheus%2Fstatic%2Fimages%2Fai%2Farrow-right.png&amp;w=16&amp;q=75 1x, /__dora__/morpheus/_next/image?url=https%3A%2F%2Fcdn-www.dora.run%2F__dora__%2Fmorpheus%2Fstatic%2Fimages%2Fai%2Farrow-right.png&amp;w=32&amp;q=75 2x" src="/__dora__/morpheus/_next/image?url=https%3A%2F%2Fcdn-www.dora.run%2F__dora__%2Fmorpheus%2Fstatic%2Fimages%2Fai%2Farrow-right.png&amp;w=32&amp;q=75"/></button>
        </div> */}
    </div>
}

export default Select;