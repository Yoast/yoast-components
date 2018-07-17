import React from "react";
import styled from "styled-components";

import SnippetEditorExample from "../../app/SnippetEditorExample";
import ContentAnalysisWrapper from "../../app/ContentAnalysisWrapper";
import PropTypes from "prop-types";

const Paper = styled.div`
	background-color: white;
	margin: 5em auto 0;
	padding: 10px;
	width: 560px;
`;

/**
 * @param {object} props                     The properties of the rendered components.
 * @param {bool}   props.showSnippetEditor   Whether or not to show the Snippet editor.
 * @param {bool}   props.showContentAnalysis Whether or not to show the Content analysis.
 *
 * @returns {ReactElement} The ContentOptimizationContainer.js component.
 */
export default function ContentOptimizationContainer( props ) {
	const { showSnippetEditor, showContentAnalysis } = props;

	return (
		<Paper>
			{ showSnippetEditor && <SnippetEditorExample /> }
			{ showContentAnalysis && <ContentAnalysisWrapper /> }
		</Paper>
	);
}

ContentOptimizationContainer.propTypes = {
	showSnippetEditor: PropTypes.bool,
	showContentAnalysis: PropTypes.bool,
};

ContentOptimizationContainer.defaultProps = {
	showSnippetEditor: false,
	showContentAnalysis: false,
}
