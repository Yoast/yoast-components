import interpolateComponents from "interpolate-components";
import replaceSpecialCharactersAndDiacritics from "yoastseo/src/stringProcessing/replaceDiacritics";
import transliterate from "yoastseo/src/stringProcessing/transliterate";
import createRegexFromArray from "yoastseo/src/stringProcessing/createRegexFromArray";

/**
 * Highlights a keyword with strong React elements.
 *
 * @param {string} locale ISO 639 (2/3 characters) locale.
 * @param {string[]} wordsToHighlight The array of words to be highlighted.
 * @param {string} text The text in which to highlight words.
 * @param {string} cleanText Optional. The text in which to highlight words
 *                           without special characters and diacritics.
 *
 * @returns {ReactElement} React elements to be rendered.
 */
function highlightWords( locale, wordsToHighlight, text, cleanText ) {
	if ( wordsToHighlight.length === 0 ) {
		return text;
	}

	// Clean the text from special characters and diacritics.
	let textToUse = cleanText ? cleanText : text;

	// Initiate an array of cleaned and transliterated forms.
	const wordsToHighlightCleaned = [];

	wordsToHighlight.forEach( function( form ) {
		/*
	    * When a text has been cleaned up from special characters and diacritics
	    * we need to match against a cleaned up keyword as well.
	    */
		form = cleanText ? replaceSpecialCharactersAndDiacritics( form ) : form;

		wordsToHighlightCleaned.push( form );

		// Transliterate the keyword for highlighting
		const formTransliterated = transliterate( form, locale );

		if ( formTransliterated !== form ) {
			wordsToHighlightCleaned.push( formTransliterated );
		}
	} );

	const keywordFormsMatcher = createRegexFromArray( wordsToHighlightCleaned, false, "", false );

	textToUse = textToUse.replace( keywordFormsMatcher, function( matchedKeyword ) {
		return `{{strong}}${ matchedKeyword }{{/strong}}`;
	} );

	return interpolateComponents( {
		mixedString: textToUse,
		components: { strong: <strong /> },
	} );
}

export default highlightWords;
