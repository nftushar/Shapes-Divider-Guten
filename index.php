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


	function getBackgroundCSS( $bg, $isSolid = true, $isGradient = true, $isImage = true ) {
		extract( $bg );
		$type = $type ?? 'solid';
		$color = $color ?? '#000000b3';
		$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
		$image = $image ?? [];
		$position = $position ?? 'center center';
		$attachment = $attachment ?? 'initial';
		$repeat = $repeat ?? 'no-repeat';
		$size = $size ?? 'cover';
		$overlayColor = $overlayColor ?? '#000000b3';
	
		$gradientCSS = $isGradient ? "background: $gradient;" : '';
	
		$imgUrl = $image['url'] ?? '';
		$imageCSS = $isImage ? "background: url($imgUrl); background-color: $overlayColor; background-position: $position; background-size: $size; background-repeat: $repeat; background-attachment: $attachment; background-blend-mode: overlay;" : '';
	
		$solidCSS = $isSolid ? "background: $color;" : '';
	
		$styles = 'gradient' === $type ? $gradientCSS : ( 'image' === $type ? $imageCSS : $solidCSS );
	
		return $styles;
	}



	// function getColorsCSS($colors) {
	// 	if (!is_array($colors)) {
	// 		$colors = array(); // Set an empty array as default
	// 	}
	
	// 	extract($colors);
	// 	$color = $color ?? '#333';
	// 	$bgType = $bgType ?? 'solid';
	// 	$bg = $bg ?? '#0000';
	// 	$gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
	
	// 	$background = $bgType === 'gradient' ? $gradient : $bg;
	
	// 	$styles = '';
	// 	$styles .= $color ? "color: " . esc_attr($color) . ";" : '';
	// 	$styles .= ($gradient || $bg) ? "background: " . esc_attr($background) . ";" : '';
	
	// 	return $styles;
	// }
	

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
		$blockClassName = "wp-block-sdb-shape $className align$align";

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='sdbShapeDivider-<?php echo esc_attr( $cId ) ?>'>
			<style>
				<?php echo esc_html( $this->styles($attributes) ); ?>
			</style>

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<?php echo wp_kses( $this->shapePath( $shape ), ['path' => [ 'd' => [], 'opacity' => [] ] ] ); ?>
			</svg>
			<div class='shapeContent'> 
			<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>

		<?php return ob_get_clean();
	} // Render

	function styles($attributes){
		extract( $attributes );

		$topVal = 'top' === $shapePossition ? '0' : 'auto';
		$bottomVal = 'bottom' === $shapePossition ? '0' : 'auto';
		$transform = 'top' === $shapePossition ? '0deg' : '180deg';
		$backgroundColor = $this->getBackgroundCSS($background);

		$styles = "
			#sdbShapeDivider-$cId{
				min-height: $height[desktop];
				$backgroundColor
				padding: " . implode(' ', $padding) . ";
			}
			#sdbShapeDivider-$cId svg{
				width: calc($shapeWidth% + 1.3px);
				height: $shapeHeight[desktop];
				fill: $shapeColor;
				top: $topVal;
				bottom: $bottomVal;
				transform: rotate($transform);
			}
		";

		ob_start();
			echo esc_html( $styles );
		return ob_get_clean();
	}

	function shapePath($shape){

		$path;
		if('curve' === $shape){
			$path = "<path d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z' />";
		}
		else if('tilt' === $shape){
			$path = "<path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' />";
		}
		else if('curve-acymmetrical' === $shape){
			$path = "<path d='M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z' />";
		}
		else if('waves' === $shape){
			$path = "<path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' />";
		}
		else if('waves-opacity' === $shape){
			$path = "<path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' />
			<path d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' />
			<path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' />";
		}else{
			$path = "<path d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z' />";
		}

		return $path;
	}
	
	
	}
	

	
new sdbShapeDivider();