import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";
import searchIcon from "../../icons/search.svg";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import _debounce from "lodash/debounce";

const messages = defineMessages( {
	searchLabel: {
		id: "search.label",
		defaultMessage: "Search",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
} );

const SearchLabelText = styled.span``;

const SearchLabel = styled.label`
	background-image: url( ${ searchIcon } );
	background-size: 25px;
	background-position: left center;
	background-repeat: no-repeat;
	width: 2em;
	height: 2em;
	float: left;
	
	margin-top: 0.25em;
`;

SearchLabel.propTypes = {
	className: PropTypes.string,
	htmlFor: PropTypes.string,
};

SearchLabel.defaultProps = {
	className: "",
	htmlFor: "",
};


const SearchBarWrapper = styled.div`
	width: 100%;
`;

const SearchBarInput = styled.input`
	box-sizing: border-box;
	height: 1em;
	width: calc(100% - 2em);
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${colors.$color_grey_light};
	padding: 20px;
	border: 0;
	font-size: 1em;
	float: left;
`;

const SearchHeading = styled.h2`
	font-size: 1em;
	margin: 0.5em 0;
`;

/**
 * Create the JSX to render the search bar.
 *
 * @param {object} props The React props.
 * @returns {ReactElement} A div with the searchbar.
 * @constructor
 */
class SearchBar extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			doRequest: false,
		};

		this.doSubmit = _debounce( () => {
			this.setState( { doRequest: true } );
		}, 1000 );
	}

	componentWillMount() {
		this.doFormSubmission = _debounce( ( event ) => {
			this.props.submitAction( event );
		}, 1000 );
	}

	componentWillUnmount() {
		this.doSubmit.cancel();
	}



	onSearchChange( event ) {
		event.persist();
		this.doFormSubmission( event );


//		const value = event.target.value;
//
//		if ( value !== "" ) {
//			this.setState( { doRequest: true } )
//		}
//
//		if ( this.state.doRequest ) {
//			this.props.submitAction( event );
//		}
//
//		this.cancelRequest();
	}

	cancelRequest() {
		this.setState( { doRequest: false }, () => {
			this.doSubmit.cancel();
		} );
	}

	render() {
		return (
			<SearchBarWrapper role="search">
				<SearchHeading>{ this.props.headingText }</SearchHeading>
				<form style={{display: "block"}}>
					<SearchLabel htmlFor="search-input">
						<SearchLabelText className="screen-reader-text">
							{ this.props.headingText ? this.props.headingText : props.intl.formatMessage( messages.searchLabel ) }
						</SearchLabelText>
					</SearchLabel>

					<SearchBarInput
						onChange={ this.onSearchChange.bind( this ) }
						type="text"
						name="search-input"
						id="search-input"
						defaultValue={ this.props.searchString }
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
					/>
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
