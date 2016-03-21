// This gets an element with a given ID to avoid using document.getElementById() repeatedly
function get (id) {
   return document.getElementById(id);
}

/****************************************************************
    Button Code Generator
****************************************************************/

function nextButtonInput(event, id) {
    if (event.keyCode == 13 && id == "button-text") {
        get('button-url').focus();
    } else if (event.keyCode == 13 && id == "button-url") {
        get('btn-build-button').focus();
    } else if (get('button-html').className == '') {
        get('button-html').className = 'hidden';
        get('copy-outcome-button').innerHTML = '';
    }
}

function buildButton () {
    var buttonText = get('button-text').value;
    var url = get('button-url').value;
    var buttonHTML = '<a href="' + url + '" target="_blank">\n';
    buttonHTML += '  <input type="button" value="' + buttonText + '" class="button"></input>\n';
    buttonHTML += '</a>';
    
    // Output HTML
    get('button-html').className = "";
    get('button-html').innerHTML = buttonHTML;
    
    // Copy the text to the clipboard
    var range = document.createRange();
    range.selectNode(document.querySelector('#button-html'));
    window.getSelection().addRange(range);
    
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        get('copy-outcome-button').innerHTML = "Code copied to clipboard!";
        window.getSelection().removeAllRanges();
    }
}

/****************************************************************
    Drop Down Menu Code Generator
****************************************************************/
var qtyLabels;
var labels;

// Generate a random 3 digit number to use as part of the unique IDs for the input and label pairs
function randNumGenerator () {
    var number = "";
    for (var i = 0; i < 3; i++) {
        number += Math.floor(Math.random() * 10);
    }
     return number;
}

// Advance cursor to next input field on return key press and clears any previous outputs if inputs are changed
function nextInput (event, num) {
    if (num == 0 && get('drop-down-output').innerHTML != "") {
        get('drop-down-output').innerHTML = '';
    }
    if (get('drop-down-html').className == '') {
        get('drop-down-html').className = 'hidden';
        get('copy-outcome').innerHTML = '';
    }
    if (event.keyCode == 13 && num == 0) {
        requestLabels();
    } else if (event.keyCode == 13 && num < qtyLabels) {
        get('label-' + (num + 1)).focus();
    } else if (event.keyCode == 13) {
        get('btn-build-dropdown').focus();
    }
}

// This will generate unique IDs to use for each input 'id' and label 'for' attribute to lessen the likelihood of two drop down items having the same ID.
function getUniqueIds () {
    var uniqueIds = new Array(parseInt(qtyLabels));
    for (var i = 0; i < uniqueIds.length; i++) {
        if (labels[i].length > 6) {
            uniqueIds[i] = labels[i].substr(0, 3).replace(" ", "") + "-" + labels[i].substr(labels[i].length - 3).replace(" ", "") + "-" + randNumGenerator();
        } else {
            uniqueIds[i] = labels[i].replace(" ", "") + "-" + randNumGenerator();
        }
    }
    return uniqueIds;
}

// Determine how many drop-downs are needed and build HTML to display so user can input label names
function requestLabels () {
    // Clear any preivous code that may have been generated
    get('drop-down-html').className = "hidden";
    get('drop-down-html').innerHTML = "";
    
    // Get user input
    qtyLabels = get("num-of-labels").value;
    
    // Build input to get label values
    var labelInputHTML = "<p>";
    for (var i = 1; i <= qtyLabels; i++) {
        labelInputHTML += "Label " + i + ": <input id='label-" + i + "' type='text' onKeydown='nextInput(event, " + i + ")'><br>";
    }
    labelInputHTML += "<button id='btn-build-dropdown' onclick='buildDropDownCode()'>Generate Code</button><br><span id='copy-outcome'></span></p>";
    
    // Output the HTML to get label values
    get('drop-down-output').innerHTML = labelInputHTML;
    get('label-1').focus();
}

function buildDropDownCode () {
  
    // Create an array to hold label values
    labels = new Array(parseInt(qtyLabels));
    
    // Fill array with users inputs
    for (var i = 0; i < labels.length; i++) {
        var labelId = "label-" + (i + 1);
        labels[i] = get(labelId).value.trim();
    }
    
    // Generate Unique IDs for each input label pair
    var ids = getUniqueIds();
    
    // Build HTML
    var generatedCode = "<div class='tab-group'>\n";
    for (var i = 0; i < labels.length; i++) {
        generatedCode += "  <div class='tab'>\n";
        generatedCode += "    <input id='" + ids[i] + "' name='tabs' type='checkbox'>\n";
        generatedCode += "    <label for='" + ids[i] + "'>" + labels[i] + "</label>\n";
        generatedCode += "    <div class='tab-content'>\n";
        generatedCode += "      <p>Insert Content Here</p>\n";
        generatedCode += "    </div>\n";
        generatedCode += "  </div>\n";
    }
    generatedCode += "</div>";
    
    // Output the HTML
    get('drop-down-html').className = "";
    get('drop-down-html').innerHTML = generatedCode;
    
    // Copy the text to the clipboard
    var range = document.createRange();
    range.selectNode(document.querySelector('#drop-down-html'));
    window.getSelection().addRange(range);
    
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        get('copy-outcome').innerHTML = "Code copied to clipboard!";
        window.getSelection().removeAllRanges();
    }
}

/****************************************************************
    Table Code Generator
****************************************************************/
var type;
var headings;
var rowHeadings;
var columns;
var rows;
var tableHTML;

// Advance cursor to next input field on return key press
function nextTableInput (event, id) {
    if (get('table-html').className == '') {
        get('copy-outcome-table').innerHTML = '';
        get('table-html').className = 'hidden';
    }
    if (event.keyCode == 13 && id == 'num-of-columns') {
        get('num-of-rows').focus();
    } else if (event.keyCode == 13) {
        get('btn-build-table').focus();
    }
}

// Change defaults when table type is changed
function setDefaults() {
    if (get('rubric-table').checked) {
        get('col-head-yes').checked = true;
        get('row-head-yes').checked = true;
    } else {
        get('col-head-yes').checked = true;
        get('row-head-no').checked = true;
    }
}

function buildTable () {
    if (get('basic-table').checked) {
        type = "";
    } else {
        type = " class='rubric'";
    }
    if (get('col-head-no').checked) {
        headings = false;
    } else {
        headings = true;
    }
    if (get('row-head-no').checked) {
        rowHeadings = false;
    } else {
        rowHeadings = true;
    }
    columns = parseInt(get("num-of-columns").value);
    rows = parseInt(get("num-of-rows").value);
    tableHTML = "<table" + type + ">\n";
    for (var i = 0; i < rows; i++) {
        tableHTML += "  <tr>\n";
        for (var c = 0; c < columns; c++) {
            if (i == 0 && headings) {
                tableHTML += "    <th>Heading</th>\n"; 
            } else if (c == 0 && rowHeadings) {
                tableHTML += "    <th>Heading</th>\n";
            } else {
                tableHTML += "    <td>Text</td>\n"; 
            }
        }
        tableHTML += "  </tr>\n";
    }
    tableHTML += "</table>";
    get('table-html').className = "";
    get('table-html').innerHTML = tableHTML;
    
    // Copy the text to the clipboard
    var range = document.createRange();
    range.selectNode(document.querySelector('#table-html'));
    window.getSelection().addRange(range);
    
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        get('copy-outcome-table').innerHTML = "Code copied to clipboard!";
        window.getSelection().removeAllRanges();
    }
}