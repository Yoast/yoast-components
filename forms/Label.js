import React from "react";
import htmlDecoder from "../composites/OnboardingWizard/helpers/htmlDecoder";

/**
 * Represents the label HTML tag.
 *
 * @param {Object} props The properties to use.
 * @returns {JSX} A representation of the label HTML element based on the passed props.
 * @constructor
 */
const Label = ( props ) => {
	/**
	 * Check if the label should contain a string or JSX.Elements
	 * and converts the HTML entities if it is a string.
	 *
	 * @param {string|JSX.Element} children The children(inner elements) for the label.
	 *
	 * @returns {string|JSX.Element} String with converted HTML entities
	 *                                or the unconverted JSX.Element(s).
	 */
	let decodeText = function( children ) {
		if ( typeof children === "string" ) {
			return htmlDecoder( children );
		}
		return children;
	};
	let innerElements = decodeText( props.children );

	return (
		<label htmlFor={props.for} {...props.optionalAttributes}>{innerElements}</label>
	);
};

/**
 * Adds validation for the properties.
 *
 * @type {{for: string, optionalAttributes.onClick: function, optionalAttributes.className: string, children: * }}
 */
Label.propTypes = {
	"for": React.PropTypes.string.isRequired,
	optionalAttributes: React.PropTypes.shape( {
		onClick: React.PropTypes.func,
		className: React.PropTypes.string,
	} ),
	children: React.PropTypes.any.isRequired,
};

/**
 * Defines the default values for the properties.
 *
 * @type {{for: string, text: string}}
 */
Label.defaultProps = {
	htmlFor: "",
};

export default Label;
