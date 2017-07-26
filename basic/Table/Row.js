import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";

// The Rows are flex containers.
export const Row = styled.li`
	background: ${ props => props.background };
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

Row.propTypes = {
	background: PropTypes.string,
	hasHeaderLabels: PropTypes.bool,
};

Row.defaultProps = {
	background: colors.$color_white,
	hasHeaderLabels: true,
};

/*
 * A responsive row allows children to wrap in new lines in the responsive view.
 * If the columns have headers, they're displayed as labels inside the column
 * content.
 */
export const RowMobileCollapse = styled( Row )`
	@media screen and ( max-width: 800px ) {
		flex-wrap: wrap;
		align-items: flex-start;

		&:first-child {
			margin-top: ${ props => props.hasHeaderLabels ? "24px" : "0" };
		}

		// Use the column headers (if any) as labels.
		& > span::before {
			position: static;
			display: inline-block;
			padding-right: 0.5em;
			font-size: inherit;
		}
	}
`;
