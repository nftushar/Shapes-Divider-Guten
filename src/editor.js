import { registerBlockType } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import { blockIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: blockIcon,

	// Build in Functions
	edit: Edit,

	save: () => null
});