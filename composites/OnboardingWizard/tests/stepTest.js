jest.unmock( "../Step" );

import React from "react";
import TestUtils from "react-addons-test-utils";
import Step from "../Step";

describe( "a step component", () => {
	let inputProps = {
		id: "",
		title: "Title",
		fields: {},
		components: {},
		currentStep: "",
	};

	let renderer = TestUtils.createRenderer();
	renderer.render( <Step {...inputProps} /> );

	let stepComponent = renderer.getRenderOutput();

	it( 'has div container with correct id', () => {
		expect( stepComponent.type ).toEqual( 'div' );
		expect( stepComponent.props.className ).toEqual( 'yoast-wizard--step--container' );
	} );

	it( "has a h1 header title", () => {
		let header = stepComponent.props.children[ 0 ];

		expect( header.type ).toEqual( 'h1' );
		expect( header.props.children ).toEqual( inputProps.title );
	} );

	it( "throws an error when required property title is missing", () => {
		console.error = jest.genMockFn();

		renderer.render( <Step /> );
		renderer.getRenderOutput();

		expect( console.error ).toBeCalled();
	} );

	it( "throws an error when property fields is not an object ", () => {
		console.error = jest.genMockFn();

		let inputProps = {
			fields: "",
			title: "Title",
		};

		renderer.render( <Step {...inputProps} /> );
		renderer.getRenderOutput();

		expect( console.error ).toBeCalled();
	} );

	it( "throws an error when property title is not a string", () => {
		console.error = jest.genMockFn();

		let inputProps = {
			title: 1,
		};

		renderer.render( <Step {...inputProps} /> );
		renderer.getRenderOutput();

		expect( console.error ).toBeCalled();
	} );

	it( "throws an error when property currentStep is not a string", () => {
		console.error = jest.genMockFn();

		let inputProps = {
			title: "Title",
			currentStep: false,
		};

		renderer.render( <Step {...inputProps} /> );
		renderer.getRenderOutput();

		expect( console.error ).toBeCalled();
	} );
} );
