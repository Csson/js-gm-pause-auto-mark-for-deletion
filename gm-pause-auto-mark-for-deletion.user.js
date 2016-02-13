// ==UserScript==
// @name        gm-pause-auto-mark-for-deletion
// @namespace   csson.github.com/pause-auto-mark-for-deletion
// @description Make Pause mark older versions for deletion
// @require     https://code.jquery.com/jquery-2.2.0.min.js
// @include     https://pause.perl.org/pause/authenquery?ACTION=delete_files
// @version     1
// @grant       GM_abbStyle
// ==/UserScript==

const limit = 2;

this.$ = this.jQuery = jQuery.noConflict(true);

let styles = {
    line1: { backgroundColor: '#bb4444', color: '#eeeeee'},
    line2: { backgroundColor: '#44bb44', color: '#eeeeee'},
    line3: { backgroundColor: '#4444bb', color: '#eeeeee'},
};

// look at releases in decending time
let tags = $($('span').get().reverse());

let currentDist = '';
let distVersions = [];
let doCheck = 0;

tags.each(function(i) {
    let $span = $(this);
    let $checkbox = $span.find('[type="checkbox"]');

    if($checkbox.prop('checked')) {
        return;
    }

    var distMatch = $checkbox.val().match(/^(.*)-([^-]*)/);
    if(distMatch == null) {
        return;
    }

    var distribution = distMatch[1];
    var version = distMatch[2];
    version = version.replace(/\.(meta|readme|tar\.gz)$/, '');

    // _ in version -> check but don't count towards releases for the distribution
    if(version.match(/_/)) {
        $checkbox.prop('checked', true);
        $span.css(styles[$span.attr('class')]);
        return;
    }

    // new dist - reset
    if(distribution !== currentDist) {
        $span.append('<h4 style="margin: 15px 0px -10px 0px;">' + currentDist + '</h4>');
        currentDist = distribution;
        distVersions = [];
        doCheck = 0;
    }

    // we haven't seen the version yet...
    if($.inArray(version, distVersions) == -1) {
        distVersions.push(version);

        // ...and we just breached the limit, check this and all earlier versions
        if(distVersions.length > limit) {
            doCheck = 1;
        }
    }

    if(doCheck) {
        $checkbox.prop('checked', true);
        $span.css(styles[$span.attr('class')]);
    }
});

