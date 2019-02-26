/* External dependencies */
import React, { PureComponent } from "react";
import styled from "styled-components";
import replaceSpecialCharactersAndDiacritics from "yoastseo/src/stringProcessing/replaceDiacritics";
import PropTypes from "prop-types";
import truncate from "lodash/truncate";
import { parse } from "url";
import { __ } from "@wordpress/i18n";

/* Yoast Dependencies */
import { AmpLogo } from "../../../components";

/* Internal dependencies */
import colors from "../../../../style-guide/colors";
import ScreenReaderText from "../../../../a11y/ScreenReaderText";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";
import Title from "./Title";
import {
	MODE_MOBILE,
	MODE_DESKTOP,
	MODES,
	DEFAULT_MODE,
	COLOR_URL,
	COLOR_DESCRIPTION,
	COLOR_GENERATED_DESCRIPTION,
	COLOR_DATE,
	MAX_WIDTH,
	WIDTH_PADDING,
	DESCRIPTION_LIMIT,
} from "./constants";
import addCaretStyle from "./helpers/addCaretStyle";
import highlightWords from "./helpers/highlightWords";
import hasTrailingSlash from "./helpers/hasTrailingSlash";

export const BaseTitle = styled.div`
	cursor: pointer;
	position: relative;
`;

export const TitleUnboundedDesktop = styled.span`
	white-space: nowrap;
`;

export const TitleUnboundedMobile = styled.span`
	display: inline-block;
	font-size: 16px;
	line-height: 1.2em;
	max-height: 2.4em; // max two lines of text
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const BaseUrl = styled.div`
	display: inline-block;
	color: ${ COLOR_URL };
	cursor: pointer;
	position: relative;
	max-width: 90%;
	white-space: nowrap;
	font-size: 14px;
`;

const BaseUrlOverflowContainer = BaseUrl.extend`
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`;

BaseUrlOverflowContainer.displayName = "SnippetPreview__BaseUrlOverflowContainer";

export const DesktopDescription = styled.div`
	color: ${ props => props.isDescriptionPlaceholder ? COLOR_GENERATED_DESCRIPTION : COLOR_DESCRIPTION };
	cursor: pointer;
	position: relative;
	max-width: ${ MAX_WIDTH }px;
	font-size: 13px;
`;

const MobileDescription = styled( DesktopDescription )`
	font-size: 14px;
	line-height: 20px;
`;

const MobilePartContainer = styled.div`
	padding: 8px 16px;
`;

const DesktopPartContainer = styled.div`
`;

export const UrlDownArrow = styled.div`
	display: inline-block;
	margin-top: 6px;
	margin-left: 6px;
	border-top: 5px solid #006621;
	border-right: 4px solid transparent;
	border-left: 4px solid transparent;
	vertical-align: top;
`;

const DatePreview = styled.span`
	color: ${ COLOR_DATE };
`;

const Separator = styled.hr`
	border: 0;
	border-bottom: 1px solid #DFE1E5;
	margin: 0;
