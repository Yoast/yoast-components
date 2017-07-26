import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Tab = styled.section`
	padding: 18px 20px;
	display: none;
	
	&.tab-active {
		display: block;
	}
`;

class HelpCenterTabs extends React.Component {
	constructor( props ) {
		super( props );

		this.state = { activeTab: this.props.activeTab };
		this.getTabs();
	}

	componentWillReceiveProps( newProps ) {
		this.setState( { activeTab: newProps.activeTab } );
	}

	getTabs() {
		return this.props.items.map( ( item ) => {
			return this.addTab( item.id, item.url, item.view );
		} );
	}

	addTab( id, url, content ) {
		return <Tab key={ id } className={ url === this.state.activeTab ? "tab-active" : "" }>{ content }</Tab>
	}

	render() {
		return <div>{ this.getTabs() }</div>
	}
}

HelpCenterTabs.propTypes = {
	isActive: PropTypes.bool,
};

HelpCenterTabs.defaultProps = {
	isActive: false,
};

export default HelpCenterTabs;
