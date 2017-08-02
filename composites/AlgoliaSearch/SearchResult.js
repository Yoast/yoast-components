import React from "react";
import { Row } from "../../basic/Table/Row";
import styled from "styled-components";
import colors from "../../style-guide/colors.json";

const SearchResultTitle = styled.h3`
	padding: 10px;
	margin: 0;
	font-size: 1em;
	font-weight: normal;
`;

const SearchResultLink = styled.a`
	color: ${ colors.$color_black };
	
	&:hover, &:focus {
		color: ${ colors.$color_purple };
	}
`;

/**
 * Create the JSX to render a single searchresult.
 *
 * @param {object} props The React props.
 * @returns {ReactElement} A list item with a single search result.
 * @constructor
 */
class SearchResult extends React.Component {

	/**
	 * Renders a single list item.
	 *
	 * @returns {ReactElement} The list item component.
	 */
	render() {
		let post = this.props.post;
		let description = post.excerpt || post.metadesc;

		return (
			<Row {...this.props}>
				<SearchResultLink href={ post.permalink } onClick={ this.props.handler }>
					<div>
						<SearchResultTitle>{ post.post_title }</SearchResultTitle>
						{ description && <p>{ description }</p> }
					</div>
				</SearchResultLink>
			</Row>
		);
	}

};

SearchResult.propTypes = {
	post: React.PropTypes.object,
	showDetail: React.PropTypes.func,
};

export default SearchResult;
