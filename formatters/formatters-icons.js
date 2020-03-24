// This module requires font awesome

Tabulator.prototype.extendModule("format", "formatters", {

    // Change the content to an icon
    // The value of the cell is CSS classname corresponding to the icon to display
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - tags: Dictionary. The DOM attributes to be added to the icon holder (Optional)
    icon: function(cell, formatterParams){
        // Update the CSS Style attributes
        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const iconHolder = document.createElement("i");
        iconHolder.className = cell.getValue();

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}
        return iconHolder;
    },

    iconMapPivot: function(cell, formatterParams){
        const pivotVal = cell.getRow().getData()[formatterParams.pivot];

        const iconHolder = document.createElement("i");
        iconHolder.className = cell.getValue();

        // Define the icon
        if (pivotVal in formatterParams.iconMapping){
            iconHolder.className = formatterParams.iconMapping[pivotVal]; }

        // Set specific CSS mappings if exists
        if (typeof formatterParams.cssMapping !== 'undefined'){
            if (pivotVal in formatterParams.cssMapping){
                Object.keys(formatterParams.cssMapping[pivotVal]).forEach(function(key){
                    const.style[key] = formatterParams.cssMapping[pivotVal][key]})
            }
        }
        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                iconHolder.setAttribute(key, formatterParams.tags[key])})}
        return iconHolder;
    }
});