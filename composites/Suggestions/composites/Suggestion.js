import React from "react";

/**
 *  Represents a suggestion component with a copy url to clipboard icon and a text value.
 *
 * @param {Object} props       The properties to use.
 * @param {string} props.value The text value.
 * @param {string} props.url   The URL.
 * @returns {JSX} The rendered suggestion.
 * @constructor
 */
const Suggestion = ( props ) => {
	return (
		<div className="suggestion" >
		<button className="suggestion__copy" data-clipboard-text={props.url} aria-label="Copy to clipboard" />
		<span className="screen-reader-text">Copy to clipboard</span>
		<a href={props.url} className="suggestion__value" target="_blank">{props.value}</a>
		</div>
	);
};

Suggestion.propTypes = {
	value: React.PropTypes.string,
	url: React.PropTypes.string,
};

export default Suggestion;
