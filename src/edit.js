import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import produce from 'immer';
// Settings Components
import { tabController } from '../../Components/utils/functions';
import Tilt from './Components/Tilt';
import Curve from './Components/Curve';
import Settings from './Settings';
import Style from './Style';
import Shape from './Components/Shape';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items } = attributes;

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

		<div className={className} id={`sdbBlockDirectory-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />
			<h1>Hello</h1>

			<Shape attributes={attributes} width={500} />
		</div>
	</>;
};
export default Edit;