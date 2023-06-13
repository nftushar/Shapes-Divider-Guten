import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import produce from 'immer';

// Settings Components
import { BplMediaPlaceholder } from '../../Components';
import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items, columns, layout, content, icon, img } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	const [activeIndex, setActiveIndex] = useState(0);

	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (childType) {
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`bdbBlockDirectory-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<div className={`bdbBlockDirectory columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} ${layout || 'vertical'}`}>
				{items?.map((item, index) => {
					const { number, text } = item;

					return <div key={index} onClick={() => setActiveIndex(index)} className={`${index === activeIndex ? 'bdbNowEditing' : ''}`} id={`bdbBlockDirectoryItem-${index}`}>
						<div className='bdbBlockDirectoryItem'>
							<span className='number'>{number}</span>
							<span className='text'>{text}</span>
						</div>
					</div>;
				})}

				<RichText className='content' tagName='p' value={content} onChange={val => setAttributes({ content: val })} placeholder={__('Write Content', 'block-directory')} inlineToolbar />

				{img?.url ?
					<img src={img?.url} alt={img?.alt} /> :
					<BplMediaPlaceholder onChange={val => setAttributes({ img: val })} icon='format-image' type='image' />}

				{icon?.class && <i className={`icon ${icon?.class}`}></i>}

				<span className='separator'></span>
			</div>
		</div>
	</>;
};
export default Edit;