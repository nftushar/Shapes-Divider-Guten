import { useEffect } from 'react';
// import { __ } from '@wordpress/i18n';
import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';
import Shape from './Components/Shape';
import { InnerBlocks, Inserter } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';

// ['core/heading', { content: 'Section Shape', textAlign: "center", style: { typography: { fontSize: "52px" } }, textColor: 'white' }],
// ['core/paragraph', { content: 'Shape Divider is a web design tool that allows users to create unique and visually appealing dividers by customizing shapes and patterns.', "align": "center", "style": { "typography": { "fontSize": "18px" } }, "textColor": "white" }],
// ['core/buttons', {},
// 	['core/button', {}]
// ]
const innerBlocksTemplate = [
	['core/heading', { content: 'Creative Shape Divider', textAlign: "center", style: { typography: { fontSize: "52px" } }, textColor: 'white' }],
	[
		'core/paragraph', {
			content: 'The Gutenberg Shape Divider plugin is an innovative tool designed to enhance the visual appeal and creativity of websites built using the WordPress Gutenberg editor. With its intuitive interface and powerful features, this plugin empowers users to create unique and captivating designs by adding customizable shape dividers to their web pages..',
			align: 'center',
			style: { typography: { fontSize: '18px' } },
			textColor: 'white'
		}
	],
	[
		'core/buttons',
		{
			layout: {
				type: 'flex',
				justifyContent: 'center'
			}
		},
		[[
			'core/button', {
				text: 'View Demo',
				textColor: 'ast-global-color-5',
				style: {
					spacing: {
						padding: {
							top: 'var(preset | spacing | 40)',
							right: 'var(preset | spacing | 40)',
							bottom: 'var(preset | spacing | 40)',
							left: 'var(preset | spacing | 40)'
						}
					}
				},
				className: 'is-style-outline'
			}
		]]
	]

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
									// label={__('Add New Tab', 'b-temp')}
									icon='plus-alt'>
									{/* {__('Add New Tab', 'b-temp')} */}
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