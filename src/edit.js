import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import Curve from './Components/Curve';
import CurveAcymmetrical from './Components/CurveAcymmetrical';
import Tilt from './Components/Tilt';
import Waves from './Components/Waves';




export default function Edit() {
	const customShapeStyles = {
		transform: 'rotate(180deg)',
		bottom: '0px',
		fill: '#333'
	};

	const svgStyles = {
		width: 'calc(100% + 1.3px)',
		height: '150px',
	};

	return (
		<>
			<p {...useBlockProps()}>
				{__('NF Tushar Divider – hello from the editor!', 'divider')}
				<div className="custom-shape-divider-top-1686556206" style={customShapeStyles}>
					<svg
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
						style={svgStyles}>

                     {/* <Tilt></Tilt> */}
					 {/* <Curve></Curve> */}
					 {/* <CurveAcymmetrical></CurveAcymmetrical> */}
					 <Waves></Waves>

					</svg>
				</div>
			</p>
		</>
	);
}
