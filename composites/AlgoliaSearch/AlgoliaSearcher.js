import React from "react";
import initAlgoliaSearch from "algoliasearch";
import isUndefined from "lodash/isUndefined";
import a11ySpeak from "a11y-speak";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loading from "./Loading";
import SearchBar from "./SearchBar";
import SearchResultDetail from "./SearchResultDetail";
import SearchResults from "./SearchResults";

const AlgoliaSearchWrapper = styled.div`
	width: 80%;
	margin: 0 auto 20px auto;
	box-sizing: border-box;
`;

class AlgoliaSearcher extends React.Component {

	/**
	 * AlgoliaSearcher constructor.
	 *
	 * @constructor
	 * @param {object} props Properties of the AlgoliaSearcher component.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			searchString: "",
			searching: false,
			results: [],
			errorMessage: "",
			usedQueries: {},
			currentDetailViewIndex: -1,
		};

		this.initAlgoliaClient();
	}

	/**
	 * Initializes the algolia client and index variables.
	 *
	 * @returns {void}
	 */
	initAlgoliaClient() {
		this.client = initAlgoliaSearch( this.props.algoliaApplicationId, this.props.algoliaApiKey );
		this.index = this.client.initIndex( this.props.algoliaIndexName );
	}

	/**
	 * Handles the form submit event. Stores the search string and performs a search.
	 *
	 * @param {object} clickEvent The React SyntheticEvent.
	 *
	 * @returns {void}
	 */
	searchButtonClicked( clickEvent ) {
		let searchString = clickEvent.target.value;

		if ( searchString === "" ) {
			return;
		}

		// Updating the state will re-render the whole component.
		this.setState( {
			searchString,
			usedQueries: this.addUsedQuery( searchString ),
			searching: true,
		}, this.updateSearchResults );
	}

	/**
	 * Adds a search string to the list of used queries.
	 *
	 * @param {string} searchString The search string that was used in the last search.
	 *
	 * @returns {Object} The usedQueries state object.
	 */
	addUsedQuery( searchString ) {
		let usedQueries = this.state.usedQueries;

		if ( isUndefined( usedQueries[ searchString ] ) ) {
			usedQueries[ searchString ] = {};
		}

		return usedQueries;
	}

	/**
	 * Processes the passed search error.
	 *
	 * @param {object} error The search error to process.
	 *
	 * @returns {void}
	 */
	processSearchError( error ) {
		this.setState( {
			errorMessage: error.message,
			searching: false,
		} );
	}

	/**
	 * Processes the search results.
	 *
	 * @param {object} results The results to process.
	 *
	 * @returns {void}
	 */
	processResults( results ) {
		this.setState( {
			results: results,
			errorMessage: "",
			searching: false,
		} );
	}

	/**
	 * Performs a search with the search string saved in the state.
	 *
	 * @returns {void}
	 */
	updateSearchResults() {
		this.setState( { searching: true } );

		this.performSearch( this.state.searchString )
		    .then( this.processResults.bind( this ) )
		    .catch( this.processSearchError.bind( this ) );
	}

	/**
	 * Performs a search with the given search string withing the Algolia index.
	 *
	 * @param {string} searchString The words or sentence to get the results for.
	 *
	 * @returns {Promise} The promise that is performing the search.
	 */
	performSearch( searchString ) {
		return new Promise( ( resolve, reject ) => {
			this.index.search( searchString, ( err, data ) => {
				if ( err ) {
					reject( err );
					return;
				}

				resolve( data.hits );
			} );
		} );
	}

	/**
	 * Adds the data from the clicked result to the information associated with the current search string.
	 *
	 * @param {integer} currentDetailViewIndex The current detail view index.
	 *
	 * @returns {Object} Object containing the currently used queries with additional post data.
	 */
	addResultToUsedQueries( currentDetailViewIndex ) {
		let post = this.state.results[ currentDetailViewIndex ];
		let usedQueries = this.state.usedQueries;

		usedQueries[ this.state.searchString ][ post.objectID ] = {
			title: post.post_title,
			link: post.permalink,
		};

		return usedQueries;
	}

	/**
	 * Sets all values required to display the detailed view of a search result.
	 *
	 * @param {number} currentDetailViewIndex The index of the article you want to show in the state.results array.
	 *
	 * @returns {void}
	 */
	setCurrentDetailedViewIndex( currentDetailViewIndex ) {
		let usedQueries = this.addResultToUsedQueries( currentDetailViewIndex );

		this.setState( { currentDetailViewIndex, usedQueries } );
	}

	/**
	 * Resets the values associated with the displaying of the detailed search result view.
	 *
	 * @returns {void}
	 */
	unsetCurrentDetailedView() {
		this.setState( { currentDetailViewIndex: -1 } );
	}

	/**
	 * Log any occuring error and render a search error warning.
	 *
	 * @param {string} errorMessage The message to display.
	 *
	 * @returns {ReactElement} A p tag with a warning that the search was not completed.
	 */
	renderError( errorMessage ) {
		console.error( errorMessage );
		a11ySpeak( this.props.errorMessage );

		return ( <p>{ this.props.errorMessage }</p> );
	}

