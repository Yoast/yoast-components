import React from "react";
import renderer from "react-test-renderer";

import Tabs from "../Tabs.js";

let items = [
	{ id: "tab1", url: "http://example.com/tab1", view: <p>This is some content</p> },
	{ id: "tab2", url: "http://example.com/tab2", view: <p>This is some content</p> },
	{ id: "tab3", url: "http://example.com/tab3", view: <p>This is some content</p> },
];

test( "the SubNavigation with active first tab matches the snapshot", () => {
	const component = renderer.create(
	<Tabs items={ items } activeTab="http://example.com/tab1"/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
