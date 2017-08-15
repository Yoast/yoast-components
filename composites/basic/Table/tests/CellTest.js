import React from "react";
import renderer from "react-test-renderer";

import { CellPrimary, CellFixedWidth, CellMinWidth, CellIcon, responsiveHeaders } from "../../Table/Cell";

test( "the CellPrimary component matches the snapshot", () => {
	const component = renderer.create(
		<CellPrimary headerLabel="PrimaryCell">
			This is a primary cell
		</CellPrimary>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the CellFixedWidth component matches the snapshot", () => {
	const component = renderer.create(
		<CellFixedWidth headerLabel="FixedWidthCell">
			This is a cell with a fixed width
		</CellFixedWidth>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the CellMinWidth component matches the snapshot", () => {
	const component = renderer.create(
		<CellMinWidth headerLabel="MinWidthCell">
			This is a call with a min width
		</CellMinWidth>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the CellIcon component matches the snapshot", () => {
	const component = renderer.create(
		<CellIcon headerLabel="IconCell">
			Icon
		</CellIcon>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the CellPrimary with responsiveHeaders matches the snapshot", () => {
	let CellPrimaryResponsive = responsiveHeaders( CellPrimary );
	const component = renderer.create(
		<CellPrimaryResponsive headerLabel="responsiveHeaders">
			This is a primary cell with responsive headers
		</CellPrimaryResponsive>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