	/**
	 * Creates the Search Bar component.
	 *
	 * @returns {ReactElement|string} Searchbar component. Returns empty string if we're in the detail view.
	 */
	createSearchBar() {
		if ( this.state.currentDetailViewIndex !== -1 ) {
			return "";
		}

		return <SearchBar
			headingText={ this.props.headingText }
			submitAction={ this.searchButtonClicked.bind( this ) }
			searchString={ this.state.searchString }
			searchButtonText={ this.props.searchButtonText }
		/>;
	}

	/**
	 * Gets the current error message if it is set in the state.
	 *
	 * @returns {ReactElement|string} Returns a rendered error object if an error is set. Defaults to empty string.
	 */
	getErrorMessage() {
		if ( this.state.errorMessage ) {
			return this.renderError( this.state.errorMessage );
		}

		return "";
	}

	/**
	 * Gets the loading indicator.
	 *
	 * @returns {ReactElement|string} Returns a loader if the loading state is active. Defaults to empty string.
	 */
	getLoadingIndicator() {
		if ( this.state.searching ) {
			return <Loading placeholder={ this.props.loadingPlaceholder } />;
		}

		return "";
	}

	/**
	 * Determines what the search results view needs to look like.
	 *
	 * @returns {ReactElement|string} Returns a specific search result object based on state. Defaults to empty string.
	 */
	determineSearchResultsView() {
		// Show the list of search results if the postId for the detail view isn't set.
		if ( this.state.currentDetailViewIndex === -1 ) {
			return <SearchResults
				{ ...this.props }
				searchString={this.state.searchString}
				results={ this.state.results }
				handler={ this.setCurrentDetailedViewIndex.bind( this ) }
			/>
		}

		if ( this.state.currentDetailViewIndex !== -1 ) {
			return <SearchResultDetail
				{ ...this.props }
				post={ this.getPostFromResults( this.state.currentDetailViewIndex ) }
				onClick={ this.unsetCurrentDetailedView.bind( this ) }
			/>;
		}

		return "";
	}

	/**
	 * Gets a specific post from the list of results.
	 *
	 * @param {integer} index The index of the post to retrieve.
	 *
	 * @returns {Object} The post object associated with the index.
	 */
	getPostFromResults( index ) {
		return this.state.results[ index ];
	}

	/**
	 * Render the React component.
	 *
	 * Called upon each state change. Determines and renders the view to render.
	 *
	 * @returns {ReactElement} The content of the component.
	 */
	render() {
		return (
			<AlgoliaSearchWrapper>
				{ this.createSearchBar() }
				{ this.getErrorMessage() }
				{ this.getLoadingIndicator() }
				{ this.determineResultsHeading() }
				{ this.determineSearchResultsView() }
			</AlgoliaSearchWrapper>
		);
	}

	/**
	 * Determines whether a search result heading should be created or not.
	 *
	 * @returns {ReactElement|string} Returns a header if there are search results. Otherwise returns an empty string.
	 */
	determineResultsHeading() {
		if ( this.state.currentDetailViewIndex === -1 || this.state.results.length === 0 ) {
			return "";
		}

		return <h2 className="screen-reader-text">{this.props.searchResultsHeading}</h2>;
	}
}

AlgoliaSearcher.propTypes = {
	foundResultsText: PropTypes.string,
	noResultsText: PropTypes.string,
	headingText: PropTypes.string,
	searchButtonText: PropTypes.string,
	searchResultsHeading: PropTypes.string,
	iframeTitle: PropTypes.string,
	algoliaApplicationId: PropTypes.string.isRequired,
	algoliaApiKey: PropTypes.string.isRequired,
	algoliaIndexName: PropTypes.string.isRequired,
	errorMessage: PropTypes.string.isRequired,
	loadingPlaceholder: PropTypes.string.isRequired,
	open: PropTypes.string.isRequired,
	openLabel: PropTypes.string.isRequired,
	back: PropTypes.string.isRequired,
	backLabel: PropTypes.string.isRequired,
};

AlgoliaSearcher.defaultProps = {
	foundResultsText: "Number of search results: %d",
	noResultsText: "No results found.",
	headingText: "Search the Yoast knowledge base",
	searchButtonText: "Search",
	searchResultsHeading: "Search results",
	iframeTitle: "Knowledge base article",
	algoliaApplicationId: "RC8G2UCWJK",
	algoliaApiKey: "459903434a7963f83e7d4cd9bfe89c0d",
	algoliaIndexName: "knowledge_base_all",
	errorMessage: "Something went wrong. Please try again later.",
	loadingPlaceholder: "Loading...",
	back: "Back",
	backLabel: "Back to search results",
	open: "Open",
	openLabel: "Open the knowledge base article in a new window or read it in the iframe below",
};

export default AlgoliaSearcher;
