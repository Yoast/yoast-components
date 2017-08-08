import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import colors from "../../../style-guide/colors.json";
import { Icon } from "./Icon";
import { rgba } from "../../../style-guide/helpers";

/**
 * Returns a component with applied focus styles.
 *
 * @param {ReactElement} component The original component.
 *
 * @returns {ReactElement} Component with applied focus styles.
 */
export function addFocusStyle( component ) {
	return styled( component )`
		&::-moz-focus-inner {
			border-width: 0;
		}

		&:focus {
			outline: none;
			border-color: ${ colors.$color_blue };
			background-color: ${ colors.$color_white };
			box-shadow: 0 0 3px ${ rgba( `${ colors.$color_blue_dark }`, .8 ) };
		}
	`;
}

/**
 * Returns a basic styled button.
 *
 * @param {object} props Component props.
 *
 * @returns {ReactElement} Styled button.
 */
export const BaseButton = addFocusStyle(
	styled.button`
		float: left;
		display: inline-block;
		padding: 8px 10px;
		border: 1px solid ${ colors.$color_button_border };
		border-radius: 4px;
		background: ${ colors.$color_button };
		color: ${ colors.$color_button_text };
		cursor: pointer;
		box-sizing: border-box;
		font-size: inherit;
		font-family: inherit;
		font-weight: inherit;
		min-height: 33px;
	`
);

BaseButton.defaultProps = {
	type: "button",
};

/**
 * Returns a button styled for the SnippetPreview.
 *
 * @param {object} props Component props.
 *
 * @returns {ReactElement} Styled button.
 */
export const SnippetPreviewButton = styled( BaseButton )`
	line-height: 15px;
	font-size: 0.8rem;
	
	> span {
		margin-left: 8px;
	}
`;

/**
 * Returns an icon button that can optionally contain text.
 *
 * @param {object} props Component props.
 *
 * @returns {ReactElement} Styled icon button.
 */
export const IconButton = ( props ) => {
	const { children, icon, iconColor } = props;
	return (
		<SnippetPreviewButton { ...props } >
			<Icon icon={ icon } color={ iconColor } />
			{ children ? <span>{ children }</span> : null }
		</SnippetPreviewButton>
	);
};

IconButton.propTypes = {
	icon: PropTypes.string,
	iconColor: PropTypes.string,
	children: PropTypes.string,
};

IconButton.defaultProps = {
	icon: "edit",
};

