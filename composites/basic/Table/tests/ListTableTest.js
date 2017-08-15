import React from "react";
import renderer from "react-test-renderer";

import { ListTable, ZebrafiedListTable } from "../../Table/ListTable";

test( "the ListTable component matches the snapshot", () => {
	const component = renderer.create(
		<ListTable/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the ZebrafiedListTable component with one child matches the snapshot", () => {
	const component = renderer.create(
		<ZebrafiedListTable>
			<li/>
		</ZebrafiedListTable>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the ZebrafiedListTable component with multiple children matches the snapshot", () => {
	const component = renderer.create(
		<ZebrafiedListTable>
			<li/>
			<li/>
		</ZebrafiedListTable>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
