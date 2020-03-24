

Tabulator.prototype.extendModule("mutator", "mutators", {

    //
    //
    //
    formatNumbers: function(value, data, type, mutatorParams, component){
        if (type == 'edit'){
            const strVal = String(value).toUpperCase();
            //
            if(strVal.endsWith("M")){ value = parseFloat(value.slice(0, -1)) * 1000000};
            if(strVal.endsWith("K")){ value = parseFloat(value.slice(0, -1)) * 1000};
            if(strVal.endsWith("B")){ value = parseFloat(value.slice(0, -1)) * 1000000000};

            //
            if (value < 0){ component.getElement().style.color = mutatorParams.red; }
            else {component.getElement().style.color = mutatorParams.green; }
        }
        return value;
    },

    //
    //
    //
    formatStrings: function(value, data, type, mutatorParams, component){
        if (type == 'edit'){
            if (value in mutatorParams.cssMapping){
                Object.keys(mutatorParams.cssMapping[value]).forEach(function(key){
                    component.getElement().style[key] = mutatorParams.cssMapping[value][key]})
            }
        }
        return value;
    }

});