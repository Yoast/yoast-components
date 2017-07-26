import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
	width: 100%;
`;

const SearchBarInput = styled.input`
	box-sizing: border-box;
	height: 1em;
	width: 100%;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: #ddd;
	padding: 20px;
	border: 0;
	font-size: 1em;
`;

const SearchHeading = styled.h2`
	font-size: 1em;
`;

/**
 * Create the JSX to render the search bar.
 *
 * @param {object} props The React props.
 * @returns {ReactElement} A div with the searchbar.
 * @constructor
 */
class SearchBar extends React.Component {
	handleSubmission( submitEvent ) {
		submitEvent.preventDefault();

		this.props.submitAction( submitEvent );
	}

	render() {
		return (
			<SearchBarWrapper role="search">
				<SearchHeading>{ this.props.headingText }</SearchHeading>
				<form onSubmit={ ( submitEvent ) => this.handleSubmission( submitEvent ) }>
					<label htmlFor="search-input" className="screen-reader-text">{ this.props.headingText }</label>
					<SearchBarInput type="text" name="search-input" id="search-input" defaultValue={ this.props.searchString }/>
					{/*<button type="submit">{ this.props.searchButtonText }</button>*/}
				</form>
			</SearchBarWrapper>
		);
	}
}

SearchBar.propTypes = {
	headingText: PropTypes.string,
	searchButtonText: PropTypes.string,
	searchString: PropTypes.string,
	submitAction: PropTypes.func,
};

SearchBar.defaultProps = {
	headingText: "Search the Yoast knowledge base",
	searchButtonText: "Search",
};

export default SearchBar;
