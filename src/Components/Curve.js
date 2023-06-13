import * as React from "react";

const Curve = ({svgStyle,...props}) => (
    <h1>Hello Form Components</h1>,
    <div className="custom-shape-divider-top-1686556206" 
    {...props}
    >
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={svgStyle}>
    <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>

    </svg>
</div>

);
export default Curve;