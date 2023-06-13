import { render } from 'react-dom';

import './style.scss';
import Style from './Style';

// Block Directory
document.addEventListener('DOMContentLoaded', () => {
	const allBlockDirectory = document.querySelectorAll('.wp-block-sdb-sdb-shape-divider');
	allBlockDirectory.forEach(directory => {
		const attributes = JSON.parse(directory.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<Directory attributes={attributes} />
		</>, directory);

		directory?.removeAttribute('data-attributes');
	});
});

const Directory = ({ attributes }) => {
	const { items, columns, layout, content, icon, img } = attributes;

	return <div className={`sdbBlockDirectory columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} ${layout || 'vertical'}`}>
		{items?.map((item, index) => {
			const { number, text } = item;

			return <div key={index} id={`sdbBlockDirectoryItem-${index}`}>
				<div className='sdbBlockDirectoryItem'>
					<span className='number'>{number}</span>
					<span className='text' dangerouslySetInnerHTML={{ __html: text }} />
				</div>
			</div>;
		})}

		{content && <p className='content' dangerouslySetInnerHTML={{ __html: content }} />}

		{img?.url && <img src={img.url} alt={img?.alt} />}

		{icon?.class && <i className={`icon ${icon.class}`}></i>}

		<span className='separator'></span>
	</div>
}