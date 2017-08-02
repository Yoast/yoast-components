import React from "react";
import PropTypes from "prop-types";
import a11ySpeak from "a11y-speak";
import styled from "styled-components";
import { ZebrafiedTable } from "../../basic/Table/ListTable";
import { Row } from "../../basic/Table/Row";
import colors from "../../style-guide/colors.json";

/**
 * The title of the search result item.
 */
const SearchResultTitle = styled.h3`
	padding: 10px;
	margin: 0;
	font-size: 1em;
	font-weight: normal;
`;

/**
 * The link to the search result.
 */
const SearchResultLink = styled.a`
	color: ${ colors.$color_black };
	
	&:hover, &:focus {
		color: ${ colors.$color_pink_dark };
	}
`;

/**
 * Returns a single search result item.
 *
 * @returns {ReactElement} The rendered search result.
 */
export function SearchResult( props ) {
	let post = props.post;
	let description = post.excerpt || post.metadesc;

	return (
		<Row {...props}>
			<SearchResultLink href={ post.permalink } onClick={ props.handler }>
				<div>
					<SearchResultTitle>{ post.post_title }</SearchResultTitle>
					{ description && <p>{ description }</p> }
				</div>
			</SearchResultLink>
		</Row>
	);
}

/**
 * Wraps the search results.
 */
const SearchResultsWrapper = styled.div`
	margin-top: 20px;
	width: 100%;
	display: block;
	clear: both;
`;

/**
 * Create the JSX to render a list of search results.
 *
 * @param {object} props The React props.
 *
 * @returns {ReactElement} A list of search results.
 * @constructor
 */
class SearchResults extends React.Component {

	constructor( props ) {
		super( props );

		this.state
	}

	/**
	 * Handles the situation that there are zero results.
	 *
	 * @returns {ReactElement|null} A message stating that no results were found or null if no search term was provided.
	 */
	handleZeroResults() {
		if ( this.props.searchString !== "" ) {
			return this.renderNoResultsFound();
		}

		return null;
	}

	/**
	 * Renders a no results found text.
	 *
	 * @returns {ReactElement} The no results found text.
	 */
	renderNoResultsFound() {
		a11ySpeak( this.props.noResultsText );

		return ( <p>{ this.props.noResultsText }</p> );
	}

	/**
	 * Maps the results to SearchResult components.
	 *
	 * @param {Object} results The results returned by Algolia.
	 *
	 * @returns {Array} Array containing the mapped search results.
	 */
	resultsToSearchItem( results ) {
		return results.map( ( result, index ) => {
			return <SearchResult
				key={ result.objectID }
				post={ result }
				handler={ ( event ) => {
					event.preventDefault();
					this.props.handler( index );
				} }
			/>;
		} );
	}

	/**
	 * Renders the search results list.
	 *
	 * @returns {ReactElement|null} A div with either the search results, or a div with a message that no results were found.
	 */
	render() {
		let resultsCount = this.props.results.length;

		console.log( this.props.results.length );

		// We'll check to see whether no results are returned.
		if ( resultsCount <= 0 ) {
			return this.handleZeroResults();
		}

		a11ySpeak( this.props.foundResultsText.replace( "%d", resultsCount ) );

		return (
			<SearchResultsWrapper>
				<ZebrafiedTable>
					{ this.resultsToSearchItem( this.props.results ) }
				</ZebrafiedTable>
			</SearchResultsWrapper>
		);
	}

};

SearchResults.propTypes = {
	post: PropTypes.object,
	showDetail: PropTypes.func,
};

export default SearchResults;
