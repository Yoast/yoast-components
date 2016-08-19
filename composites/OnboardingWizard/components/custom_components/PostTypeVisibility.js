import React from "react";

/**
 * Represents a post type visibility component.
 *
 * @param {Object} props The properties for the object.
 * @returns {JSX} The post type visibility component.
 * @constructor
 */
const PostTypeVisibility = ( props ) => {
	return (
		<div>
			<h2>{props.properties.label}</h2>
		</div>
	);
};

PostTypeVisibility.propTypes = {
	component: React.PropTypes.string,
	properties: React.PropTypes.object,
	data: React.PropTypes.string,
};

PostTypeVisibility.defaultProps = {
	component: "",
	properties: {},
	data: "",
};

export default PostTypeVisibility;
