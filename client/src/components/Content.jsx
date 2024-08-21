import React from "react";

function Content(props){
    return(
        <div className="container">
    <div className="row mt-5 mb-3">
        <div className="col">
            <h1>
                
{props.title}

            </h1>
        </div>
    </div>
    <hr/>
    <div className="row mb-3">
        <div className="col">
            
<form>
    <div className="row">
        <div className="col">
            <label for="id_course" className="form-label">Course / Experiment:</label>
            <select name="course" className="form-control" required="" id="id_course">
  <option value="" selected="">--- Select Course / Experiment ---</option>

  <option value="81">1_ESD Machine</option>

  <option value="82">2_ESD Machine</option>

  <option value="83">3_ESD Machine</option>

  <option value="90">4_ESD Machine</option>

  <option value="85">5_ESD Machine</option>

  <option value="62">Actuating a Motor using CAN network</option>

  <option value="102">ADVANCED FINITE ELEMENT METHODS</option>

  <option value="147">ADVANCED FINITE ELEMENT METHODS</option>

  <option value="141">ADVANCES IN IC ENGINES</option>

  <option value="100">Advances in Vehicle Body Structures</option>

  <option value="98">AMESIM-ADVANCE IN IC ENGINES</option>

  <option value="123">Apache Hadoop (OpenStack)</option>

  <option value="124">APACHE KAFKA (OPENSTACK)</option>

  <option value="145">APACHE SPARK (OPENSTACK)</option>

  <option value="146">APACHE STORM (OPENSTACK)</option>

  <option value="88">Asynchronous Motor Generator Setup</option>

  <option value="67">Axial Fan</option>

  <option value="115">Azure VM Test (BPAPPSRV1-07)</option>

  <option value="113">Azure VM Test (BPAPPSRV2-04)</option>

  <option value="91">Communications missed slots</option>

  <option value="97">COMPUTATIONAL FLUID DYNAMICS</option>

  <option value="140">COMPUTATIONAL FLUID DYNAMICS</option>

  <option value="45">CONTROLLING DC MOTOR SPEED</option>

  <option value="44">CONTROLLING TEMPERATURE AND HUMIDITY</option>

  <option value="89">DC Motor Generator Setup</option>

  <option value="57">DC Motor Position Control</option>

  <option value="122">DFAM</option>

  <option value="101">DURABILITY, CRASH &amp; SAFETY ENGINEERING</option>

  <option value="150">DURABILITY, CRASH &amp; SAFETY ENGINEERING</option>

  <option value="131">ECU</option>

  <option value="54">ECU-Electronic Throttle Body test rig</option>

  <option value="76">Embedded system design</option>

  <option value="105">ENGINEERING DESIGN</option>

  <option value="136">ENGINEERING DESIGN</option>

  <option value="59">EV Model Machine_1</option>

  <option value="58">EV Model Machine_2</option>

  <option value="60">EV Model Machine_3</option>

  <option value="66">Fuzzy control</option>

  <option value="138">Introduction To MEMS</option>

  <option value="96">INTRODUCTION TO MEMS</option>

  <option value="63">LIN Experiment</option>

  <option value="56">LQR Experiment</option>

  <option value="108">Matlab</option>

  <option value="103">MECHANICAL TECHNOLOGY</option>

  <option value="135">MECHANICAL TECHNOLOGY</option>

  <option value="127">MECHANICAL TECHNOLOGY_ENGGZC243</option>

  <option value="139">Mechatronics</option>

  <option value="65">Mechatronics and Actuators board</option>

  <option value="94">MECHATRONICS &amp; AUTOMATION</option>

  <option value="46">MONITORING VISIBLE LIGHT AND INFRARED LIGHT</option>

  <option value="64">Network creation using Python</option>

  <option value="75">Pelton turbine</option>

  <option value="77">Piston Pump</option>

  <option value="70">Position control</option>

  <option value="120">Position Control</option>

  <option value="68">Pressure Control</option>

  <option value="47">PRODUCT COUNT</option>

  <option value="137">Product Design</option>

  <option value="106">PRODUCT DESIGN</option>

  <option value="121">Remote Lab Test</option>

  <option value="61">Reverse engineering CAN messages using Motor and PCAN</option>

  <option value="99">RICARDO - ADVANCE IN IC ENGINES</option>

  <option value="92">Security missed slots</option>

  <option value="69">Speed Control</option>

  <option value="86">Synchronous Motor Generator Setup</option>

  <option value="41">Test Course (do not book)</option>

  <option value="144">test demo</option>

  <option value="79">Testing</option>

  <option value="128">Testing tools-Appsrv1</option>

  <option value="129">Testing tools-Appsrv2</option>

</select>
        </div>
        <div className="col">
            <label for="id_from_date" className="form-label">From date:</label>
            <input type="date" name="from_date" className="form-control" required="" id="id_from_date"/>
        </div>
        <div className="col">
            <label for="id_to_date" className="form-label">To date:</label>
            <input type="date" name="to_date" className="form-control" required="" id="id_to_date"/>
        </div>
        <div className="col">
            <div className="d-grid gap-2">
                <label className="form-label" style={{marginBottom:"0rem"}}>&nbsp;</label>
                <input className="btn btn-primary" type="submit" value="Submit"/>
            </div>
        </div>
    </div>
</form>

        </div>
    </div>
    <div className="row mb-3">
        <div className="col">
            


        </div>
    </div>
</div>
    );
}
export default Content;