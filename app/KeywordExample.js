// External dependencies.
import React, { Component } from "react";
import styled from "styled-components";

// Internal dependencies.
import KeywordInput from "../composites/Plugin/Shared/components/KeywordInput";
import HelpText from "../composites/Plugin/Shared/components/HelpText.js";
import { makeOutboundLink } from "../utils/makeOutboundLink";
import SynonymsInput from "../composites/Plugin/Shared/components/SynonymsInput";

const HelpTextLink = makeOutboundLink();

const Container = styled.div`
	background-color: white;
	margin: 5em auto 0;
	padding: 10px;
	display: flex;
	flex-direction: column;
	width: 248px;
`;

export default class KeywordExample extends Component {

	/**
	 * Constructs a keywordInput example.
	 *
	 * @param {Object} props The props for the snippet preview example.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			keyword: "special",
			synonyms: "",
		};

		this.updateKeyword = this.updateKeyword.bind( this );
		this.updateSynonyms = this.updateSynonyms.bind( this );
		this.updateSynonymsInput = this.updateSynonymsInput.bind( this );
	}

	/**
	 * Updates the keyword.
	 *
	 * @param {string} newKeyword The new keyword.
	 *
	 * @returns {void}
	 */
	updateKeyword( newKeyword ) {
		this.setState( {
			keyword: newKeyword,
		} );
	}

	/**
	 * Updates the synonyms.
	 *
	 * @param {string} newSynonyms The new synonyms.
	 *
	 * @returns {void}
	 */
	updateSynonyms( newSynonyms ) {
		this.setState( {
			synonyms: newSynonyms,
		} );
	}

	/**
	 * Updates the synonyms.
	 *
	 * @param {object} event The new synonyms.
	 *
	 * @returns {void}
	 */
	updateSynonymsInput( event ) {
		this.setState( {
			synonyms: event.target.value,
		} );
	}

	/**
	 * Renders an example of how to use the keyword input.
	 *
	 * @returns {ReactElement} The rendered keyword input.
	 */
	render() {
		return (
			<Container>
				<HelpText text={ [
					"Enter the search term you'd like this post to be found with and see how it would rank. ",
					<HelpTextLink key="1" href="https://yoa.st/">
						Learn more about the Content Analysis Tool.
					</HelpTextLink>,
				] }/>
				<KeywordInput
					id="focus-keyword"
					label={ "Focus keyword"}
					onChange={ this.updateKeyword }
					keyword={ this.state.keyword }
					onRemoveKeyword={ () => {
						console.log( "CLOSED!" );
					} }
				/>
				<SynonymsInput
					showLabel={ true }
					label={ "Synonyms:" }
					onChange={ this.updateSynonymsInput }
					value={ this.state.synonyms }
					explanationText={ "This is a fine explanation" }
				/>
			</Container>
		);
	}
}
