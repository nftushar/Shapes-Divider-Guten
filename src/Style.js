import { getBackgroundCSS } from './Components/utils/getCSS';
import { getBoxValue } from './utils/function';

const Style = ({ attributes, clientId }) => {
	const { shapeColor, shapePossition, shapeWidth, shapeHeight, padding, background, height } = attributes;

	const mainSl = `#sdbShapeDivider-${clientId}`;
	// ${getBackgroundCSS(background)}
	// 		${getBoxValue(padding)}
// console.log(background);

	return <style dangerouslySetInnerHTML={{
		__html: `
		${mainSl}{
			height: ${height.desktop};
			${getBackgroundCSS(background)}
			padding: ${getBoxValue(padding)};
		}

		${mainSl} svg{
			width: calc(${shapeWidth}% + 1.3px);
			height: ${shapeHeight.desktop};
			fill: ${shapeColor};
			top: ${'top' === shapePossition ? 0 : 'auto'};
			bottom: ${'bottom' === shapePossition ? 0 : 'auto'};
			transform: rotate(${'top' === shapePossition ? 0 : 180}deg);
		}
	`}} />;

}
export default Style;