`;

/**
 * The snippet preview class.
 */
export default class SnippetPreview extends PureComponent {
	/**
	 * Renders the SnippetPreview component.
	 *
	 * @param {Object} props The passed props.
	 * @param {string} props.title                      The title tag.
	 * @param {string} props.url                        The URL of the page for which to generate a snippet.
	 * @param {string} props.description                The meta description.
	 * @param {string} props.keyword                    The keyword for the page.
	 * @param {string} props.isDescriptionPlaceholder   Whether the description is the placeholder.
	 * @param {string} props.locale                     The locale of the page.
	 * @param {string} props.date                       Optional, the date to display before the meta description.
	 *
	 * @returns {ReactElement} The SnippetPreview component.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			title: props.title,
			description: props.description,
			isDescriptionPlaceholder: true,
		};

		this.setTitleRef       = this.setTitleRef.bind( this );
		this.setDescriptionRef = this.setDescriptionRef.bind( this );
	}

	/**
	 * Sets the title element reference for later use.
	 *
	 * @param {Object} titleElement The title element.
	 *
	 * @returns {void}
	 */
	setTitleRef( titleElement ) {
		this._titleElement = titleElement;
	}

	/**
	 * Sets the description element reference for later use.
	 *
	 * @param {Object} descriptionElement The description element.
	 *
	 * @returns {void}
	 */
	setDescriptionRef( descriptionElement ) {
		this._descriptionElement = descriptionElement;
	}

	/**
	 * Returns whether an element has content that doesn't fit.
	 *
	 * Has a leeway of 2 to make sure weird measurements don't cause an infinite
	 * loop.
	 *
	 * @param {HTMLElement} element The element to check.
	 *
	 * @returns {boolean} Whether it has content that doesn't fit.
	 */
	hasOverflowedContent( element ) {
		return Math.abs( element.clientHeight - element.scrollHeight ) >= 2;
	}

	/**
	 * Set the title in the state so it fits in two lines.
	 *
	 * @returns {void}
	 */
	fitTitle() {
		const titleElement = this._titleElement;

		/*
		 * When the title is 600 pixels in width and two lines it approximately fits 200
		 * characters. Because we need to translate the pixels (current width) to the
		 * amount of characters we need a ratio. That ratio is 600/200 = 3.
		 */
		const PIXELS_PER_CHARACTER_FOR_TWO_LINES = 3;

		if ( this.hasOverflowedContent( titleElement ) ) {
			let prevTitle = this.state.title;

			// Heuristic to prevent too many re-renders.
			const maxCharacterCount = titleElement.clientWidth / PIXELS_PER_CHARACTER_FOR_TWO_LINES;

			if ( prevTitle.length > maxCharacterCount ) {
				prevTitle = prevTitle.substring( 0, maxCharacterCount );
			}

			const newTitle = this.dropLastWord( prevTitle );

			this.setState( {
				title: newTitle,
			} );
		}
	}

	/**
	 * Removes the last word of a sentence.
	 *
	 * @param {string} sentence The sentence to drop a word of.
	 * @returns {string} The new sentence.
	 */
	dropLastWord( sentence ) {
		const titleParts = sentence.split( " " );
		titleParts.pop();

		return titleParts.join( " " );
	}

	/**
	 * Returns the title for rendering.
	 *
	 * @returns {string} The title to render.
	 */
	getTitle() {
		if ( this.props.title !== this.state.title ) {
			return this.state.title + " ...";
		}

		return this.props.title;
	}

	/**
	 * Returns the description for rendering.
	 *
	 * @returns {string} The description to render.
	 */
	getDescription() {
		if ( ! this.props.description ) {
			return __( "Please provide a meta description by editing the snippet below. If you don’t, Google will " +
				"try to find a relevant part of your post to show in the search results.", "yoast-components" );
		}

		return truncate( this.props.description, {
			length: DESCRIPTION_LIMIT,
			separator: " ",
			omission: " ...",
		} );
	}

	/**
	 * Renders the date if set.
	 *
	 * @returns {?ReactElement} The rendered date.
	 */
	renderDate() {
		return this.props.date === ""
			? null
			: <DatePreview>{ this.props.date } - </DatePreview>;
	}

	/**
	 * Adds caret styles to the base component if relevant prop is active.
	 *
	 * @param {string} fieldName The field to add caret styles to.
	 * @param {ReactComponent} BaseComponent The base component for the field.
	 *
	 * @returns {ReactComponent} The component with caret styles added.
	 */
	addCaretStyles( fieldName, BaseComponent ) {
		const {
			mode,
			hoveredField,
			activeField,
		} = this.props;

		if ( activeField === fieldName ) {
			return addCaretStyle( BaseComponent, colors.$color_snippet_active, mode );
		}

		if ( hoveredField === fieldName ) {
			return addCaretStyle( BaseComponent, colors.$color_snippet_hover, mode );
		}

		return BaseComponent;
	}

	/**
	 * Returns the breadcrumbs string to be rendered.
	 *
	 * @param {string} url The url to use to build the breadcrumbs.
	 * @returns {string} The breadcrumbs.
	 */
	getBreadcrumbs( url ) {
		const { breadcrumbs } = this.props;
		/*
		 * Strip out question mark and hash characters from the raw URL and percent-encode
		 * characters that are not allowed in a URI.
		 */
		const cleanEncodedUrl = encodeURI( url.replace( /\?|#/g, "" ) );

		const { protocol, hostname, pathname } = parse( cleanEncodedUrl );

		const hostPart = protocol === "https:" ? protocol + "//" + hostname : hostname;

		const urlParts = breadcrumbs || pathname.split( "/" );

		const breadCrumbs = [ hostPart, ...urlParts ].filter( part => !! part ).join( " › " );

		return decodeURI( breadCrumbs );
	}

	/**
	 * Renders the URL for display in the snippet preview.
	 *
	 * @returns {ReactElement} The rendered URL.
	 */
	renderUrl() {
		const {
			url,
			onMouseUp,
			onMouseEnter,
			onMouseLeave,
		} = this.props;

		/*
		 * We need to replace special characters and diacritics only on the url
		 * string because when highlightWords kicks in, interpolateComponents
		 * returns an array of strings plus a strong React element, and replace()
		 * can't run on an array.
		 */
		let urlContent = replaceSpecialCharactersAndDiacritics( url );

		if ( this.props.mode === MODE_MOBILE ) {
			urlContent = this.getBreadcrumbs( urlContent );
		} else {
			if ( ! hasTrailingSlash( urlContent ) ) {
				urlContent = urlContent + "/";
			}
		}

		const Url = this.addCaretStyles( "url", BaseUrl );
		/*
		 * The jsx-a11y eslint plugin is asking for an onFocus accompanying the onMouseEnter.
		 * However this is not relevant in this case, because the url is not focusable.
		 */
		/* eslint-disable jsx-a11y/mouse-events-have-key-events */
		return <Url>
			<BaseUrlOverflowContainer
				onMouseUp={ onMouseUp.bind( null, "url" ) }
				onMouseEnter={ onMouseEnter.bind( null, "url" ) }
				onMouseLeave={ onMouseLeave.bind( null ) }
			>
				{ urlContent }
			</BaseUrlOverflowContainer>
		</Url>;
		/* eslint-enable jsx-a11y/mouse-events-have-key-events */
	}

	/**
	 * Before we receive props we need to set the title and description in the
	 * state.
	 *
	 * @param {Object} nextProps The props this component will receive.
	 *
	 * @returns {void}
	 */
	componentWillReceiveProps( nextProps ) {
		const nextState = {};

		if ( this.props.title !== nextProps.title ) {
			nextState.title = nextProps.title;
		}

		if ( this.props.description !== nextProps.description ) {
			nextState.description = nextProps.description;
		}

		this.setState( nextState );
	}

	/**
	 * After a component updates we need to fit the title.
	 *
	 * @returns {void}
	 */
	componentDidUpdate() {
		this.setState( {
			isDescriptionPlaceholder: ( ! this.props.description ),
		} );

		if ( this.props.mode === MODE_MOBILE ) {
			clearTimeout( this.fitTitleTimeout );

			// Make sure that fitting the title doesn't block other rendering.
			this.fitTitleTimeout = setTimeout( () => {
				this.fitTitle();
			}, 10 );
		}
	}

	/**
	 * After a component has mounted, we need to set the state depending on the props provided.
	 *
	 * @returns {void}
	 */
	componentDidMount() {
		this.setState( {
			isDescriptionPlaceholder: ( ! this.props.description ),
		} );
	}

	/**
	 * Renders the snippet preview description, based on the mode.
	 *
	 * @returns {ReactElement} The rendered description.
	 */
	renderDescription() {
		const {
			wordsToHighlight,
			locale,
			onMouseUp,
			onMouseLeave,
			onMouseEnter,
			mode,
		} = this.props;

		const renderedDate = this.renderDate();

		const outerContainerProps = {
			isDescriptionPlaceholder: this.state.isDescriptionPlaceholder,
			onMouseUp: onMouseUp.bind( null, "description" ),
			onMouseEnter: onMouseEnter.bind( null, "description" ),
			onMouseLeave: onMouseLeave.bind( null ),
		};

		if ( mode === MODE_DESKTOP ) {
			const DesktopDescriptionWithCaret = this.addCaretStyles( "description", DesktopDescription );
			return (
				<DesktopDescriptionWithCaret
					{ ...outerContainerProps }
					innerRef={ this.setDescriptionRef }
				>
					{ renderedDate }
					{ highlightWords( locale, wordsToHighlight, this.getDescription() ) }
				</DesktopDescriptionWithCaret>
			);
		} else if ( mode === MODE_MOBILE ) {
			const MobileDescriptionWithCaret = this.addCaretStyles( "description", MobileDescription );
			return (
				<MobileDescriptionWithCaret
					{ ...outerContainerProps }
				>
					<MobileDescription
						isDescriptionPlaceholder={ this.state.isDescriptionPlaceholder }
						innerRef={ this.setDescriptionRef }
					>
						{ renderedDate }
						{ highlightWords( locale, wordsToHighlight, this.getDescription() ) }
					</MobileDescription>
				</MobileDescriptionWithCaret>
			);
		}
		return null;
	}

	/**
	 * Renders the snippet preview.
	 *
	 * @returns {ReactElement} The rendered snippet preview.
	 */
	render() {
		const {
			onMouseUp,
			onMouseLeave,
			onMouseEnter,
			mode,
			isAmp,
		} = this.props;

		const {
			PartContainer,
			Container,
			TitleUnbounded,
			SnippetTitle,
		} = this.getPreparedComponents( mode );

		const separator = mode === MODE_DESKTOP ? null : <Separator />;
		const downArrow = mode === MODE_DESKTOP ? <UrlDownArrow /> : null;
		const amp       = mode === MODE_DESKTOP || ! isAmp ? null : <AmpLogo />;

		/*
		 * The jsx-a11y eslint plugin is asking for an onFocus accompanying the onMouseEnter.
		 * However this is not relevant in this case, because the title and description are
		 * not focusable.
		 */
		/* eslint-disable jsx-a11y/mouse-events-have-key-events */
		return (
			<section>
				<Container
					onMouseLeave={ this.onMouseLeave }
					width={ MAX_WIDTH + ( 2 * WIDTH_PADDING ) }
					padding={ WIDTH_PADDING }
				>
					<PartContainer>
						<ScreenReaderText>
							{ __( "SEO title preview", "yoast-components" ) + ":" }
						</ScreenReaderText>
						<SnippetTitle
							onMouseUp={ onMouseUp.bind( null, "title" ) }
							onMouseEnter={ onMouseEnter.bind( null, "title" ) }
							onMouseLeave={ onMouseLeave.bind( null ) }
						>
							<Title>
								<TitleUnbounded innerRef={ this.setTitleRef }>
									{ this.getTitle() }
								</TitleUnbounded>
							</Title>
						</SnippetTitle>
						<ScreenReaderText>
							{ __( "Url preview", "yoast-components" ) + ":" }
						</ScreenReaderText>
						{ amp }
						{ this.renderUrl() }
						{ downArrow }
					</PartContainer>
					{ separator }
					<PartContainer>
						<ScreenReaderText>
							{ __( "Meta description preview", "yoast-components" ) + ":" }
						</ScreenReaderText>
						{ this.renderDescription() }
					</PartContainer>
				</Container>
			</section>
		);
	/* eslint-enable jsx-a11y/mouse-events-have-key-events */
	}

	/**
	 * Returns the prepared components based on the mode we are currently in.
	 *
	 * @param {string} mode The mode we are in.
	 * @returns {{
	 *     PartContainer: ReactComponent,
	 *     Container: ReactComponent,
	 *     TitleUnbounded: ReactComponent,
	 *     SnippetTitle: ReactComponent,
	 * }} The prepared components.
	 */
	getPreparedComponents( mode ) {
		const PartContainer = mode === MODE_DESKTOP ? DesktopPartContainer : MobilePartContainer;
		const Container = mode === MODE_DESKTOP ? DesktopContainer : MobileContainer;
		const TitleUnbounded = mode === MODE_DESKTOP ? TitleUnboundedDesktop : TitleUnboundedMobile;
		const SnippetTitle = this.addCaretStyles( "title", BaseTitle );

		return {
			PartContainer,
			Container,
			TitleUnbounded,
			SnippetTitle,
		};
	}
}

SnippetPreview.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string,
	breadcrumbs: PropTypes.array,

	hoveredField: PropTypes.string,
	activeField: PropTypes.string,
	keyword: PropTypes.string,
	wordsToHighlight: PropTypes.array,
	locale: PropTypes.string,
	mode: PropTypes.oneOf( MODES ),
	isAmp: PropTypes.bool,

	onMouseUp: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

SnippetPreview.defaultProps = {
	date: "",
	keyword: "",
	wordsToHighlight: [],
	breadcrumbs: null,
	locale: "en",
	hoveredField: "",
	activeField: "",
	mode: DEFAULT_MODE,
	isAmp: false,

	onHover: () => {},
	onMouseEnter: () => {},
	onMouseLeave: () => {},
};
