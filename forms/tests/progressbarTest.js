jest.unmock( "../Progressbar" );

import React from "react";
import TestUtils from "react-addons-test-utils";
import Progressbar from "../Progressbar";

describe( "A Progressbar component", () => {
	var renderer = TestUtils.createRenderer();

	it( "generates a Progressbar based on the props", () => {
		renderer.render( <Progressbar name="customProgressbar" value={0} /> );

		let result = renderer.getRenderOutput();

		expect( result.props.name ).toBe( "customProgressbar" );
		expect( result.props.value ).toBe( 0 );
	} );

	it( "generates an input based on the defaults if required props are missing", () => {
		console.error = jest.genMockFn();

		renderer.render( <Progressbar /> );

		expect( console.error ).toBeCalled();
	} );

	it( "generates a warning when a faulty value is passed", () => {
		console.error = jest.genMockFn();

		renderer.render( <Progressbar value="0" /> );

		expect( console.error ).toBeCalled();
	} );

	it( "generates a warning when a faulty onChange callback is passed", () => {
		console.error = jest.genMockFn();

		renderer.render( <Progressbar name="customProgressbar" onChange={0} /> );

		expect( console.error ).toBeCalled();
	} );

	it( "generates a progressbar based on the defaults and additional, optional attributes", () => {
		let optionalAttributes = {
			className: "custom-progress-class",
			id: "custom-progress-identifier",
		};

		renderer.render( <Progressbar name="customProgressbar" optionalAttributes={optionalAttributes} /> );

		let result = renderer.getRenderOutput();

		expect( result.props.className ).toBe( "custom-progress-class" );
		expect( result.props.id ).toBe( "custom-progress-identifier" );
	} );

	it( "generates a fallback progressbar", () => {
		renderer.render( <Progressbar value={10} max={100} forceFallback={true} name="customProgressbar" /> );

		let result = renderer.getRenderOutput();

		expect( result.type ).toBe( "div" );
		expect( result.props.style.width ).toBe( "10%" );
	} );
} );
