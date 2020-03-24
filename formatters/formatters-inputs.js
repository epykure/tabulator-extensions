
Tabulator.prototype.extendModule("format", "formatters", {

    // Change the CSS Style for a given cell
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    style: function(cell, formatterParams){
        var value = cell.getValue();
        if (typeof formatterParams.css !== 'undefined'){
            Object.keys(value[formatterParams.cssField]).forEach(function(key){
                    cell.getElement().style[key] = value[formatterParams.cssField][key]})};
            value = value[formatterParams.valField];
        } else {
            Object.keys(formatterParams.css).forEach(function(key){
                    cell.getElement().style[key] = formatterParams.css[key]})};
        }
        return value;
    },

    // Change the content of the cell to ****
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    password: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        if (cell.getValue() === undefined){result = ""}
        else{result = cell.getValue().replace(/./g, '*')}
        return result;
    },

    // Same than the lookup except that the mapping is based on another column in the row
    // formatterParams:
    //      - lookups: Dictionary. The mapping table for the lookup
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - pivot: String. The column name to use to get the data to lookup from te row
    //
    lookupPivot: function(cell, formatterParams){
         if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        var value = cell.getValue();
        const pivot = cell.getRow().getData()[formatterParams.pivot];
        if (pivot in formatterParams.lookups){ value = formatterParams.lookups[pivot]; }
        return value;
    },

    // Set a label based on a list of values
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - thresholds: List. The different values to compare to deduce the category
    //      - labels: List. The resulting category
    //
    labelThresholds: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        // Compare the value to the threshold
        const value = cell.getValue();
        var isDefined = false;
        var label = null;
        for (const i in formatterParams.thresholds) {
            if (value < formatterParams.thresholds[i]){
                label = formatterParams.labels[i];
                isDefined = true;
                break; }}
        if(!isDefined){
            const arrayLenght = formatterParams.labels.length - 1;
            label = formatterParams.labels[arrayLenght]; }
        return label;
    },

    // Set a label based on a list of values from another column
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - pivot: String. The column name to use to get the data to lookup from te row
    //      - thresholds: List. The different values to compare to deduce the category
    //      - labels: List. The resulting category
    //
    flagThresholdsPivot: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }

        //
        const value = cell.getRow().getData()[formatterParams.pivot];
        var isDefined = false;
        var label = null;
        for (const i in formatterParams.thresholds) {
            if (value < formatterParams.thresholds[i]){
                label = formatterParams.labels[i];
                isDefined = true;
                break;
            }
        }
        if(!isDefined){
            const arrayLenght = formatterParams.labels.length - 1;
            label = formatterParams.labels[arrayLenght];
        }
        return label;
    },
});