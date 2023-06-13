import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const layouts = [
	{ label: __('Vertical', 'block-directory'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'block-directory'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'block-directory') },
	{ name: 'style', title: __('Style', 'block-directory') }
];