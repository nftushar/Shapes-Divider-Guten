import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, SelectControl, RadioControl, __experimentalUnitControl as UnitControl,} from '@wordpress/components';

// Settings Components
import { Label, BColor } from '../../Components';
// import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, perUnit, pxUnit } from '../../Components/utils/options';

import { generalStyleTabs, shapes } from './utils/options';

const Settings = ({ attributes, setAttributes, setActiveIndex }) => {
	const { shape, items, possition, width, height, color,} = attributes;

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
					<PanelBody className='bPlPanelBody' title={__('Component Settings', 'block-directory')} initialOpen={true}>
						<PanelRow>
							<Label mt='0' mb='0'>{__('Shape:', 'block-directory')}</Label>
							<SelectControl value={shape} onChange={val => setAttributes({ shape: val })} options={shapes} />
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