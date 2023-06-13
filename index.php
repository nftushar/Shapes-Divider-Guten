<?php
/**
 * Plugin Name: Shape Divider
 * Description: Description of the Block Directory.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: block-directory
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'BDB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'BDB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Block Directory
class BDBBlockDirectory{
	function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_action( 'init', [$this, 'onInit'] );
	}

	function enqueueBlockAssets(){
		wp_enqueue_style( 'fontAwesome', BDB_ASSETS_DIR . 'css/fontAwesome.min.css', [], '5.15.4' ); // Font Awesome
	}

	function onInit() {
		wp_register_style( 'bdb-block-directory-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], BDB_PLUGIN_VERSION ); // Backend Style
		wp_register_style( 'bdb-block-directory-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], BDB_PLUGIN_VERSION ); // Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'bdb-block-directory-editor-style',
			'style'				=> 'bdb-block-directory-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'bdb-block-directory-editor-script', 'block-directory', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		$className = $className ?? '';
		$bdbBlockClassName = 'wp-block-bdb-block-directory ' . $className . ' align' . $align;

		ob_start(); ?>
		<div class='<?php echo esc_attr( $bdbBlockClassName ); ?>' id='bdbBlockDirectory-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new BDBBlockDirectory();