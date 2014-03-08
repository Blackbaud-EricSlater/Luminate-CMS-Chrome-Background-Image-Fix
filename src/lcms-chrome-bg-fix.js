/**
 * Name: Luminate CMS Chrome Background Fix
 * Author: DNL Omnimedia Inc. <info@dnlomnimedia.com>
 * Date: 1/15/2014
 * Version: .95
 * Copyright: 2014 DNL OmniMedia Inc.
 * License: The MIT License (MIT)
 *
 **/

(function () {
    // Selector used to identify the stylesheets that should be prefetched. This should
    // include any stylesheets which contain references to background images.
    var stylesheetSelector = 'link[rel="stylesheet"]';

    // Name of cookie used by this script
    var cookieName = 'lcms_chrome_bg_fix_session_id';

    // Determine if the current browser is Google Chrome
    function isChrome() {
        return (window.chrome !== undefined);
    }

    // Retrieve an array of stylesheets on this page
    function getStylesheets() {
        return document.querySelectorAll(stylesheetSelector);
    }

    // Clone each of the provided stylesheets, change their 'rel' to 'prefetch', inject them
    // into the DOM then change their 'rel' back to 'stylesheet'. This is the special sauce
    // which forces Chrome to reprocess the stylesheets. Also, unlike simply performing a 'rel' 
    // switch on the existing stylesheets this approach does not cause the site to lose all of
    // its styles and become temporarily unstyled. Che bella!
    function injectPrefetches(stylesheets) {
        for(var i=0; i<stylesheets.length; i++) {
            var clone = stylesheets[i].cloneNode();
            clone.rel = "prefetch";
            insertAfter(stylesheets[i], clone);
            clone.rel = "stylesheet";
        }
    }

    // Return the current session ID. If one does not exist then `undefined` is returned.
    function getSessionId() {
        return (CONVIO || {}).pageSessionID;
    }

    // Inserts `newNode` after `referenceNode` in the DOM. 
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    // Determine whether the Luminate session has changed since the previous page load
    function sessionChanged() {
        // Get the last session ID encountered. This will be `undefined` on the first page load.
        // Otherwise, it will be a String.
    	var prevSessionId = getCookie(cookieName);

        // Get the current session ID
    	var sessionId = getSessionId();

        // If the previous session ID equals the current session ID then return FALSE. Else, cookie
        // the new session ID and return TRUE.
    	if(prevSessionId == sessionId) {
    		return false;
    	} else {
    		setCookie(cookieName, sessionId, 1000);
    		return true;
    	}
    }

    // If visitor is using Chrome and the session id has changed since our last run
    // then perform prefetch injections. In this way, the prefetch will run whenver
    // the session has been revalidated. Meaning any time Luminate fires the
    // asynchronous redirect that breaks BG images we will run our fix.
    if(isChrome() && sessionChanged()) {
        injectPrefetches( getStylesheets() );
    }

}());