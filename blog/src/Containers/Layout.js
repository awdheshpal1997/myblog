import React from 'react';
import Navbar from './Navbar'



const Layout = ({ children }) => {
    return (
        <div style={{backgroundColor:'rgb(14 14 12 / 13%)'}}>
            <Navbar />
            {children}
           <footer id ="foot" ><i class="fas fa-heart"></i> <p>This is blog application developed by Awadhesh 2021</p>
          <div id="pa">Email us at:            pacificawadesh@gmail.com</div>
           </footer > 
        </div>
    );
};

export default Layout;