import * as React from "react";

const Tilt = ({svgStyle,...props}) => (
    <h1>Hello Form Components</h1>,
    <div className="custom-shape-divider-top-1686556206" 
    {...props}
    >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={svgStyle}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
        </svg>
    </div>

);
export default Tilt;
