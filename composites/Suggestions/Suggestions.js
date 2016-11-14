import React from "react";
import Suggestion from "../Suggestions/composites/Suggestion";
import Clipboard from "../../node_modules/clipboard/dist/clipboard";

/**
 * Represents the Suggestions component.
 */
class Suggestions extends React.Component {

	/**
	 * @constructor
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.state = {
			clipboard: new Clipboard( ".suggestion__copy" ),
		};
	}

	/**
	 * Renders the suggestions.
	 *
	 * @returns {JSX} The rendered suggestions HTML.
	 */
	render() {
		let suggestions = this.props.suggestions;

		return (
			<div>
				{suggestions.map( ( suggestion, key ) => <Suggestion key={key} {...suggestion} /> )}
			</div>
		);
	}

}


Suggestions.propTypes = {
	suggestions: React.PropTypes.array.isRequired,
};

export default Suggestions;
