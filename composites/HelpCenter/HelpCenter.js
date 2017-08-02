import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";
import PropTypes from "prop-types";

import SubNavigation from "./SubNavigation";
import HelpCenterTabs from "./HelpCenterTabs";
import VideoTutorial from "./views/VideoTutorial";
import AlgoliaSearcher from "./../AlgoliaSearch/AlgoliaSearcher";
import Button from "../../forms/Button";

const HelpCenterContainer = styled.div`
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
	
	display: flex;
	flex-direction: column;
	justify-content: flex-state;
	
    min-height: ${props => props.isOpen ? "30em" : 0};
`;

const CollapsableContainer = styled.div`
    overflow: hidden;
    
    height: auto;
    
//    min-height: ${props => props.isOpen ? "30em" : 0};
	transition: flex 0.5s ease-in-out;
	flex: ${props => props.isOpen ? 1 : 0};
	
	background: ${ colors.$color_white };
	border: 1px solid $\{ colors.$color_grey_light };
	position: relative;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
	box-sizing: border-box;
	
	margin: 0 1em 1em 1em;
	
    font-family: "Open Sans", sans-serif;

`;

const HelpCenterToggleButton = styled(Button)`
	margin: -1em auto 0 auto;
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

class HelpCenter extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			activeTab: "#kb",
			isOpen: true,
		};

		this.handler = this.stateHandler.bind( this );

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
				view: "You have new mail",
			},
			{
				id: "feedback",
				label: "Feedback",
				url: "#feedback",
				view: "How am I coding? Please call 555-FOOBAR",
			},
		];
	}

	stateHandler( url ) {
		this.setState( {
			activeTab: url
		} );
	}

	toggleOpenState() {
		this.setState( {
			isOpen: ! this.state.isOpen,
		} );
	}

	getButtonText() {
		if ( this.state.isOpen === false ) {
			return "Need help?";
		}

		return "Close help center";
	}

	render() {
		let buttonText = this.getButtonText();

		return (
			<div>
				<HelpCenterContainer>
					<CollapsableContainer isOpen={ this.state.isOpen }>
						<SubNavigation items={ this.items } activeTab={ this.state.activeTab } handler={ this.handler } />

						<div>
							<HelpCenterTabs items={ this.items } activeTab={ this.state.activeTab } />
						</div>

					</CollapsableContainer>
					<HelpCenterToggleButton text={ buttonText }  onClick={ () => this.toggleOpenState() } />
				</HelpCenterContainer>
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
