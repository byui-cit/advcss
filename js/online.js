// Function to reposition mouseover popups if they overflow off #article
var firstCall = true;
function positionPopups() {
    var popupSpans = document.getElementsByClassName("popup"),
        articleWidth = document.getElementById('article').offsetWidth;
    // This is run once to make popups accessiable without a mouse and so they work better on touch screen devices by adding tabindexs
    if (firstCall) {
        for (var i = 0; i < popupSpans.length; i++) {
            popupSpans[i].tabIndex = 0;
        }
        firstCall = false;
    }
    // This loop goes through each popup and adjusts the width and position of popups so they don't ever overflow off the #article div
    for (var i = 0; i < popupSpans.length; i++) {
        var span = popupSpans[i],
            spanWidth = span.offsetWidth,
            popup = popupSpans[i].firstElementChild,
            popupWidth = 200,
            popupWordCount = popup.textContent.split(' ').length;
        // This makes popups with more than 10 words wider
        if (popupWordCount > 10) {
            popup.style.width = '400px';
            popup.style.left = 'calc(50% - 200px)';
            popupWidth = 400;
        }
        // There was an inconsistancy with the position of popups when the containing span was broken over two lines and this fixes that
        if (span.getClientRects().length > 1) {
            popup.style.left = spanWidth / 2 - popupWidth / 2 + 'px';
        }
        var spanLeft = span.offsetLeft,
            offsetParent = span.offsetParent;
        // This loop determins the distance between the left article edge and the span containing the popup
        while (offsetParent.id != 'article' && offsetParent.tagName != 'BODY') {
            spanLeft += offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
        // Here calculations are made to determine if popups will overflow #article. If so corrections are made. The 20's and the 40's are to componsate for the 20px of padding on each side of #article
        var overflowLeft = popupWidth / 2 - spanWidth / 2 - spanLeft + 20,
            overflowRight = (spanLeft + spanWidth / 2 + popupWidth / 2) - articleWidth + 20;
        if (popupWidth > articleWidth - 40) {
            popup.style.width = articleWidth - 40 + 'px';
            popup.style.left = 20 - spanLeft + 'px';
        } else if (overflowLeft > 0) {
            popup.style.left = 20 - spanLeft + 'px';
        } else if (overflowRight > 0) {
            popup.style.left = -popupWidth + articleWidth - spanLeft - 20 + 'px';
        }
    }
}

window.onresize = positionPopups;

// D2L only will resize the content iframe if there is a change in the html. The dropdowns that are triggered with just css therefore would expand the content with out having the iframe adjust for the needed extra height. This fixes that by adding a foo class to the labels clicked. Also inserts some hidden text so screen readers will explain why there are checkboxes on each dropdown.
function dropDownFix() {
    var dropDowns = document.querySelectorAll('.tab input'),
        dropDownGroups = document.querySelectorAll('.tab-group'),
        accessibilityMsg = '<span class="hiddenText">The following dropdowns will display content when the checkbox associated with it is checked.</span>';
    for (var i = 0; i < dropDowns.length; i++) {
        dropDowns[i].onchange = function() {
            this.classList.toggle('foo');
        };
    }
    for (var i = 0; i < dropDowns.length; i++) {
        dropDownGroups[i].insertAdjacentHTML('afterbegin', accessibilityMsg);
    }
}

window.onload = function () {
     
    //Inserts footer with copyright information
    var year = new Date().getFullYear(),
        copyright = "Copyright &copy; " + year + " by Brigham Young University - Idaho. All Rights Reserved.",
        footer = "<div id='footer'>" + copyright + "</div>";
    document.getElementById('main').insertAdjacentHTML('beforeend', footer);

    // Old way of doing drop down menus. May still be needed in some courses
    var dt = document.getElementsByTagName("dt");
    for (var i = 0; i < dt.length; i++) {
        dt[i].onclick = function () {
            if (this.className == '') {
                this.className = 'open';
            } else {
                this.className = '';
            }
        }
    }
    // Position any popups correctly
    positionPopups();
    // fix D2L iframe height problem with css dropdowns
    dropDownFix();
    // Enable fullscreen for videos in D2L
    window.parent.document.querySelector('iframe').setAttribute('allowfullscreen',true);
}