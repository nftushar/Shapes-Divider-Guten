import {  useEffect } from 'react';

import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';
import Shape from './Components/Shape';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div className={className} id={`sdbShapeDivider-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<Shape attributes={attributes} />
		</div>
	</>;
};
export default Edit;