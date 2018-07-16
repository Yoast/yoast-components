import React from "react";
import styled from "styled-components";

import SnippetEditor from "./SnippetEditor/components/SnippetEditor";
import ContentAnalysis from "./ContentAnalysis/components/ContentAnalysis";

const Paper = styled.div`
	background-color: white;
	margin: 5em auto 0;
	padding: 0 0 10px;
	width: 560px;
`;

/**
 * @param {object} props The properties of the rendered components.
 *
 * @returns {ReactElement} The ContentOptimizationContainer.js component.
 */
export default function ContentOptimizationContainer( props ) {
	const { snippetEditor, contentAnalysis } = props;

	return (
		<Paper>
			<SnippetEditor { ...snippetEditor } />
			<ContentAnalysis { ...contentAnalysis } />
		</Paper>
	);
}
