import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import colors from "../../style-guide/colors.json";

const YoastTabsContainer = styled.div`
	border-bottom: 1px solid ${ colors.$color_grey_light };
	font-size: 1em;

	.react-tabs__tab-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
		padding: 0;
		margin: 0;
		text-transform: uppercase;
	}

	.react-tabs__tab {
		display: inline-block;
		text-align: center;
		margin: 0 30px;
		padding: 10px;
		color: ${ colors.$color_pink_dark };
		cursor: pointer;

		&.react-tabs__tab--selected {
			box-shadow: inset 0 -5px 0 0 ${ colors.$color_pink_dark }
		}
	}

	.react-tabs__tab-panel {
		padding: 18px 20px;
		display: none;

		&.react-tabs__tab-panel--selected {
			display: block;
		}
	}
`;

/**
 * Creates a Yoast styled ARIA tabs widget.
 */
class YoastTabs extends React.Component {
	/**
	 * Constructs the class.
	 *
	 * @param {Object} props The props to use within the component.
	 *
	 * @constructor
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Gets all the defined tabs and returns an array of Tab components.
	 *
	 * @returns {Array} Array containing a Tab component for each item in the props.
	 */
	getTabs() {
		return this.props.items.map( ( item ) => {
			return this.addTab( item.id, item.label );
		} );
	}

	/**
	 * Gets all the defined tabpanels and returns an array of TabPanel components.
	 *
	 * @returns {Array} Array containing a Tabpanel component for each item in the props.
	 */
	getTabPanels() {
		return this.props.items.map( ( item ) => {
			return this.addTabPanel( item.id, item.view );
		} );
	}

	/**
	 * Adds the Tab component.
	 *
	 * @param {string} id    The unique ID for the tab.
	 * @param {string} label The tab label.
	 *
	 * @returns {ReactElement} The rendered Tab component.
	 */
	addTab( id, label ) {
		return <Tab key={ id }>
			{ label }
		</Tab>;
	}

	/**
	 * Adds the TabPanel component.
	 *
	 * @param {string}       id      The unique ID for the tabpanel.
	 * @param {ReactElement} content The content of the tabpanel.
	 *
	 * @returns {ReactElement} The rendered TabPanel component.
	 */
	addTabPanel( id, content ) {
		return <TabPanel key={ id } tabIndex="0">
			{ content }
		</TabPanel>;
	}

	/**
	 * Renders the ARIA tabs widget.
	 *
	 * @returns {ReactElement} The ARIA tabs widget.
	 */
	render() {
		return <YoastTabsContainer>
			<Tabs>
				<TabList>
					{ this.getTabs() }
				</TabList>
				{ this.getTabPanels() }
			</Tabs>
		</YoastTabsContainer>;
	}
}

YoastTabs.propTypes = {
	items: PropTypes.array,
};

YoastTabs.defaultProps = {
	items: [],
};

export default YoastTabs;
