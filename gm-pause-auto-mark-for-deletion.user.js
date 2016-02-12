// ==UserScript==
// @name        gm-pause-auto-mark-for-deletion
// @namespace   csson.github.com/pause-auto-mark-for-deletion
// @description Make Pause mark older versions for deletion
// @require     https://code.jquery.com/jquery-2.2.0.min.js
// @include     https://pause.perl.org/pause/authenquery?ACTION=delete_files
// @version     1
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


let tags = $('pre > span').reverse();

console.log(tags);

//tags.each(function(i) {
//    let $el = $(this);
//    let thisVersion = $el.text();
//    let previousVersion = $(tags[i + 1]).text();
//    
//    if(previousVersion == '') {
//        return;
//    }
//    $el.parent().parent().after('<a href="' + href + 'compare/' + previousVersion + '...' + thisVersion + '">Compare ' + thisVersion + ' with ' + previousVersion + '</a>');
//});
