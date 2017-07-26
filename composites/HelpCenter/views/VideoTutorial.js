import React from "react";
import styled from "styled-components";
import YouTubeVideo from "../../basic/YouTubeVideo";
import PropTypes from "prop-types";

const Section = styled.section`
	display: flex;
	padding: 1em;
`;

const VideoTutorialPlaceholder = styled( Section )`
	flex-wrap: wrap;
	background: red;
`;

const VideoTextPanel = styled( Section )`
	min-width: 220px;
	max-width: 550px;
	flex: 50% 0;
`;

const StyledYouTubeVideo = styled( YouTubeVideo )`
	flex: 50% 0;
`;

class VideoTutorial extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<VideoTutorialPlaceholder>
				<StyledYouTubeVideo	src={ this.props.src } title={ this.props.title } />
				<VideoTextPanel>
					Some text
				</VideoTextPanel>
			</VideoTutorialPlaceholder>
		);
	}
}

VideoTutorial.propTypes = {
	src: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default VideoTutorial;
