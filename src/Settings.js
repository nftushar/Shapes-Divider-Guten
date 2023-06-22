// import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, SelectControl, __experimentalUnitControl as UnitControl, RangeControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';

// Settings Components
import { Label, BColor, Background } from '../../Components';
// import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, pxUnit, vhUnit } from '../../Components/utils/options';

import { generalStyleTabs, shapes } from './utils/options';

const Settings = ({ attributes, setAttributes }) => {
	
	const { height, shape, shapePossition, shapeWidth, shapeHeight, shapeColor, background, padding } = attributes;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Shape', 'shape-divider')} initialOpen={true}>
						<PanelRow>
							<Label className=''>{__('Shape Type:', 'shape-divider')}</Label>
							<SelectControl value={shape} onChange={val => setAttributes({ shape: val })} options={shapes} />
						</PanelRow>
						<PanelRow className='mt20'>
							<Label className=''>{__('Shape Type:', 'shape-divider')}</Label>
							<SelectControl
								value={shapePossition} options={[{ label: __('Top', 'b-blocks'), value: 'top' }, { label: __('Bottom', 'b-blocks'), value: 'bottom' },]} onChange={newPosition => setAttributes({ shapePossition: newPosition })} />
						</PanelRow>

						<Label>{__('Width:', 'shape-divider')}</Label>
						<RangeControl value={shapeWidth} onChange={val => setAttributes({ shapeWidth: val })} min={100} max={300} />
						<UnitControl className='mt20' label={__('Height:', 'shape-divider')} labelPosition='left' value={height.desktop} onChange={val => setAttributes({ height: { desktop: val, tablet: val, mobile: val } })} units={[pxUnit(), emUnit(), vhUnit()]} isResetValueOnUnitChange={true} />

						<UnitControl className='mt20' label={__('Shape Height:', 'shape-divider')} labelPosition='left' value={shapeHeight.desktop} onChange={val => setAttributes({ shapeHeight: { desktop: val, tablet: val, mobile: val } })} units={[pxUnit(), emUnit(), vhUnit()]} isResetValueOnUnitChange={true} />

					</PanelBody>
					<PanelBody className='bPlPanelBody' title={__('Tab/Menu', 'stepped-content')}>
						<BoxControl
							label={__("Content Padding", "sdb")}
							values={padding}
							resetValues={{
								"top": "0px",
								"right": "0px",
								"bottom": "0px",
								"left": "0px"
							}}
							onChange={(value) => setAttributes({ padding: value })} />
					</PanelBody>
				</>}
				{/* {console.log(padding)} */}
				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Shape', 'shape-divider')}>
						<BColor label={__('Color:', 'shape-divider')} value={shapeColor} onChange={val => setAttributes({ shapeColor: val })} defaultColor='#333' />
					</PanelBody>
					<PanelBody className='bPlPanelBody' title={__('Bg Color', 'shape-divider')}>
						<Background label={__("Background Color", "sdb")} value={background} onChange={(val) =>
							setAttributes({ background: val })
						} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>

	</>;
};
export default Settings;