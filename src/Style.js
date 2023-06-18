const Style = ({ attributes, clientId }) => {
	const { color, possition, width, height, isInSection, zindex } = attributes;

	const mainSl = `#sdbShapeDivider-${clientId}`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${mainSl}{
			position: ${isInSection ? 'absolute' : 'relative'};
			top: ${'top' === possition ? 0 : 'auto'};
			bottom: ${'bottom' === possition ? 0 : 'auto'};
			z-index: ${zindex}
		}
		${mainSl} svg{
			width: calc(${width}% + 1.3px);
			height: ${height.desktop};
			fill: ${color};
			transform: rotate(${'top' === possition ? 0 : 180}deg);
		}
	`}} />;
}
export default Style;