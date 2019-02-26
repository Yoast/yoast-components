/* External dependencies */
import styled from "styled-components";

/* Internal dependencies */
import { MODE_DESKTOP } from "../constants";
import {
	angleLeft,
	angleRight,
} from "../../../../../composites/Plugin/SnippetEditor/components/Shared";
import { getRtlStyle } from "../../../../../utils/helpers/styled-components";

/**
 * Adds caret styles to a component.
 *
 * @param {ReactComponent} WithoutCaret The component without caret styles.
 * @param {string} color The color to render the caret in.
 * @param {string} mode The mode the snippet preview is in.
 *
 * @returns {ReactComponent} The component with caret styles.
 */
function addCaretStyle( WithoutCaret, color, mode ) {
	return styled( WithoutCaret )`
		&::before {
			display: block;
			position: absolute;
			top: -3px;
			${ getRtlStyle( "left", "right" ) }: ${ () => mode === MODE_DESKTOP ? "-22px" : "-40px" };
			width: 24px;
			height: 24px;
			background-image: url( ${ getRtlStyle( angleRight( color ), angleLeft( color ) ) } );
			background-size: 25px;
			content: "";
		}
	`;
}

export default addCaretStyle;
