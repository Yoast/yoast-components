import React from "react";
import IFrame from "../../basic/IFrame";
import PropTypes from "prop-types";

/**
 * Creates the JSX to render the content of the selected article.
 *
 * @param {object} props The React props.
 * @returns {ReactElement} An iframe with the content of the selected article.
 * @constructor
 */

class ArticleContent extends React.Component {
	constructor( props ) {
		super( props );
	}

	toAmp( originalUrl ) {
		return `${ originalUrl }amp?source=wpseo-kb-search`;
	}

	render() {
		return ( <IFrame src={ this.toAmp( this.props.permalink ) } className="kb-search-content-frame" title={ this.props.title } /> );
	}
}

ArticleContent.propTypes = {
	permalink: PropTypes.string.isRequired,
	title: PropTypes.string,
};

ArticleContent.defaultProps = {
	title: "Knowledge base article",
};

export default ArticleContent;
