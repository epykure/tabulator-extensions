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
        return accounting.formatMoney(cell.getValue(), formatterParams);
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
        return accounting.formatMoney(cell.getValue(), formatterParams);
    },

    // Format the Number as a currency with default formattings
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