import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import { blockIcon } from './utils/icons';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType(metadata, {
	icon: blockIcon,

	// Build in Functions
	edit: Edit,

	save: () => <InnerBlocks.Content />
});