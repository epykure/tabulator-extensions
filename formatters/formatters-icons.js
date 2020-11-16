// This module requires font awesome

Tabulator.prototype.extendModule("format", "formatters", {

    // Change the content to an icon
    // The value of the cell is CSS classname corresponding to the icon to display
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - tags: Dictionary. The DOM attributes to be added to the icon holder (Optional)
    //      - events: Dictionary. Optional. The DOM events to be added to the internal component
    icon: function(cell, formatterParams){
        // Update the CSS Style attributes

        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const iconHolder = document.createElement("i");
        iconHolder.style.margin = "auto";
        iconHolder.className = cell.getValue();
        cell.getElement().style["text-align"] = 'center';
        cell.getElement().style["width"] = 25;

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        // Add events to the cell
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        return iconHolder;
    },

    // Add a delete icon to the column from the font-awesome website
    // This column will automatically have a delete event to remove the row if clicked
    // formatterParams:
    //      - css: Dictionary.
    //      - tags: Dictionary.
    //      - events: Dictionary. Optional. The DOM events to be added to the internal component
    remove: function(cell, formatterParams){
        // Update the CSS Style attributes

        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const iconHolder = document.createElement("i");
        if (cell.getValue()){
            iconHolder.style.margin = "auto";
            iconHolder.className = 'fas fa-trash-alt';
            cell.getElement().style["text-align"] = 'center';
        }
        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        //
        if (typeof formatterParams.events !== 'undefined'){
            iconHolder.style.cursor = "pointer";
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}
        else {
            iconHolder.style.cursor = "pointer";
            iconHolder.addEventListener("click", function(){cell.getRow().delete()});
        }
        return iconHolder;
    },

    // Add a runnable icon to the column from the font-awesome website
    // This icon will have different status according to the events
    // formatterParams:
    //      - css:
    //      - tags:
    //      - post:
    runnable: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const iconHolder = document.createElement("i");
        if (cell.getValue()){
            iconHolder.style.margin = "auto"
            iconHolder.className = "fas fa-play-circle";
            cell.getElement().style["text-align"] = 'center';
            if (typeof formatterParams.post !== 'undefined'){
                iconHolder.style.cursor = "pointer";
                iconHolder.addEventListener('click', function(){
                    iconHolder.className = "fas fa-spinner fa-spin";
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", formatterParams.post, true);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                          iconHolder.className = "fas fa-check";
                          setTimeout(function(){iconHolder.className = "fas fa-play-circle";}, 2000)
                        }
                        if (this.readyState == 4 && this.status != 200) {
                          iconHolder.className = "fas fa-times";
                          setTimeout(function(){iconHolder.className = "fas fa-play-circle";}, 2000)
                        }
                     };
                    xhttp.send(JSON.stringify(cell.getValue()));
                })
            }
        }
        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        return iconHolder;
    },

    //
    //
    //
    // formatterParams:
    //      - css: Dictionary. Optional. The CSS style to be added to the cell object
    //      - colors: Dictionary. Optional. The mapping with the colors per tasks
    task: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}
        if (typeof formatterParams.colors === 'undefined'){
            formatterParams.colors = {"completed": 'green', 'failed': 'red', 'waiting': 'grey', 'running': 'orange'}
        }
        var cellValue = cell.getValue();
        if(typeof formatterParams.colors[cellValue] === 'undefined'){
            cell.getElement().style["background"] = "white";
            cell.getElement().style["color"] = "black";
        } else {
            cell.getElement().style["background"] = formatterParams.colors[cellValue];
            cell.getElement().style["color"] = 'white';
        }
        cell.getElement().style["text-align"] = 'center';
        cell.getElement().style["vertical-align"] = 'middle';

        return cellValue;
    },

    //
    //
    // formatterParams:
    //      - css:
    //      - tags:
    //      - events: Dictionary. Optional. The DOM events to be added to the internal component
    button: function(cell, formatterParams){

        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const iconHolder = document.createElement("div");
        iconHolder.style.margin = "auto";
        iconHolder.className = "cssbuttonbasic";
        iconHolder.style['line-height'] = '15px';
        iconHolder.style['padding'] = '0 5px';
        iconHolder.innerHTML = cell.getValue();
        cell.getElement().style["text-align"] = 'center';
        cell.getElement().style["width"] = "auto";

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        //
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        return iconHolder;
    },

    //
    //
    //
    // formatterParams:
    //      - css:
    //      - events: Dictionary. Optional. The DOM events to be added to the internal component
    //      - tags:
    avatar: function(cell, formatterParams){
        // Update the CSS Style attributes

        cell.getElement().style["text-align"] = 'center';
        cell.getElement().style["width"] = 25;
        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        function hashCode(str) { // java String#hashCode
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
               hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        }

        function intToRGB(i){
            var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
            return "00000".substring(0, 6 - c.length) + c;
        }

        const iconHolder = document.createElement("img");
        splitCell = cell.getValue().split("/");
        iconHolder.style.margin = "auto";
        iconHolder.style.height = "100%";
        iconHolder.style.border = "1px solid grey";
        iconHolder.style.borderRadius = "20px";
        iconHolder.setAttribute("src", cell.getValue());
        iconHolder.setAttribute("data-text", splitCell[splitCell.length-1].substring(0, 1).toUpperCase());
        iconHolder.setAttribute("data-color", intToRGB(hashCode(splitCell[splitCell.length-1])));
        iconHolder.setAttribute("onerror", "this.parentElement.innerHTML = '<div style=\"background:#'+ this.getAttribute('data-color') +';margin:auto;width:20px;border-radius:20px;color:white;border:1px solid grey\">' + this.getAttribute('data-text') + '</div>'");

        //
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}
        return iconHolder;
    },

    //
    //
    //
    // formatterParams:
    //      - iconMapping:
    //      - cssMapping:
    //      - tags:
    //      - events: Dictionary. Optional. The DOM events to be added to the internal component
    iconMapPivot: function(cell, formatterParams){
        const pivotVal = cell.getRow().getData()[formatterParams.pivot];

        const iconHolder = document.createElement("i");
        iconHolder.className = cell.getValue();
        iconHolder.style["text-align"] = "center"

        // Define the icon
        if (typeof formatterParams.iconMapping !== 'undefined'){
            if (pivotVal in formatterParams.iconMapping){
                iconHolder.className = formatterParams.iconMapping[pivotVal]; }
        }

        // Set specific CSS mappings if exists
        if (typeof formatterParams.cssMapping !== 'undefined'){
            if (pivotVal in formatterParams.cssMapping){
                Object.keys(formatterParams.cssMapping[pivotVal]).forEach(function(key){
                    style[key] = formatterParams.cssMapping[pivotVal][key]})
            }
        }

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        //
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        return iconHolder;
    }
});