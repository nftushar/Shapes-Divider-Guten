import * as React from "react";

const Curve = ({ svgStyle, ...props }) => (
    <h1>Hello Form Components</h1>,
    <div className="custom-shape-divider-top-1686556206"
        {...props}
    >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={svgStyle}>
            {/* {'curve'===shape && <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>} */}
            {/* Curve */}
            {/* <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path> */}
            {/* CurveAcymmetrical */}
            {/* <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path> */}
            {/* Tilt */}
            {/* <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path> */}
            {/* Waves */}
            {/* <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path> */}

        </svg>
    </div>

);
export default Curve;