import React from "react";
import styled from "styled-components";

import SubNavigation from "../../../basic/SubNavigation";
import PreviousTabs from "../../../basic/Tabs";
import YoastTabs from "../../../basic/YoastTabs";

export const ContentAnalysisContainer = styled.div`
	min-height: 700px;
	padding: 40px;
	background-color: white;
`;

let items = [
	{
		id: "tab1",
		label: "tab1",
		url: "http://localhost:3333/tab1",
		view: <p>This is some content for tab 1. <a href="#">focusable element 1</a></p>,
	},
	{
		id: "tab2",
		label: "tab2",
		url: "http://localhost:3333/tab2",
		view: <p>This is some content for tab 2. <a href="#">focusable element 2</a></p>,
	},
	{
		id: "tab3",
		label: "tab3",
		url: "http://localhost:3333/tab3",
		view: <p>This is some content for tab 3. <a href="#">focusable element 3</a></p>,
	},
];

/**
 * Returns the ContentAnalysis component.
 *
 * @returns {ReactElement} The ContentAnalysis component.
 */
export default function ContentAnalysis() {
	return <ContentAnalysisContainer>
		<h1>Tabs experiments</h1>
		<h2>Previous implementation</h2>
		<SubNavigation items={ items } activeTab="http://localhost:3333/tab1" onClick={ () => {} } />
		<PreviousTabs items={ items } activeTab="http://localhost:3333/tab1" />
		<h2>Using "react-tabs"</h2>
		<YoastTabs items={ items } />
	</ContentAnalysisContainer>;
}
