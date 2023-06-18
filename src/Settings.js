// import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, SelectControl, RadioControl, __experimentalUnitControl as UnitControl, } from '@wordpress/components';

// Settings Components
import { Label, BColor } from '../../Components';
// import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, pxUnit, vhUnit } from '../../Components/utils/options';

import { generalStyleTabs, shapes } from './utils/options';
import { ToggleControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

const Settings = ({ attributes, setAttributes }) => {
	const { shape, isInSection, possition, width, height, color } = attributes;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Shape', 'shape-divider')} initialOpen={true}>
						<PanelRow>
							<Label className=''>{__('Shape Type:', 'shape-divider')}</Label>
							<SelectControl value={shape} onChange={val => setAttributes({ shape: val })} options={shapes} />
						</PanelRow>

						<ToggleControl className='mt20'
							label={__('Is in a section?', 'shape-divider')}
							checked={isInSection}
							onChange={(val) => setAttributes({ isInSection: val })}
						/>
						<small>{__(`If you enable 'Is in Section', Please add position relative to the parent element. Also, you can change 'z-index' if you need.`, 'shape-divider')}</small>

						<PanelRow className='mt20'>
							<Label mt='0' mb='0'>{__('possition:', 'b-blocks')}</Label>
							<RadioControl selected={possition} onChange={val => setAttributes({ possition: val })} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },

							]}
							/>
						</PanelRow>

						<Label>{__('Width:', 'shape-divider')}</Label>
						<RangeControl value={width} onChange={val => setAttributes({ width: val })} min={100} max={300} />

						<UnitControl className='mt20' label={__('Height:', 'shape-divider')} labelPosition='left' value={height.desktop} onChange={val => setAttributes({ height: { desktop: val, tablet: val, mobile: val } })} units={[pxUnit(), emUnit(), vhUnit()]} isResetValueOnUnitChange={true} />
					</PanelBody>
				</>}

				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Shape', 'shape-divider')}>
						<BColor label={__('Color:', 'shape-divider')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>

	</>;
};
export default Settings;