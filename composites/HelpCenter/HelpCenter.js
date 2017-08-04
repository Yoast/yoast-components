import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";
import PropTypes from "prop-types";

import SubNavigation from "./SubNavigation";
import HelpCenterTabs from "./HelpCenterTabs";
import VideoTutorial from "./views/VideoTutorial";
import AlgoliaSearcher from "./../AlgoliaSearch/AlgoliaSearcher";
import Button from "../../forms/Button";

/**
 * The parent component that wraps everything HelpCenter-related.
 */
const HelpCenterContainer = styled.div`
	width: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: flex-state;
`;

/**
 * A collapsable container to be used to show/hide the HelpCenter.
 */
const CollapsableContainer = styled.div`
	width: 100%;
	max-width: 1280px;
    overflow: hidden;
    
    max-height: ${props => props.isOpen ? "100em" : 0};
	transition: max-height 0.5s ease-in-out;
	
	background: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_grey_light };
	position: relative;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
	box-sizing: border-box;
	
	margin: 0 auto;
	
    font-family: "Open Sans", sans-serif;
`;

/**
 * The toggle button to show / hide the HelpCenter.
 */
const HelpCenterToggleButton = styled( Button )`
	margin: 0 auto;
	display: block;
	height: 3em;
	padding: 0 16px;
	
	background-color: ${ colors.$color_green_medium_light };
	border: 0;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
	color: ${ colors.$color_white };
	
	text-transform: uppercase;
	text-shadow: 0px 0px 1px #000;
	font-size: 1em;
	
	cursor: pointer;
`;

/**
 * Creates the HelpCenter that can be used to assist the user by providing useful information.
 */
class HelpCenter extends React.Component {

	/**
	 * Constructs the HelpCenter component and sets its initial state.
	 *
	 * @param {Object} props The props to use for this component.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			activeTab: "#kb",
			isOpen: true,
		};

		this.handler = this.stateHandler.bind( this );

		/**
		 * Defines the various items that should be displayed in the SubNavigation. Also defines the tabs.
		 *
		 * @type {Array} Array containing the objects that define the menu items and tabs.
		 */
		this.items = [
			{
				id: "video",
				label: "Video tutorial",
				url: "#video",
				view: <VideoTutorial src="https://yoa.st/screencast-notification-center" title="Yo" />,
			},
			{
				id: "kb",
				label: "Knowledge Base",
				url: "#kb",
				view: <AlgoliaSearcher />,
			},
			{
				id: "email",
				label: "Email Support",
				url: "#email",
				view: "Email Support",
			},
			{
				id: "feedback",
				label: "Feedback",
				url: "#feedback",
				view: "Please leave feedback",
			},
		];
	}

	/**
	 * Handles the state change that alters the current active tab.
	 *
	 * @param {string} url The URL to set as active.
	 *
	 * @returns {void}
	 */
	stateHandler( url ) {
		this.setState( {
			activeTab: url
		} );
	}

	/**
	 * Toggles the open/close state of the HelpCenter.
	 *
	 * @returns {void}
	 */
	toggleOpenState() {
		this.setState( {
			isOpen: ! this.state.isOpen,
		} );
	}

	/**
	 * Determines the button text based on the current open/close state.
	 *
	 * @returns {string} The button text.
	 */
	getButtonText() {
		if ( this.state.isOpen === false ) {
			return "Need help?";
		}

		return "Close help center";
	}

	/**
	 * Renders the HelpCenter.
	 *
	 * @returns {ReactElement} The HelpCenter component.
	 */
	render() {
		let buttonText = this.getButtonText();

		return (
			<div>
				<CollapsableContainer isOpen={ this.state.isOpen }>
					<HelpCenterContainer>
						<SubNavigation items={ this.items } activeTab={ this.state.activeTab } handler={ this.handler } />
						<div>
							<HelpCenterTabs items={ this.items } activeTab={ this.state.activeTab } />
						</div>
					</HelpCenterContainer>
				</CollapsableContainer>
				<HelpCenterToggleButton text={ buttonText } onClick={ () => this.toggleOpenState() } />
			</div> );
	}
}

CollapsableContainer.PropTypes = {
	isOpen: PropTypes.Boolean,
};

CollapsableContainer.defaultProps = {
	isOpen: true,
};

export default HelpCenter;
