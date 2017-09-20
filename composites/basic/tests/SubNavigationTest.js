import React from "react";
import renderer from "react-test-renderer";

import SubNavigation from "../SubNavigation.js";

let items = [
	{ id: "tab1", label: "tab1", url: "http://localhost:3333/tab1", view: <p>This is some content for tab 1</p> },
	{ id: "tab2", label: "tab2", url: "http://localhost:3333/tab2", view: <p>This is some content for tab 2</p> },
	{ id: "tab3", label: "tab3", url: "http://localhost:3333/tab3", view: <p>This is some content for tab 3</p> },
];

test( "the SubNavigation matches the snapshot", () => {
	const component = renderer.create(
		<SubNavigation items={ items } activeTab="http://localhost:3333/tab1"/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
