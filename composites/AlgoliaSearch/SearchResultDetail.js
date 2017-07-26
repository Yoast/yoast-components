/**
 * Create the JSX to render a single searchresult.
 *
 * @param {object} props The React props.
 * @returns {ReactElement} A list item with a single search result.
 * @constructor
 */
import React from "react";
import ArticleContent from "./ArticleContent";
import styled from "styled-components";

const Detail = styled.section``;

const BackButton = styled.button`
	display: inline-block;
    text-decoration: none;
    font-size: 13px;
    line-height: 26px;
    height: 28px;
    margin: 0;
    padding: 0 10px 1px;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    white-space: nowrap;
    box-sizing: border-box;
`;

const OpenLink = styled.a`
	display: inline-block;
    text-decoration: none;
    font-size: 13px;
    line-height: 26px;
    height: 28px;
    margin: 0;
    padding: 0 10px 1px;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    white-space: nowrap;
    box-sizing: border-box;
`;

class SearchResultDetail extends React.Component {

	createNavigation() {
		return (
			<nav>
				<BackButton aria-label={ this.props.backLabel } onClick={ this.props.onClick }>
					{ this.props.back }
				</BackButton>

				<OpenLink href={ this.props.post.permalink } aria-label={ this.props.openLabel } target="_blank">
					{ this.props.open }
				</OpenLink>
			</nav>
		);
	}

	render() {
		return (
			<Detail>
				{ this.createNavigation() }

				<ArticleContent permalink={ this.props.post.permalink } title={this.props.iframeTitle}/>
			</Detail>
		);
	}
};

SearchResultDetail.propTypes = {
	post: React.PropTypes.object,
	showDetail: React.PropTypes.func,
};

export default SearchResultDetail;
