<?php
/**
 * Plugin Name:Shape Divider
 * Description: Shape Divider is a web design tool that allows users to create unique and visually appealing dividers by customizing shapes and patterns.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: sdb-shape-divider
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'sdb_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'sdb_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Block Directory
class sdbBlockDirectory{
	function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_action( 'init', [$this, 'onInit'] );
	}

	function enqueueBlockAssets(){
		wp_enqueue_style( 'fontAwesome', sdb_ASSETS_DIR . 'css/fontAwesome.min.css', [], '5.15.4' ); // Font Awesome
	}

	function onInit() {
		wp_register_style( 'sdb-sdb-shape-divider-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], sdb_PLUGIN_VERSION ); // Backend Style
		wp_register_style( 'sdb-sdb-shape-divider-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], sdb_PLUGIN_VERSION ); // Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'sdb-sdb-shape-divider-editor-style',
			'style'				=> 'sdb-sdb-shape-divider-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'sdb-sdb-shape-divider-editor-script', 'sdb-shape-divider', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		$className = $className ?? '';
		$sdbBlockClassName = 'wp-block-sdb-shapes ' . $className . ' align' . $align;

		ob_start(); ?>
		<div class='<?php echo esc_attr( $sdbBlockClassName ); ?>' id='sdbBlockDirectory-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new sdbBlockDirectory();