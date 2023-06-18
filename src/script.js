import { render } from 'react-dom';

import './style.scss';
import Style from './Style';
import Shape from './Components/Shape';

// Shape Divider
document.addEventListener('DOMContentLoaded', () => {
	const shapeEls = document.querySelectorAll('.wp-block-sdb-shape');
	shapeEls.forEach(shapeEl => {
		const attributes = JSON.parse(shapeEl.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<Shape attributes={attributes} />
		</>, shapeEl);

		shapeEl?.removeAttribute('data-attributes');
	});
});

