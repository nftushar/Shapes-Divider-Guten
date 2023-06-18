import { __ } from '@wordpress/i18n';

export const shapes = [
	{ label: __('Curve', 'shape-divider'), value: 'curve' },
	{ label: __('Tilt', 'shape-divider'), value: 'tilt' },
	{ label: __('Curve Acymmetrical', 'shape-divider'), value: 'curve-acymmetrical' },
	{ label: __('Waves', 'shape-divider'), value: 'waves' },
	{ label: __('Waves Opacity', 'shape-divider'), value: 'waves-opacity' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'shape-divider') },
	{ name: 'style', title: __('Style', 'shape-divider') }
];