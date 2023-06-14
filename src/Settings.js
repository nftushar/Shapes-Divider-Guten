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
	const { shape, items, layout, possition, alignment, textAlign, width, color, colors, isIcon, separator, padding, margin, border, shadow } = attributes;

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


					<PanelBody className='bPlPanelBody' title={__('Component Settings', 'block-directory')} initialOpen={false}>
						<ToggleControl label={__('Toggle?', 'block-directory')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} />

						<CheckboxControl className='mt20' label={__('Toggle?', 'block-directory')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} />

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
							<Label mt='0' mb='0'>{__('Top/bottomzz:', 'block-directory')}</Label>
							<SelectControl value={possition} onChange={val => {
								setAttributes({ possition: val });
							}} options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Buttom', value: 'bottom' },

							]} />



						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'block-directory')}</small>

						<PanelRow>
							<Label mt='0' mb='0'>{__('Layout:', 'b-blocks')}</Label>
							<RadioControl selected={layout} onChange={val => setAttributes({ layout: val })} options={layouts} />
						</PanelRow>

						<UnitControl className='mt20' label={__('Width:', 'block-directory')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'block-directory')}</small>

						<UnitControl className='mt20' label={__('Height:', 'block-directory')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'block-directory')}</small>
					</PanelBody>


					{/* <PanelBody className='bPlPanelBody' title={__('Custom Components', 'block-directory')} initialOpen={false}>
						<PanelRow>
							<Label mt='0'>{__('Columns:', 'block-directory')}</Label>
							<BDevice device={device} onChange={val => setDevice(val)} />
						</PanelRow>
						<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

						<UnitControl className='mt20' label={__('Column Gap:', 'block-directory')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

						<UnitControl className='mt20' label={__('Row Gap:', 'block-directory')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />

						<InlineDetailMediaUpload className='mt10' value={img} onChange={val => setAttributes({ img: val })} placeholder={__('Enter Image URL', 'block-directory')} />

						<IconControl className='mt20' icon={icon} onChange={val => setAttributes({ icon: val })} defaults={{ class: 'fab fa-wordpress' }} />

						<PanelRow>
							<Label mt='0'>{__('Position:', 'block-directory')}</Label>
							<BtnGroup value={layout} onChange={val => {
								setAttributes({ layout: val });
								'vertical' === val && updateAllItem('number', 10);
								'horizontal' === val && updateAllItem('number', 20);
							}} options={layouts} isIcon={true} />
						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'block-directory')}</small>
					</PanelBody> */}
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Custom Style', 'block-directory')}>
						{/* <Background label={__('Background:', 'block-directory')} value={background} onChange={val => setAttributes({ background: val })} /> */}
						{/* 
						<Typography className='mt20' label={__('Typography:', 'block-directory')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: 25 }} produce={produce} /> */}

						<BColor label={__('Color:', 'block-directory')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

						<ColorsControl value={colors} onChange={val => setAttributes({ colors: val })} defaults={{ color: '#333', bg: '#fff' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'block-directory')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '30px' }} />

						<SeparatorControl className='mt20' value={separator} onChange={val => setAttributes({ separator: val })} defaults={{ width: '20%', height: '2px', style: 'solid', color: '#bbb' }} />


						<SpaceControl className='mt20' label={__('Margin:', 'block-directory')} value={margin} onChange={val => setAttributes({ margin: val })} defaults={{ side: 2, bottom: '15px' }} />

						<BorderControl label={__('Border:', 'block-directory')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />

						<MultiShadowControl label={__('Shadow:', 'block-directory')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<ToolbarGroup className='bPlToolbar'>
				<ToolbarButton label={__('Add New Item', 'b-blocks')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
			</ToolbarGroup>

			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Block Directory Alignment')} alignmentControls={[
				{ title: __('Block Directory in left', 'block-directory'), align: 'left', icon: 'align-left' },
				{ title: __('Block Directory in center', 'block-directory'), align: 'center', icon: 'align-center' },
				{ title: __('Block Directory in right', 'block-directory'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;