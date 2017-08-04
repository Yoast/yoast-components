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

/**
 * Creates the various tabs for the HelpCenter.
 */
class HelpCenterTabs extends React.Component {

	/**
	 * Constructs the class and sets its initial state.
	 *
	 * @param {Object} props The props to use within the component.
	 *
	 * @constructor
	 */
	constructor( props ) {
		super( props );

		this.state = { activeTab: this.props.activeTab };
		this.getTabs();
	}

	/**
	 * Checks whether props were changed and applies them to the state to change the currently active tab.
	 *
	 * @param {Object} newProps The new props to use.
	 *
	 * @returns {void}
	 */
	componentWillReceiveProps( newProps ) {
		this.setState( { activeTab: newProps.activeTab } );
	}

	/**
	 * Gets all the defined tabs and returns an array of ReactElements.
	 *
	 * @returns {Array} Array containing a Tab component for every defined item found in the props.
	 */
	getTabs() {
		return this.props.items.map( ( item ) => {
			return this.addTab( item.id, item.url, item.view );
		} );
	}

	/**
	 * Adds the Tab component.
	 *
	 * @param {string|integer} id The unique ID for the tab.
	 * @param {string} url The current URL to check against.
	 * @param {ReactElement} content The content of the tab.
	 *
	 * @returns {ReactElement} The rendered Tab component.
	 */
	addTab( id, url, content ) {
		return <Tab key={ id } className={ url === this.state.activeTab ? "tab-active" : "" }>{ content }</Tab>
	}

	/**
	 * Renders out all the tabs.
	 *
	 * @returns {ReactElement} The tabs.
	 */
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
