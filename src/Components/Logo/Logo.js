import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css'
import face from './face-detection.png';

const Logo = () => {
    return (
        <nav clasName='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' style={{ height: 150, width: 150}}>
                <div className="pa3">
                    <img style={{paddingTop: '5px'}}alt='face' src={face}/>
                </div>
            </Tilt>
        </nav>
    );
}

export default Logo;