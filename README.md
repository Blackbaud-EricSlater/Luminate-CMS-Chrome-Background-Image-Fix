# Luminate CMS Chrome Background Image Fix

## What does this script do?

This script works around an issue that causes Luminate CMS hosted websites to not display
background images to visitors using the Google Chrome browser.

## Long Description 

Luminate CMS automatically initiates an asynchronous redirect for new visitors in order
to create a standardized session between Luminate CMS and Luminate Online. This
redirect action prevents modern versions of Google Chrome from processing and
displaying background images defined in external stylesheets. This is most likely due
to a caching anomaly.

This script prompts Chrome to reprocess stylesheets after the aforementioned redirects by
cloning all `LINK` elements on the page, changing their `rel` attributes to `prefetch`,
adding them to the `HEAD` element then switching their `rel` back to `stylesheet`.
This approach causes Chrome to reprocess the stylesheets without redownloading them,
which is beneficial from a performance perspective.

To ease implementation across the various Luminate CMS client architectures, this script 
does not rely on any third-party libraries (ex. jQuery). Also, all logic is wrapped in 
an immediately invoked function expression to protect the global scope. Further, the core 
logic is only invoked in Google Chrome and only when session synchronization between CMS
and Luminate Online is performed so there is negligible performance impact.

## Special Note

Stylesheets which are included dynamically or via `<style>@import ...</style>` will not be
processed by this script and therefore will not benefit from the aforementioned fix.

## Installation

1. Upload this script to a web-accessible location. Probably, your Luminate CMS host.
2. Install this script in the footer of your CMS Wrapper beneath all external stylesheet
   `LINK` tags as close to the `</body>` tag as possible.
3. Rejoice! Your site will now properly display background images in Chrome.

## License

This script is open source and freely available under the MIT License. See included 
LICENSE file for details.
