/* External dependencies */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* Internal dependencies */
import SiteName from "./SiteName";
import Image from "./Image";

/**
 * Renders a Preview component.
 *
 * @param {object} props The props.
 *
 * @returns {React.Element} The rendered element.
 */
const Preview = ( props ) => {
	return (
		<Fragment>
			<Image src={ props.src } alt={ props.alt } />
			<SiteName>{ props.siteName }</SiteName>
		</Fragment>
	);
};

Preview.propTypes = {
	siteName: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

Preview.defaultProps = {
	alt: "",
};

export default Preview;
