jest.unmock( "../Label" );

import React from "react";
import TestUtils from "react-addons-test-utils";
import Label from "../Label";

describe( "A Label component", () => {
	var renderer = TestUtils.createRenderer();

	it( "generates a Label based on the props", () => {
		renderer.render( <Label for="">customLabel</Label> );

		let result = renderer.getRenderOutput();

		expect( result.props.children ).toBe( "customLabel" );
		expect( result.props.htmlFor ).toBe( "" );
	} );

	it( "generates a warning when a required prop `for` is missing", () => {
		console.error = jest.genMockFn();

		renderer.render( <Label></Label> );

		expect( console.error ).toBeCalled();
	} );

	it( "generates a warning when a faulty htmlFor prop is passed", () => {
		console.error = jest.genMockFn();

		renderer.render( <Label for={0} /> );

		expect( console.error ).toBeCalled();
	} );

	it( "generates a warning when a faulty onChange callback is passed", () => {
		console.error = jest.genMockFn();

		renderer.render( <Label name="customLabel" optionalAttributes={ { onClick: 0 } } /> );

		expect( console.error ).toBeCalled();
	} );
} );
