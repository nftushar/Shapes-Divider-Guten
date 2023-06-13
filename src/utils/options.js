import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const layouts = [
	{ label: __('Vertical', 'sdb-shape-divider'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'sdb-shape-divider'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'sdb-shape-divider') },
	{ name: 'style', title: __('Style', 'sdb-shape-divider') }
];