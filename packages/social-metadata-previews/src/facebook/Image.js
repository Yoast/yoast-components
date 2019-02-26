/* External dependencies */
import React from "react";
import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";

/* Internal dependencies */
import {
	determineFacebookImageProperties,
	LANDSCAPE_HEIGHT,
	LANDSCAPE_WIDTH,
	PORTRAIT_HEIGHT,
	PORTRAIT_WIDTH,
	SQUARE_HEIGHT,
	SQUARE_WIDTH,
} from "./helpers/determineFacebookImageProperties";
import PlaceholderImage from "./PlaceholderImage";
import ImageContainer from "./ImageContainer";
import StyledImage from "./StyledImage";
import ErrorImage from "./ErrorImage";

const MIN_IMAGE_WIDTH = 158;
const MIN_IMAGE_HEIGHT = 158;

/**
 * Renders the FacebookImage component.
 *
 * @param {string} src The image source.
 *
 * @returns {ReactComponent} The FacebookImage component.
 */
class Image extends React.Component {
	/**
	 * The constructor.
	 *
	 * @param {Object} props The component's props.
	 */
	constructor( props ) {
		super( props );
		this.state = {
			imageProperties: null,
			status: "loading",
		};
	}

	/**
	 * After the component did mount, determine the properties of the FacebookImage.
	 *
	 * @returns {Promise} Resolves when there are image properties.
	 */
	componentDidMount() {
		return determineFacebookImageProperties( this.props.src ).then( ( imageProperties ) => {
			this.setState( {
				imageProperties: imageProperties,
				status: "loaded",
			} );
		} ).catch( () => {
			this.setState( {
				imageProperties: null,
				status: "errored",
			} );
			return true;
		} );
	}

	/**
	 * Gets the dimensions for the Facebook image container.
	 *
	 * @param {string} imageMode The facebook image mode: either landscape, square or portrait.
	 *
	 * @returns {Object} The width and height for the container.
	 */
	getContainerDimensions( imageMode ) {
		switch ( imageMode ) {
			case "square":
				return {
					height: SQUARE_HEIGHT + "px",
					width: SQUARE_WIDTH + "px",
				};
			case "portrait":
				return {
					height: PORTRAIT_HEIGHT + "px",
					width: PORTRAIT_WIDTH + "px",
				};
			case "landscape":
			default:
				return {
					height: LANDSCAPE_HEIGHT + "px",
					width: LANDSCAPE_WIDTH + "px",
				};
		}
	}

	/**
	 * Renders the FacebookImage.
	 *
	 * @returns {ReactComponent} Either the ErrorImage component or the FacebookImageContainer.
	 */
	render() {
		const imageProperties = this.state.imageProperties;
		const status = this.state.status;

		if ( status === "loading" ) {
			return <PlaceholderImage />;
		}

		if ( status === "errored" ) {
			return <ErrorImage>{ __( "The given image url cannot be loaded", "yoast-components" ) }</ErrorImage>;
		}

		if ( imageProperties.height < MIN_IMAGE_HEIGHT || imageProperties.width < MIN_IMAGE_WIDTH ) {
			return <ErrorImage>{ __( "The image you selected is too small for Facebook", "yoast-components" ) }</ErrorImage>;
		}

		const containerDimensions = this.getContainerDimensions( imageProperties.mode );
		return <ImageContainer
			dimensions={ containerDimensions }
		>
			<StyledImage
				src={ this.props.src }
				alt={ this.props.alt }
				imageProperties={ imageProperties }
			/>
		</ImageContainer>;
	}
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

Image.defaultProps = {
	alt: "",
};

export default Image;
