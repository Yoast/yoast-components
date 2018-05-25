import { serializeEditor, unserializeEditor, getEntityCountFromRawEditorState } from "../serialization";

const TAGS = [
	{ name: "title", value: "Title" },
	{ name: "post_type", value: "Gallery" },
];


describe( "editor serialization", () => {
	it( "transforms the deep structure to a plain string", () => {
		const structure = {
			blocks: [ {
				key: "f4sem",
				text: "title post_type test123 fa",
				type: "unstyled",
				depth: 0,
				inlineStyleRanges: [],
				entityRanges: [ {
					offset: 6,
					length: 9,
					key: 0,
				}, {
					offset: 0,
					length: 5,
					key: 1,
				} ],
				data: {},
			} ],
			entityMap: {
				0: {
					type: "%mention",
					mutability: "IMMUTABLE",
					data: { mention: { name: "post_type" } },
				},
				1: {
					type: "%mention",
					mutability: "IMMUTABLE",
					data: { mention: { name: "title" } },
				},
			},
		};
		const expected = "%%title%% %%post_type%% test123 fa";

		const actual = serializeEditor( structure );

		expect( actual ).toBe( expected );
	} );
} );

describe( "editor unserialization", () => {
	it( "transforms a string into a Draft.js editor structure", () => {
		const input = "%%title%% %%post_type%% test test123";
		const expected = {
			blocks: [ {
				key: "block",
				text: "title post_type test test123",
				entityRanges: [ {
					offset: 6,
					length: 9,
					key: 0,
				}, {
					offset: 0,
					length: 5,
					key: 1,
				} ],
			} ],
			entityMap: {
				0: {
					type: "%mention",
					mutability: "IMMUTABLE",
					data: { mention: { name: "post_type" } },
				},
				1: {
					type: "%mention",
					mutability: "IMMUTABLE",
					data: { mention: { name: "title" } },
				},
			},
		};

		const actual = unserializeEditor( input, TAGS );

		expect( actual ).toEqual( expected );
	} );

	it( "should be revertable with serialization", () => {
		const input = "The first thing, %%title%%, %%post_type%% type.";
		const expected = input;

		const actual = serializeEditor( unserializeEditor( input, TAGS ) );

		expect( actual ).toBe( expected );
	} );
} );

describe( "getEntityCountFromRawEditorState", () => {
	it( "returns the right number of enties in a raw editor state", () => {
		const rawEditorState = {
			blocks: [
				{
					entityRanges: [
						{
							key: 0,
							offset: 10,
							length: 3,
						},
						{
							key: 1,
							offset: 14,
							length: 3,
						},
					],
				},
			],
		};

		expect( getEntityCountFromRawEditorState( rawEditorState ) ).toBe( 2 );
	} );
} );

describe( "getEntityCountFromRawContent", () => {

} );
