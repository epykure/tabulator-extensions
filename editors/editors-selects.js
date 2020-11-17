

Tabulator.prototype.extendModule("edit", "editors", {

   //
   //
   //  - editorParams: a list or a dictionary like {"options": [], tags: {}, css: {}}
   //  TODO: Fix the problem with the bootstrap module
   //
   jqSelect: function(cell, onRendered, success, cancel, editorParams){
        var cellValue = cell.getValue(); var mappedValue = "";
        var editorItems = editorParams.default; var row = cell.getRow().getData();
        for (k in editorParams){editorItems = editorParams[k]};
        var select = document.createElement("select");
        if(Array.isArray(editorParams)){
          editorParams.forEach(function(k){
            var option = document.createElement("option"); option.text = k; option.value = k;
            if (cellValue == k){ option.selected = true};
            select.add(option)})
        }else{
          for (k in editorParams.options){
            var option = document.createElement("option"); option.text = editorParams.options[k]; option.value = k;
            if (cellValue == k){ option.selected = true};
            select.add(option)}
        }

        select.style.padding = "4px";
        select.style.width = "100%";
        select.style.color = "black";
        select.style.textAlign = "center";
        select.style.boxSizing = "border-box";

        if (typeof editorParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(editorParams.css).forEach(function(key){
                cell.getElement().style[key] = editorParams.css[key]})}

        if (typeof editorParams.tags !== 'undefined'){
            Object.keys(editorParams.tags).forEach(function(key){
                select.setAttribute(key, editorParams.tags[key])})}

        onRendered(function(){
            $(select).selectpicker();
            select.style.color = 'inherit';

        });
        return select;
   },

   //
   //
   //  - editorParams: a list or a dictionary like {"options": [], tags: {}, css: {}}
   //
   selectPlus: function(cell, onRendered, success, cancel, editorParams){
        var cellValue = cell.getValue(); var mappedValue = "";
        var editorItems = editorParams.default; var row = cell.getRow().getData();
        for (k in editorParams){editorItems = editorParams[k]};
        var select = document.createElement("select");
        if(Array.isArray(editorParams)){
          editorParams.forEach(function(k){
            var option = document.createElement("option"); option.text = k; option.value = k;
            if (cellValue == k){ option.selected = true};
            option.style.color = 'black';
            select.add(option)})
        }else{
          for (k in editorParams.options){
            var option = document.createElement("option"); option.text = editorParams.options[k]; option.value = k;
            if (cellValue == k){ option.selected = true};
            option.style.color = 'black';
            select.add(option)}
        }

        select.style.padding = "4px";
        select.style.width = "100%";
        select.style.color = "black";
        select.style.textAlign = "center";
        select.style.boxSizing = "border-box";

        if (typeof editorParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(editorParams.css).forEach(function(key){
                cell.getElement().style[key] = editorParams.css[key]})}

        if (typeof editorParams.tags !== 'undefined'){
            Object.keys(editorParams.tags).forEach(function(key){
                select.setAttribute(key, editorParams.tags[key])})}

        onRendered(function(){select.focus();
          select.style.color = 'inherit'});
        select.onchange = function(){success(this.value); cell.getElement().focus()};
        select.onblur = function(){success(this.value)};
        if(cellValue == 'N/A'){input = document.createElement("input");
          input.style.padding = "4px"; input.style.width = "100%"; input.style.color = "inherit";
          input.style.textAlign = "center"; input.value = cellValue;
          input.setAttribute("type", "text"); input.style.color = "grey"; input.style.fontStyle = "italic";
          input.setAttribute("title", "Not Applicable"); input.setAttribute("readonly", true); return input}
        return select;
   },

   //
   //
   //
   selectConditions: function(cell, onRendered, success, cancel, editorParams){
        var editorItems = editorParams.default; var row = cell.getRow().getData();
        for (k in editorParams.values){
          if (row[editorParams.key] == k){
            editorItems = editorParams.values[k];
            break}};

        var select = document.createElement("select");
        editorItems.forEach(function(r){
          var option = document.createElement("option");
          option.text = r; option.value = r;select.add(option)});
        select.style.padding = "4px";
        select.style.width = "100%";
        select.style.boxSizing = "border-box";

        if (typeof editorParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(editorParams.css).forEach(function(key){
                cell.getElement().style[key] = editorParams.css[key]})}

        if (typeof editorParams.tags !== 'undefined'){
            Object.keys(editorParams.tags).forEach(function(key){
                select.setAttribute(key, editorParams.tags[key])})}

        select.value = cell.getValue();
        onRendered(function(){select.focus()});
        select.onchange = function(){success(this.value); cell.getElement().focus()};
        select.onblur = function(){success(this.value)};
        if(cell.getValue() == 'N/A'){return 'N/A'}
        else{ return select}
    },

   //
   //
   //
   selectMultiConditions: function(cell, onRendered, success, cancel, editorParams){
        var editorItems = editorParams.default; var row = cell.getRow().getData();
        var itemFound = false;
        for(var l=0 ;  l < editorParams.keys.length; l++) {
          for (k in editorParams.values){
            if (row[editorParams.keys[l]] == k){
              editorItems = editorParams.values[k];
              itemFound = true; break}};
          if (itemFound){break}
        }
        var select = document.createElement("select");
        editorItems.forEach(function(r){
          var option = document.createElement("option");
          option.text = r; option.value = r;select.add(option)});
        select.style.padding = "4px";
        select.style.width = "100%";
        select.style.boxSizing = "border-box";

        if (typeof editorParams.css !== 'undefined'){
            // Update the CSS Style attributes
            Object.keys(editorParams.css).forEach(function(key){
                cell.getElement().style[key] = editorParams.css[key]})}

        if (typeof editorParams.tags !== 'undefined'){
            Object.keys(editorParams.tags).forEach(function(key){
                select.setAttribute(key, editorParams.tags[key])})}

        select.value = cell.getValue();
        onRendered(function(){select.focus()});
        select.onchange = function(){success(this.value); cell.getElement().focus()};
        select.onblur = function(){success(this.value)};
        if(cell.getValue() == 'N/A'){return 'N/A'}
        else{ return select}
    }

});

