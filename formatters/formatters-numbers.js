// This module requires accounting.js and d3.js

Tabulator.prototype.extendModule("format", "formatters", {

    // Format the Number as a currency
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - decimal: String. decimal point separator default "."
    //      - thousand: String. thousands separator default ","
    //      - precision: Integer. decimal places default 0
    //      - symbol: default currency symbol is ''
    //      - format: String. "%s%v" controls output: %s = symbol, %v = value/number (can be object: see below)
    //
    numbers: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }
        //
        if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
        if(typeof formatterParams.precision === "undefined"){formatterParams.precision = 0};
        if(typeof formatterParams.thousand === "undefined"){formatterParams.thousand = ","};
        return accounting.formatMoney(cell.getValue(), formatterParams);
    },

    // Format the cell with an HTML arrow in the color of the sign of the change
    // if the value is positive the arrow will up and green
    // if the value is positive the arrow will down and red
    // No mandatory formatter, the css is optional to format the style of the cell.
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //
    trend: function(cell, formatterParams, onRendered){
        if (typeof formatterParams.css !== 'undefined'){
                // Update the CSS Style attributes
                Object.keys(formatterParams.css).forEach(function(key){
                    cell.getElement().style[key] = formatterParams.css[key] }) }
        const div = document.createElement('div');
        div.style.width = 10 + "px" ;
        div.style.margin = "auto" ;
        if (cell.getValue() > 0){
            div.innerHTML = "&#9650;";
            cell.getElement().style["color"] = "#006100"}
        else if (cell.getValue() < 0) {
            div.innerHTML = "&#9660;";
            cell.getElement().style["color"] = "#9C0006"}

        // Add some CSS tags to the icon holder
        if (typeof formatterParams.tags !== 'undefined'){
            Object.keys(formatterParams.tags).forEach(function(key){
                div.setAttribute(key, formatterParams.tags[key])})}

        // Add events to the cell
        if (typeof formatterParams.events !== 'undefined'){
            Object.keys(formatterParams.events).forEach(function(key){
                div.addEventListener(key, eval('(function(){var data = cell.getRow().getData() ; '+ formatterParams.events[key] +'})'))})}

        return div
    },

    // Format the cell with some symbol to give visual information related to the input data
    // The display will render:
    //      - The value of the cell in a number format
    //      - The quality of the data with a traffic light
    //      - A percentage
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - decimal: String. decimal point separator default "."
    //      - thousand: String. thousands separator default ","
    //      - precision: Integer. decimal places default 0
    //      - symbol: default currency symbol is ''
    //      - format: String. "%s%v" controls output: %s = symbol, %v = value/number (can be object: see below)
    //
    // The cell object must be a dictionary with the following fields
    //      - value: Float the value of the cell
    //      - flag: Boolean the quality flag
    //      - move: Float the percentage
    //
    detailed: function(cell, formatterParams){
        const div = document.createElement('div');
        div.style.margin = 0; div.style.padding = 0;
        var moveVal; var cellVal; var cellFlag;
        if(typeof formatterParams.flag !== "undefined"){cellFlag = cell.getRow().getData()[formatterParams.flag]} else {cellFlag = cell.getValue().flag}
        if(typeof formatterParams.move !== "undefined"){moveVal = cell.getRow().getData()[formatterParams.move]} else {moveVal = cell.getValue().move}
        if(typeof formatterParams.value !== "undefined"){cellVal = cell.getValue()} else {cellVal = cell.getValue().value}
        const value = document.createElement('div');
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }

        if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
        if(typeof formatterParams.precision === "undefined"){formatterParams.precision = 0};
        if(typeof formatterParams.thousand === "undefined"){formatterParams.thousand = ","};
        if (typeof cellVal !== "undefined"){value.innerHTML = accounting.formatMoney(cellVal, formatterParams);}
        else {value.innerHTML = ""}
        value.style.display = "inline-block";
        value.style.marginRight = "5px";
        value.style.fontWeight = "bold";
        value.style.verticalAlign = "top";
        const flag = document.createElement('div');
        flag.style.display = "inline-block";
        flag.style.width = "10px";
        if (typeof cellFlag !== "undefined"){
            if (cellFlag == 1){flag.style["background"] = "#006100"}
            else if (cellFlag == 2){flag.style["background"] = "#FF9900"}
            else {flag.style["background"] = "#9C0006"}}
        flag.style.marginRight = "20px";
        flag.style.height = "10px";
        flag.style.border = "1px solid grey";
        flag.style.verticalAlign = "sub";
        flag.style.borderRadius = "10px";
        const move = document.createElement('div');
        if (typeof moveVal !== "undefined"){
            move.innerHTML = moveVal;
        }
        move.style.fontSize = "8px";
        move.style.display = "inline-block";

        div.appendChild(value);
        div.appendChild(flag);
        div.appendChild(move);
        return div
    },

    //
    //
    // formatterParams:
    //      - css:
    //      - is_number:
    //      - format:
    //      - precision:
    //      - precision:
    //
    small: function(cell, formatterParams){
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]})}

        const div = document.createElement('div');
        if (typeof cell.getValue() !== "undefined"){
            if (formatterParams.is_number){
                if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
                if(typeof formatterParams.precision === "undefined"){formatterParams.precision = 0};
                if(typeof formatterParams.thousand === "undefined"){formatterParams.thousand = ","};
                div.innerHTML = accounting.formatMoney(cell.getValue(), formatterParams)}
            else {
                div.innerHTML = cell.getValue()}
            div.style.fontSize = "8px"
        }
        return div
    },

    // Format the column with some colors corresponding to the value.
    // This formatter uses D3 to generate the color scale fro the steps
    //
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - colors: A list with [colorNegative, colorPositive]
    //      - steps: An integer to get the number of steps of color (default 100)
    scale: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }
        var colorsNeg = (typeof formatterParams.colors === 'undefined') ? ["#FFFFFF", "#C00000"]: ["#FFFFFF", formatterParams.colors[0]];
        var colorsPos = (typeof formatterParams.colors === 'undefined') ? ["#FFFFFF", "#3bb194"]: ["#FFFFFF", formatterParams.colors[1]];
        const colorNegFnc = d3.scaleLinear().domain([1, (typeof formatterParams.steps === 'undefined') ? 100 : formatterParams.steps]).range(colorsNeg);
        const colorPosFnc = d3.scaleLinear().domain([1, (typeof formatterParams.steps === 'undefined') ? 100 : formatterParams.steps]).range(colorsPos);
        const value = (typeof formatterParams.intensity === 'undefined') ? cell.getValue() : cell.getRow().getData()[formatterParams.intensity]
        if (typeof value !== "undefined"){
            if (value > 0){cell.getElement().style.backgroundColor = colorPosFnc(value)}
            else {cell.getElement().style.backgroundColor = colorNegFnc(Math.abs(value))}
            if (formatterParams.is_number){
                if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
                return accounting.formatMoney(cell.getValue(), formatterParams)}
        }
        return cell.getValue();
    },

    //
    //
    numbersPrevious: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        cell.getElement().style["font-style"] = 'italic';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }
        if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
        if(typeof formatterParams.precision === "undefined"){formatterParams.precision = 0};
        if(typeof formatterParams.thousand === "undefined"){formatterParams.thousand = ","};
        return accounting.formatMoney(cell.getValue(), formatterParams);
    },

    // Format the Number as a currency with default formatting
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - decimal: String. decimal point separator default "."
    //      - thousand: String. thousands separator default ","
    //      - precision: Integer. decimal places default 0
    //      - symbol: default currency symbol is ''
    //      - format: String. "%s%v" controls output: %s = symbol, %v = value/number (can be object: see below)
    //
    numbersFormat: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }

        //
        const params = Object.assign({}, {"precision": 0}, formatterParams);
        if (typeof formatterParams.colors !== 'undefined'){
                const threshold = (typeof formatterParams.threshold !== 'undefined')? 0: formatterParams.threshold;
                if (cell.getValue() < threshold){ cell.getElement().style.color = formatterParams.colors[0] }
                else { cell.getElement().style.color = formatterParams.colors[1] }}
        return accounting.formatMoney(cell.getValue(), params);
    },

    // Format the numbers as a difference
    // formatterParams:
    //      - css: Dictionary. The CSS attributes for the cell (Optional)
    //      - decimal: String. decimal point separator default "."
    //      - thousand: String. thousands separator default ","
    //      - precision: Integer. decimal places default 0
    //      - symbol: default currency symbol is ''
    //      - format: String. "%s%v" controls output: %s = symbol, %v = value/number (can be object: see below)
    //
    numbersDifference: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }

        //
        const params = Object.assign({}, {"format": {'pos': "%v", 'neg': "(%v)", 'zero': " -- "}}, formatterParams);
        if (typeof formatterParams.colors !== 'undefined'){
                const threshold = (typeof formatterParams.threshold !== 'undefined')? 0: formatterParams.threshold;
                if (cell.getValue() < threshold){ cell.getElement().style.color = formatterParams.colors[0] }
                else { cell.getElement().style.color = formatterParams.colors[1] }}
        return accounting.formatMoney(cell.getValue(), params);
    },

    //
    //
    numbersThreshold: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            //
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }

        //
        const value = cell.getValue();
        var isDefined = false;
        for (const i in formatterParams.thresholds) {
            if (value < formatterParams.thresholds[i]){
                Object.keys(formatterParams.css[i]).forEach(function(key){
                    cell.getElement().style[key] = formatterParams.css[i][key]
                })
                isDefined = true;
                break;
            }
        }
        if(!isDefined){
            const arrayLenght = formatterParams.css.length - 1;
            Object.keys(formatterParams.css[arrayLenght]).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[arrayLenght][key]
            })
        }

        return value;
    },

    //
    //
    //      - pivot:
    //      - thresholds:
    //      - css:
    numbersThresholdPivot: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            //
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }

        //
        const value = cell.getRow().getData()[formatterParams.pivot];
        var isDefined = false;
        for (const i in formatterParams.thresholds) {
            if (value < formatterParams.thresholds[i]){
                Object.keys(formatterParams.css[i]).forEach(function(key){
                    cell.getElement().style[key] = formatterParams.css[i][key]
                })
                isDefined = true;
                break;
            }
        }
        if(!isDefined){
            const arrayLenght = formatterParams.css.length - 1;
            Object.keys(formatterParams.css[arrayLenght]).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[arrayLenght][key]
            })
        }

        return cell.getValue();
    },

    // Change the background color of the cell according to a metric defined in the value
    // This can be the value itself (default case) or some other columns in the row dictionary
    // formatterParams:
    //
    numbersIntensity: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }
        const colorFnc = d3.scaleLinear().domain([1, formatterParams.steps]).range(formatterParams.colors);
        const value = (typeof formatterParams.intensity === 'undefined') ? cell.getValue() : cell.getRow().getData()[formatterParams.intensity]
        cell.getElement().style.backgroundColor = colorFnc(value);
        if (formatterParams.is_number){
            if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
            return accounting.formatMoney(cell.getValue(), formatterParams)}

        return cell.getValue();
    },

    //
    //
    // formatterParams:
    //
    numbersQuality: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'right';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key]
            })
        }
        const colorFnc = d3.scaleLinear().domain([1, formatterParams.steps]).range(formatterParams.colors);
        const value = (typeof formatterParams.intensity === 'undefined') ? cell.getValue() : cell.getRow().getData()[formatterParams.intensity]

        const colorFnc2 = (typeof formatterParams.colors2 !== 'undefined') ? d3.scaleLinear().domain([1, formatterParams.steps]).range(formatterParams.colors2) : colorFnc;
        const value2 = (typeof formatterParams.quality === 'undefined') ? cell.getValue() : cell.getRow().getData()[formatterParams.quality]

        cell.getElement().style.padding = 0;

        const div = document.createElement('div');
        div.style.verticalAlign = 'middle';
        div.style.display = 'block';
        div.style.width = "100%";
        div.style.backgroundColor = colorFnc(value);
        div.style.border = "3px solid " + colorFnc2(value);

        if (formatterParams.is_number){
            if(typeof formatterParams.format === "undefined"){formatterParams.format = "%v"};
            div.innerHTML = accounting.formatMoney(cell.getValue(), formatterParams)}
        else {div.innerHTML = cell.getValue()}
        return div;
    },

    //
    //
    // formatterParams:
    //
    trafficLight: function(cell, formatterParams){
        cell.getElement().style["text-align"] = 'center';
        if (typeof formatterParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(formatterParams.css).forEach(function(key){
                cell.getElement().style[key] = formatterParams.css[key] }) }

        const div = document.createElement('div');
        if (cell.getValue() === null){
            div.style.backgroundColor = formatterParams.orange}
        else{
            if(cell.getValue()){div.style.backgroundColor = formatterParams.green}
            else{div.style.backgroundColor = formatterParams.red}
        }
        if (formatterParams.tooltip != null){
            div.setAttribute('title', cell.getRow().getData()[formatterParams.tooltip])}
        div.style.borderRadius = '20px';
        div.style.margin = "auto";
        div.style.width = '20px';
        div.style.height = '20px';
        return div;
    }
});