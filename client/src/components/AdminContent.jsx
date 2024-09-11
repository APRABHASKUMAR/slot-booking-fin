import React from "react";
import "./AdminContent.css";

function AdminContent(){
    return(<body class=" dashboard" data-admin-utc-offset="19800">

      
      <div id="container">
      
          
          
          <div id="header">
              <div id="branding">
              
      <h1 id="site-name"><a href="/admin/">Osha Administration</a></h1>
      
              </div>
              
              
              <div id="user-tools">
                  
                      Welcome,
                      <strong>Santosh Bangaru</strong>.
                  
                  
                      
                          <a href="/">View site</a> /
                      
                      
                          
                          
                      
                      
                      <a href="/admin/password_change/">Change password</a> /
                      
                      <a href="/">Log out</a>
                  
              </div>
              
              
              
          </div>
          
          
          
      
          <div class="main shifted" id="main">
            
              
            
            <div class="content">
              
                
              
              
              <div id="content" class="colMS">
                
                <h1>Site administration</h1>
                
                
      <div id="content-main">
        
      
      
        
          <div class="app-app module">
            <table>
              <caption>
                <a href="/admin/app/" class="section" title="Models in the App application">App</a>
              </caption>
              
                <tbody><tr class="model-booking">
                  
                    <th scope="row"><a href="/admin/app/booking/">Bookings</a></th>
                  
      
                  
                    <td></td>
                  
      
                  
                    
                      <td><a href="/admin/app/booking/" class="changelink">Change</a></td>
                    
                  
                </tr>
              
                <tr class="model-course">
                  
                    <th scope="row"><a href="/admin/app/course/">Courses or Experiments</a></th>
                  
      
                  
                    <td><a href="/admin/app/course/add/" class="addlink">Add</a></td>
                  
      
                  
                    
                      <td><a href="/admin/app/course/" class="changelink">Change</a></td>
                    
                  
                </tr>
              
                <tr class="model-machinegroup">
                  
                    <th scope="row"><a href="/admin/app/machinegroup/">Machine groups</a></th>
                  
      
                  
                    <td></td>
                  
      
                  
                    
                      <td><a href="/admin/app/machinegroup/" class="changelink">Change</a></td>
                    
                  
                </tr>
              
                <tr class="model-machine">
                  
                    <th scope="row"><a href="/admin/app/machine/">Machines</a></th>
                  
      
                  
                    <td></td>
                  
      
                  
                    
                      <td><a href="/admin/app/machine/" class="changelink">Change</a></td>
                    
                  
                </tr>
              
                <tr class="model-tenantgroup">
                  
                    <th scope="row"><a href="/admin/app/tenantgroup/">Tenant groups</a></th>
                  
      
                  
                    <td></td>
                  
      
                  
                    
                      <td><a href="/admin/app/tenantgroup/" class="changelink">Change</a></td>
                    
                  
                </tr>
              
            </tbody></table>
          </div>
        
      
      
      </div>
      
                
      <div id="content-related">
          <div class="module" id="recent-actions-module">
              <h2>Recent actions</h2>
              <h3>My actions</h3>
                  
                  
                  
                  <ul class="actionlist">
                  
                  <li class="changelink">
                      
                          <a href="/admin/app/course/150/change/">DURABILITY, CRASH &amp; SAFETY ENGINEERING</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="addlink">
                      
                          <a href="/admin/app/course/150/change/">DURABILITY, CRASH &amp; SAFETY ENGINEERING</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="deletelink">
                      
                          DURABILITY, CRASH &amp; SAFETY ENGINEERING
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="changelink">
                      
                          <a href="/admin/app/course/149/change/">DURABILITY, CRASH &amp; SAFETY ENGINEERING</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="changelink">
                      
                          <a href="/admin/app/course/149/change/">DURABILITY, CRASH &amp; SAFETY ENGINEERING</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="addlink">
                      
                          <a href="/admin/app/course/149/change/">DURABILITY, CRASH &amp; SAFETY ENGINEERING</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="deletelink">
                      
                          DURABILITY, CRASH &amp; SAFETY ENGINEERING
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="deletelink">
                      
                          DURABILITY, CRASH &amp; SAFETY ENGINEERING
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="changelink">
                      
                          <a href="/admin/app/course/140/change/">COMPUTATIONAL FLUID DYNAMICS</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  <li class="changelink">
                      
                          <a href="/admin/app/course/138/change/">Introduction To MEMS</a>
                      
                      <br/>
                      
                          <span class="mini quiet">Course or Experiment</span>
                      
                  </li>
                  
                  </ul>
                  
          </div>
      </div>
      
                <br class="clear"/>
              </div>
            
              <div id="footer"></div>
            </div>
          </div>
      </div>
    
      
      
      </body>
   )
}
export default AdminContent;