import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, SelectControl, RadioControl, __experimentalUnitControl as UnitControl, } from '@wordpress/components';

// Settings Components
import { Label, BColor } from '../../Components';
// import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, perUnit, pxUnit, vhUnit } from '../../Components/utils/options';

import { generalStyleTabs, shapes } from './utils/options';
import { ToggleControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

const Settings = ({ attributes, setAttributes, setActiveIndex }) => {
	const { shape, items, possition, width, height, color, } = attributes;

	const [device, setDevice] = useState('desktop');

	// const addItem = () => {
	// 	setAttributes({
	// 		items: [...items, {
	// 			number: 10,
	// 			text: 'Vertical'
	// 		}]
	// 	});
	// 	setActiveIndex(items.length);
	// }

	// const updateAllItem = (type, val, otherType = false) => {
	// 	const newItems = [...items];

	// 	newItems.map((item, index) => {
	// 		if (otherType) {
	// 			newItems[index][type][otherType] = val;
	// 		} else {
	// 			newItems[index][type] = val;
	// 		}
	// 	});
	// 	setAttributes({ items: newItems });
	// }

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Component Settings', 'shape-divider')} initialOpen={true}>
						<PanelRow>
							<Label className=''>{__('Shape:', 'shape-divider')}</Label>
							<SelectControl value={shape} onChange={val => setAttributes({ shape: val })} options={shapes} />
						</PanelRow>
						<PanelRow>
							<ToggleControl label={__('Is in a section?', 'shape-divider')} />
							{/* <ToggleControl label={__('Toggle?', 'shape-divider')} checked={} onChange={val => setAttributes({ isIcon: val })} /> */}
						</PanelRow>
						{/* <PanelRow>
							<Label mt='0' mb='0'>{__('Top/bottom:', 'shape-divider')}</Label>
							<SelectControl value={possition} onChange={val => {
								setAttributes({ possition: val });
							}} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },

							]} />
						</PanelRow> */}

						<PanelRow>
							<Label mt='0' mb='0'>{__('possition:', 'b-blocks')}</Label>
							<RadioControl selected={possition} onChange={val => setAttributes({ possition: val })} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },
								
							]} 
							/>
						</PanelRow>
							<small>{__('Some settings may change when possition will be changed.', 'shape-divider')}</small>

						<UnitControl className='mt20' label={__('Height:', 'shape-divider')} labelPosition='left' value={height.desktop} onChange={val => setAttributes({ height: { desktop: val, tablet: val, mobile: val } })} units={[pxUnit(), emUnit(), vhUnit()]} isResetValueOnUnitChange={true} />
						<small>{__('Keep height 0, to auto height.', 'shape-divider')}</small>

						{/* <UnitControl className='mt20' label={__('Width:', 'shape-divider')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[perUnit(100)]} isResetValueOnUnitChange={true} /> */}

						<Label>{__('Width:', 'shape-divider')}</Label>
						<RangeControl className='mt20' value={width} onChange={val => setAttributes({ width: val })} min={100} max={300} />
					</PanelBody>
				</>}

				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Custom Style', 'shape-divider')}>

						<BColor label={__('Color:', 'shape-divider')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>

	</>;
};
export default Settings;