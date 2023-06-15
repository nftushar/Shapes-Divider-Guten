import { render } from 'react-dom';

import './style.scss';
import Style from './Style';
import Shape from './Components/Shape';

// Block Directory
document.addEventListener('DOMContentLoaded', () => {
	const allBlockDirectory = document.querySelectorAll('.wp-block-sdb-shapes');
	allBlockDirectory.forEach(directory => {
		const attributes = JSON.parse(directory.dataset.attributes);
		const { color, possition, width, height } = attributes;
		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<Shape attributes={attributes} height={`${height.desktop}`} width={`${width}`} style={{ fill: color, transform: `rotate(${'top' === possition ? 0 : 180}deg)` }} />
		</>, directory);

		directory?.removeAttribute('data-attributes');
	});
});

