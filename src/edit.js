import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import produce from 'immer';
// Settings Components
import { tabController } from '../../Components/utils/functions';
import Settings from './Settings';
import Style from './Style';
import Shape from './Components/Shape';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items, color, possition, width, height } = attributes;
	// console.log(height);
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

	const isInSection = false;

	return <>

		<style>
			{`
			#sdbBlockDirectory-${clientId}{
				position: ${isInSection ? 'absolute' : 'relative'};
				top: ${'top' === possition ? 0 : 'auto'};
				bottom: ${'bottom' === possition ? 0 : 'auto'};
			}
			#sdbBlockDirectory-${clientId} svg{
				width: calc(${width}% + 1.3px);
				height: ${height.desktop};
				fill: ${color};
				transform: rotate(${'top' === possition ? 0 : 180}deg);
			}`
			}
		</style>

		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`sdbBlockDirectory-${clientId}`}>
			{/* <Style attributes={attributes} clientId={clientId} /> */}
			{/* If rotate 180D Possition Top && If rotate 0D Possition Buttom */}
			{/* <Shape attributes={attributes} height={`${height.desktop}`} width={` */}

			<Shape attributes={attributes} />

		</div>
	</>;
};
export default Edit;