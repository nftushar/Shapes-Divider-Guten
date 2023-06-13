import { getBackgroundCSS, getBorderCSS, getColorsCSS, getIconCSS, getSeparatorCSS, getMultiShadowCSS, getSpaceCSS, getTypoCSS } from '../../Components/utils/getCSS';

const Style = ({ attributes, clientId }) => {
	const { columnGap, rowGap, alignment, textAlign, width, background, typography, color, colors, icon, separator, padding, margin, border, shadow } = attributes;

	const mainSl = `#sdbBlockDirectory-${clientId}`;
	const directorySl = `${mainSl} .sdbBlockDirectory`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', typography)?.googleFontLink}
		${getTypoCSS(`${directorySl} .content`, typography)?.styles}

		${mainSl}{
			text-align: ${alignment};
		}
		${directorySl}{
			grid-gap: ${rowGap} ${columnGap};
			text-align: ${textAlign};
			width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			margin: ${getSpaceCSS(margin)};
			${getBorderCSS(border)}
			box-shadow: ${getMultiShadowCSS(shadow)};
		}
		${directorySl} .content{
			color: ${color};
			${getColorsCSS(colors)}
		}
		${directorySl} .icon{
			${getIconCSS(icon)}
		}
		${directorySl} .separator{
			${getSeparatorCSS(separator)}
		}
	`}} />;
}
export default Style;