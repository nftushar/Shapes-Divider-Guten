import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';
import Shape from './Components/Shape';
import { InnerBlocks, Inserter } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';

const innerBlocksTemplate = [
	['core/heading', { content: 'Section Shape', textAlign: "center", style: { typography: { fontSize: "52px" } }, textColor: '#fff' }],
	['core/paragraph', { content: 'Shape Divider is a web design tool that allows users to create unique and visually appealing dividers by customizing shapes and patterns.', "align": "center", "style": { "typography": { "fontSize": "25px" } }, "textColor": "white" }]
]

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div className={className} id={`sdbShapeDivider-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<Shape attributes={attributes} />

			<div className='shapeContent'>
				<InnerBlocks
					template={innerBlocksTemplate}
					renderAppender={() => (
						<Inserter
							rootClientId={clientId}
							isAppender
							renderToggle={({ onToggle, disabled }) => (
								<IconButton
									className='bTempAddTab'
									onClick={onToggle}
									disabled={disabled}
									label={__('Add New Tab', 'b-temp')}
									icon='plus-alt'>
									{__('Add New Tab', 'b-temp')}
								</IconButton>
							)}
						/>
					)}
				/>
			</div>
		</div>
	</>;
};
export default Edit;