import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, ToggleControl, SelectControl, CheckboxControl, RadioControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as Dashicon, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import produce from 'immer';

// Settings Components
import { Label, BColor, BorderControl, ColorsControl, MultiShadowControl, SeparatorControl, SpaceControl } from '../../Components';
// import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, perUnit, pxUnit } from '../../Components/utils/options';

import { generalStyleTabs, layouts, shapes } from './utils/options';

const Settings = ({ attributes, setAttributes, setActiveIndex }) => {
	const { shape, items, layout, possition, alignment, textAlign, width, height, color, colors, isIcon, separator, padding, margin, border, shadow } = attributes;

	const [device, setDevice] = useState('desktop');

	const addItem = () => {
		setAttributes({
			items: [...items, {
				number: 10,
				text: 'Vertical'
			}]
		});
		setActiveIndex(items.length);
	}

	const updateAllItem = (type, val, otherType = false) => {
		const newItems = [...items];

		newItems.map((item, index) => {
			if (otherType) {
				newItems[index][type][otherType] = val;
			} else {
				newItems[index][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	// const duplicateItem = e => {
	// 	e.preventDefault();

	// 	setAttributes({ items: [...items.slice(0, activeIndex), { ...items[activeIndex] }, ...items.slice(activeIndex)] });

	// 	setActiveIndex(activeIndex + 1);
	// }

	// const removeItem = e => {
	// 	e.preventDefault();

	// 	setAttributes({ items: [...items.slice(0, activeIndex), ...items.slice(activeIndex + 1)] });

	// 	setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
	// }

	// const { number = '', text = '' } = items[activeIndex] || {};

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					{/* <PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Add or Remove Items	', 'block-directory')}>
						{null !== activeIndex && <>
							<h3 className='bplItemTitle'>{__(`Item ${activeIndex + 1}:`, 'block-directory')}</h3>

							<NumberControl className='mt20' label={__('Number:', 'block-directory')} labelPosition='left' value={number} onChange={val => updateItem('number', val)} />

							<Label>{__('Text:', 'block-directory')}</Label>
							<TextControl value={text} onChange={val => updateItem('text', val)} />

							<PanelRow className='itemAction mt20 mb15'>
								{1 < items?.length && <Button className='removeItem' label={__('Remove', 'block-directory')} onClick={removeItem}><Dashicon icon='no' />{__('Remove', 'block-directory')}</Button>}

								<Button className='duplicateItem' label={__('Duplicate', 'block-directory')} onClick={duplicateItem}>{gearIcon}{__('Duplicate', 'block-directory')}</Button>
							</PanelRow>
						</>}

						<div className='addItem'>
							<Button label={__('Add New Card', 'block-directory')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New Card', 'block-directory')}</Button>
						</div>
					</PanelBody> */}


					<PanelBody className='bPlPanelBody' title={__('Component Settings', 'block-directory')} initialOpen={true}>
						{/* <ToggleControl label={__('Toggle?', 'block-directory')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} /> */}

						{/* <CheckboxControl className='mt20' label={__('Toggle?', 'block-directory')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} /> */}

						<PanelRow>
							<Label mt='0' mb='0'>{__('Shape:', 'block-directory')}</Label>
							<SelectControl value={shape} onChange={val => setAttributes({ shape: val })} options={shapes} />


							{/* <SelectControl value={layout} onChange={val => {
								setAttributes({ layout: val });
								'Curve' === val && updateAllItem('number', 10);
								'CurveAcymmetrical' === val && updateAllItem('number', 20);
								'Tilt' === val && updateAllItem('number', 30);
								'Waves' === val && updateAllItem('number', 40);
							}} options={layouts} /> */}
						</PanelRow>


						<PanelRow>
							<Label mt='0' mb='0'>{__('Top/bottom:', 'block-directory')}</Label>
							<SelectControl value={possition} onChange={val => {
								setAttributes({ possition: val });
							}} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },

							]} />



						</PanelRow>
						<small>{__('Some settings may change when possition will be changed.', 'block-directory')}</small>

						<PanelRow>
							<Label mt='0' mb='0'>{__('possition:', 'b-blocks')}</Label>
							<RadioControl selected={possition} onChange={val => setAttributes({ possition: val })} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },

							]} />
						</PanelRow>

						<UnitControl className='mt20' label={__('Height:', 'block-directory')} labelPosition='left' value={height.desktop} onChange={val => setAttributes({ height: { desktop: val, tablet: val, mobile: val } })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep height 0, to auto height.', 'block-directory')}</small>

						<UnitControl className='mt20' label={__('Width:', 'block-directory')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'block-directory')}</small>
					</PanelBody>

				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Custom Style', 'block-directory')}>

						<BColor label={__('Color:', 'block-directory')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>

	</>;
};
export default Settings;