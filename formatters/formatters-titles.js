// This module requires font awesome

Tabulator.prototype.extendModule("format", "formatters", {

    //
    //
    secondary: function(cell, formatterParams, onRendered){
        cell.getElement().style["background-color"] = "#F8F8F8";
        cell.getElement().style["color"] = "#C0C0C0";
        cell.getElement().style["fontStyle"] = "italic";
        return cell.getValue();
    },

    // Change the content to an icon
    // The value of the cell is CSS classname corresponding to the icon to display
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - tags: Dictionary. The DOM attributes to be added to the icon holder (Optional)
    //
    groups: function(cell, formatterParams, onRendered){
        // Update the CSS Style attributes

        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        var container = document.createElement("div");
        const iconHolder = document.createElement("i");
        iconHolder.style.margin = "auto";
        if (typeof formatterParams.expanded !== 'undefined'){
            if (!formatterParams.expanded){
                iconHolder.className = "far fa-plus-square";
                iconHolder.setAttribute("expanded", false)
            } else {
                iconHolder.className = "far fa-minus-square";
                iconHolder.setAttribute("expanded", true)
            }
        } else {
            iconHolder.className = "far fa-minus-square";
            iconHolder.setAttribute("expanded", true)
        }
        iconHolder.style["cursor"] = "pointer";
        iconHolder.addEventListener("click", function(){
            table = window[formatterParams.tableId];
            if (this.getAttribute("expanded") == "true"){
                this.className = "far fa-plus-square";
                this.setAttribute("expanded", false);
                formatterParams.columns.forEach(function(col){
                     table.hideColumn(col);
                })
            } else {
              this.setAttribute("expanded", true);
              formatterParams.columns.forEach(function(col){
                 table.showColumn(col);
              });
              this.className = "far fa-minus-square";
            }
        })
        cell.getElement().style["text-align"] = 'left';
        cell.getElement().style["width"] = 25;
        var cellText = document.createElement("div");
        cellText.innerHTML = cell.getValue();
        cellText.style["display"] = "inline-block";
        cellText.style["margin-right"] = "10px";
        container.appendChild(cellText);
        container.appendChild(iconHolder);

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}

        //
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                iconHolder.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        return container;
    },
});