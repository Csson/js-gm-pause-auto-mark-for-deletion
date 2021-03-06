// ==UserScript==
// @name        gm-pause-auto-mark-for-deletion
// @namespace   csson.github.com/pause-auto-mark-for-deletion
// @description Make Pause mark older versions for deletion
// @require     https://code.jquery.com/jquery-2.2.0.min.js
// @include     https://pause.perl.org/pause/authenquery?ACTION=delete_files
// @version     1
// ==/UserScript==

const limit = 2;

this.$ = this.jQuery = jQuery.noConflict(true);

let styles = {
    normal:    { display: 'inline-block', backgroundColor: '#ffffff' },
    marked:    { display: 'inline-block', backgroundColor: '#bb4444', color: '#eeeeee'},
    scheduled: { display: 'inline-block', backgroundColor: '#555555', color: '#eeeeee'},
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
    var version = distMatch[2].replace(/\.(meta|readme|tar\.gz)$/, '');

    // new dist - reset
    if(distribution !== currentDist) {
        $span.append('<h4 style="margin: 15px 0px -10px 0px;">' + currentDist + '</h4>');
        currentDist = distribution;
        distVersions = [];
        doCheck = 0;
    }

    // already scheduled - make it stand out
    if($span.text().match(/Scheduled for deletion/)) {
        $span.css(styles['scheduled']);
        return;
    }

    // new version - add some padding
    if(distVersions.length && distVersions[0] !== version) {
        $span.css({ marginBottom: '10px' });
    }
    $span.css(styles['normal']);

    // _ in version -> check but don't count towards releases for the distribution
    // but only if we already have seen a newer release
    if(distVersions.length && version.match(/_/)) {
        $checkbox.prop('checked', true);
        $span.css(styles['marked']);
    }
    // we haven't seen the version yet...
    else if($.inArray(version, distVersions) == -1) {
        distVersions.unshift(version);

        // ...and we just reached the limit, check this and all earlier versions
        if(distVersions.length > limit) {
            doCheck = 1;
        }
    }

    if(doCheck) {
        $checkbox.prop('checked', true);
        $span.css(styles['marked']);
    }
});

