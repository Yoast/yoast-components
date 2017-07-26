import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";

const SubNavigationElement = styled.nav`
	border-bottom: 1px solid ${ colors.$color_grey_light };
	font-size: 1em;
	text-transform: uppercase;
	display: block;
	
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
	    height: 100%;
	    padding: 0;
	    margin: 0;
	}
	
	li {
		display: inline-block;
	    text-align: center;
	    margin: 0 30px;
		
		&.tab-active {
	        box-shadow: inset 0 -5px 0 0 ${colors.$color_pink_dark}
		}
	}
	
	a {
		padding: 10px;
		display: flex;
		align-items: flex-start;
	}
`;

const Link = styled.a`
	color: ${colors.$color_pink_dark};
	text-decoration: none;
	display: block;
	padding: 18px 0;
`;

export default class SubNavigation extends React.Component {
	constructor( props ) {
		super( props );

		this.items = props.items;
	}

	renderNavigation() {
		return( <ul>{ this.renderNavigationItems() }</ul> )
	}

	renderNavigationItems() {
		return this.items.map( ( item ) => {
			return (
				<li key={item.id} className={ item.url === this.props.activeTab ? "tab-active" : "" }>
					<Link href={item.url} onClick={ () => this.props.handler( item.url ) } > {item.label}</Link>
				</li>
			);
		} );
	}

	render() {
		return ( <SubNavigationElement>{ this.renderNavigation() }</SubNavigationElement> )
	}
}
