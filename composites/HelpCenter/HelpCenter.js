import React from "react";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";
import SubNavigation from "./SubNavigation";
import HelpCenterTabs from "./HelpCenterTabs";
import VideoTutorial from "./views/VideoTutorial";
import AlgoliaSearcher from "./../AlgoliaSearch/AlgoliaSearcher";

const HelpCenterContainer = styled.section`
	width: 100%;
	background: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_grey_light };
	position: relative;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
	margin: 20px 20px 1px 20px;
	max-width: 1280px;
	box-sizing: border-box;
	
    font-family: "Open Sans", sans-serif;
`;

class HelpCenter extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			activeTab: "#kb",
			currentPage: ""
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

	render() {
		return (<HelpCenterContainer>
			<SubNavigation items={ this.items } activeTab={ this.state.activeTab } handler={ this.handler } />

			<div>
				<HelpCenterTabs items={ this.items } activeTab={ this.state.activeTab } />
			</div>
		</HelpCenterContainer> );
	}
}

export default HelpCenter;
