/**
 * Name: Luminate CMS Chrome Background Fix
 * Author: DNL Omnimedia Inc. <info@dnlomnimedia.com>
 * Date: 1/15/2014
 * Version: .9
 * Copyright: 2014 DNL OmniMedia Inc.
 * License: The MIT License (MIT)
 *
 **/

(function () {
    // Selector used to identify the stylesheets that should be prefetched. This should
    // include any stylesheets which contain references to background images.
    var stylesheetSelector = 'link[rel="stylesheet"]';

    // Name of cookie used to determine if this script ran recently
    var cookieName = 'lcms_chrome_bg_fix_ran';

    // Determine if the current browser is Google Chrome
    function isChrome() {
        return (window.chrome !== undefined);
    }

    // Retrieve an array of stylesheets on this page
    function getStylesheets() {
        return document.querySelectorAll(stylesheetSelector);
    }

    // Clone each of the provided stylesheets, change their 'rel' to 'prefetch', inject them
    // into the DOME then change their 'rel' back to 'stylesheet'. This is the special sauce
    // which forces Chrome to reprocess the stylesheets. Also, unlike simply performing a 'rel' 
    // switch on the existing stylesheets this approach does not cause the site to lose all of
    // its styles and become temporarily unstyled. Che bella!
    function injectPrefetches(stylesheets) {
        var head = document.getElementsByTagName('body')[0];
        for(var i=0; i<stylesheets.length; i++) {
            var clone = stylesheets[i].cloneNode();
            clone.rel = "prefetch";
            head.appendChild(clone);
            clone.rel = "stylesheet";
        }
    }

    // Return TRUE if this is the first time the script has run (based on an empty cookie). If
    // first time then set cookie value and return TRUE.
    function isFirstRun() {
        var cookie = getCookie(cookieName);
        if(cookie == "") {
            setCookie(cookieName, "true", 1);
            return true;
        }
        return false;
    }

    // If visitor is using Chrome then perform prefetch injections
    if(isChrome() && isFirstRun()) {
        injectPrefetches( getStylesheets() );
    }

}());