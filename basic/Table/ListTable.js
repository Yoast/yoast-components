import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";

const List = styled.ul`
	margin: 0;
 	padding: 0;
 	list-style: none;
 	position: relative;
 	width: 100%;

 	li:first-child {
		& > span::before {
			left: auto;
		}
	}
`;

List.propTypes = {
	children: PropTypes.any,
};

/**
 * Makes an element full-width in the mobile responsive view.
 *
 * @param {ReactElement} component The original element.
 * @returns {ReactElement} The element with full width responsive style.
 */
export function makeFullWidth( component ) {
	return styled( component )`
		@media screen and ( max-width: 800px ) {
			min-width: 100%;
			margin-top: 1em;
			padding-right: 0;
			padding-left: 0;
		}
	`;
}

class ListTable extends React.Component {
	constructor( props ) {
		super( props );

		this.children = this.getChildren();
	}

	getChildren() {
		if ( this.props.children === 1 ) {
			return [ this.props.children ];
		}

		return this.props.children;
	}

	render() {
		return ( <List role="list" children={ this.children } /> );
	}
}

class ZebrafiedTable extends ListTable {
	constructor( props ) {
		super( props );

		this.zebraProps = Object.assign( {}, props );
		this.zebrafyChildren();
	}

	zebrafyChildren() {
		this.zebraProps.children = this.props.children.map( ( child, index ) => {
			return React.cloneElement( child, {
				background: ( index % 2 === 1 ) ? colors.$color_white : colors.$color_background_light,
			} );
		} );
	}

	render() {
		return ( <List role="list" { ...this.zebraProps } /> );
	}
}

ListTable.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] )
};

export { ListTable, ZebrafiedTable };
