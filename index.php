<?php
/**
 * Plugin Name:Shape Divider
 * Description: Shape Divider is a web design tool that allows users to create unique and visually appealing dividers by customizing shapes and patterns.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: shape-divider
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'SDB_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'SDB_DIR', plugin_dir_url( __FILE__ ) );

// Shape Divider
class sdbShapeDivider{
	function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}

	function onInit() {
		wp_register_style( 'sdb-shape-style', plugins_url( 'dist/style.css', __FILE__ ), [], SDB_VERSION ); // Style
		wp_register_style( 'sdb-shape-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'sdb-shape-style' ], SDB_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'sdb-shape-editor-style',
			'style'				=> 'sdb-shape-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'sdb-shape-editor-script', 'sdb-shape-divider', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes, $content ){
		extract( $attributes );

		$className = $className ?? '';
		$blockClassName = 'wp-block-sdb-shape ' . $className . ' align' . $align;

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='sdbShapeDivider-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>' data-content='<?php echo esc_attr( wp_json_encode( $content ) ); ?>'>
	
			<?php echo wp_kses_post( $this->shape() ); ?>
		</div>

		<?php return ob_get_clean();
	} // Render


	function shape(  ){

	}
}
new sdbShapeDivider();