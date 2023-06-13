import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextControl, ToggleControl, SelectControl, CheckboxControl, RadioControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import produce from 'immer';

// Settings Components
import { Label, Background, BColor, BDevice, BorderControl, BtnGroup, ColorsControl, IconControl, InlineDetailMediaUpload, MultiShadowControl, SeparatorControl, SpaceControl, Typography } from '../../Components';
import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, perUnit, pxUnit } from '../../Components/utils/options';

import { generalStyleTabs, layouts } from './utils/options';

const Settings = ({ attributes, setAttributes, updateItem, activeIndex, setActiveIndex }) => {
	const { items, columns, columnGap, rowGap, layout, alignment, textAlign, width, background, typography, color, colors, isIcon, icon, img, separator, padding, margin, border, shadow } = attributes;

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

	const duplicateItem = e => {
		e.preventDefault();

		setAttributes({ items: [...items.slice(0, activeIndex), { ...items[activeIndex] }, ...items.slice(activeIndex)] });

		setActiveIndex(activeIndex + 1);
	}

	const removeItem = e => {
		e.preventDefault();

		setAttributes({ items: [...items.slice(0, activeIndex), ...items.slice(activeIndex + 1)] });

		setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
	}

	const { number = '', text = '' } = items[activeIndex] || {};

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Add or Remove Items', 'sdb-shape-divider')}>
						{null !== activeIndex && <>
							<h3 className='bplItemTitle'>{__(`Item ${activeIndex + 1}:`, 'sdb-shape-divider')}</h3>

							<NumberControl className='mt20' label={__('Number:', 'sdb-shape-divider')} labelPosition='left' value={number} onChange={val => updateItem('number', val)} />

							<Label>{__('Text:', 'sdb-shape-divider')}</Label>
							<TextControl value={text} onChange={val => updateItem('text', val)} />

							<PanelRow className='itemAction mt20 mb15'>
								{1 < items?.length && <Button className='removeItem' label={__('Remove', 'sdb-shape-divider')} onClick={removeItem}><Dashicon icon='no' />{__('Remove', 'sdb-shape-divider')}</Button>}

								<Button className='duplicateItem' label={__('Duplicate', 'sdb-shape-divider')} onClick={duplicateItem}>{gearIcon}{__('Duplicate', 'sdb-shape-divider')}</Button>
							</PanelRow>
						</>}

						<div className='addItem'>
							<Button label={__('Add New Card', 'sdb-shape-divider')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New Card', 'sdb-shape-divider')}</Button>
						</div>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Component Settings', 'sdb-shape-divider')} initialOpen={false}>
						<ToggleControl label={__('Toggle?', 'sdb-shape-divider')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} />

						<CheckboxControl className='mt20' label={__('Toggle?', 'sdb-shape-divider')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} />

						<PanelRow>
							<Label mt='0' mb='0'>{__('Layout:', 'sdb-shape-divider')}</Label>
							<SelectControl value={layout} onChange={val => {
								setAttributes({ layout: val });
								'vertical' === val && updateAllItem('number', 10);
								'horizontal' === val && updateAllItem('number', 20);
							}} options={layouts} />
						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'sdb-shape-divider')}</small>

						<PanelRow>
							<Label mt='0' mb='0'>{__('Layout:', 'b-blocks')}</Label>
							<RadioControl selected={layout} onChange={val => setAttributes({ layout: val })} options={layouts} />
						</PanelRow>

						<UnitControl className='mt20' label={__('Width:', 'sdb-shape-divider')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'sdb-shape-divider')}</small>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Custom Components', 'sdb-shape-divider')} initialOpen={false}>
						<PanelRow>
							<Label mt='0'>{__('Columns:', 'sdb-shape-divider')}</Label>
							<BDevice device={device} onChange={val => setDevice(val)} />
						</PanelRow>
						<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

						<UnitControl className='mt20' label={__('Column Gap:', 'sdb-shape-divider')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

						<UnitControl className='mt20' label={__('Row Gap:', 'sdb-shape-divider')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />

						<InlineDetailMediaUpload className='mt10' value={img} onChange={val => setAttributes({ img: val })} placeholder={__('Enter Image URL', 'sdb-shape-divider')} />

						<IconControl className='mt20' icon={icon} onChange={val => setAttributes({ icon: val })} defaults={{ class: 'fab fa-wordpress' }} />

						<PanelRow>
							<Label mt='0'>{__('Position:', 'sdb-shape-divider')}</Label>
							<BtnGroup value={layout} onChange={val => {
								setAttributes({ layout: val });
								'vertical' === val && updateAllItem('number', 10);
								'horizontal' === val && updateAllItem('number', 20);
							}} options={layouts} isIcon={true} />
						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'sdb-shape-divider')}</small>
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Custom Style', 'sdb-shape-divider')}>
						<Background label={__('Background:', 'sdb-shape-divider')} value={background} onChange={val => setAttributes({ background: val })} />

						<Typography className='mt20' label={__('Typography:', 'sdb-shape-divider')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: 25 }} produce={produce} />

						<BColor label={__('Color:', 'sdb-shape-divider')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

						<ColorsControl value={colors} onChange={val => setAttributes({ colors: val })} defaults={{ color: '#333', bg: '#fff' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'sdb-shape-divider')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '30px' }} />

						<SeparatorControl className='mt20' value={separator} onChange={val => setAttributes({ separator: val })} defaults={{ width: '20%', height: '2px', style: 'solid', color: '#bbb' }} />

						<SpaceControl className='mt20' label={__('Margin:', 'sdb-shape-divider')} value={margin} onChange={val => setAttributes({ margin: val })} defaults={{ side: 2, bottom: '15px' }} />

						<BorderControl label={__('Border:', 'sdb-shape-divider')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />

						<MultiShadowControl label={__('Shadow:', 'sdb-shape-divider')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<ToolbarGroup className='bPlToolbar'>
				<ToolbarButton label={__('Add New Item', 'b-blocks')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
			</ToolbarGroup>

			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Block Directory Alignment')} alignmentControls={[
				{ title: __('Block Directory in left', 'sdb-shape-divider'), align: 'left', icon: 'align-left' },
				{ title: __('Block Directory in center', 'sdb-shape-divider'), align: 'center', icon: 'align-center' },
				{ title: __('Block Directory in right', 'sdb-shape-divider'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;