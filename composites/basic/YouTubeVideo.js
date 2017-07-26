import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IFrame from "../../basic/IFrame";

const StyledIFrame = styled(IFrame)`
`;

class YouTubeVideo extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<StyledIFrame
				width={ this.props.width }
				height={ this.props.height }
				src={ this.props.src }
				title={ this.props.title }
			    frameBorder={ this.props.frameBorder }
			    allowFullScreen={ this.props.allowFullScreen }
			/>
		);
	}
}

YouTubeVideo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	src: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	frameBorder: PropTypes.number,
	allowFullScreen: PropTypes.bool,
};

YouTubeVideo.defaultProps = {
	width: 560,
	height: 315,
	frameBorder: 0,
	allowFullScreen: true,
};

export default YouTubeVideo;
