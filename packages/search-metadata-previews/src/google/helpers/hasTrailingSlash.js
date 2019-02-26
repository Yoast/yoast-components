/**
 * Returns if a url has a trailing slash or not.
 *
 * @param {string} url The url to check for a trailing slash.
 * @returns {boolean} Whether or not the url contains a trailing slash.
 */
function hasTrailingSlash( url ) {
	return url.lastIndexOf( "/" ) === ( url.length - 1 );
}

export default hasTrailingSlash;
