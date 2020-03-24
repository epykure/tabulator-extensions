

Tabulator.prototype.extendModule("edit", "editors", {

    inputPlus:function(cell, onRendered, success, cancel, editorParams){
      var cellValue = cell.getValue(), input = document.createElement("input");
      input.setAttribute("type", "text");
      for (var k in editorParams){input.setAttribute(k, editorParams[k])};
      if (editorParams.refresh === undefined || editorParams.refresh === true){
        input.onkeydown = function() {var key = event.keyCode || event.charCode;
          if(key == 8 || key == 46){input.value =""; return false}}};
      if (editorParams.emptyFirst === true){
        input.onkeypress = function() {
          if (cellValue != "" && input.value == cellValue){input.value = ""; cellValue = ""}}};

      input.style.padding = "4px"; input.style.width = "100%";
      input.style.color = "inherit";
      input.style.textAlign = "center";
      input.style.boxSizing = "border-box";
      input.value = typeof cellValue !== "undefined" ? cellValue : "";
      onRendered(function () {input.focus(); input.style.height = "100%"});
      function onChange(e) {
        if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
          success(input.value)} else {cancel()}}
      input.addEventListener("change", onChange);
      input.addEventListener("blur", onChange);
      input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 13:
            if(cell.getTable().options.selectable){
              cell.getRow().deselect(); cell.getRow().toggleSelect()};
            success(input.value);
            cell.getElement().focus();
            break;

          case 27:
            cancel();
            break;
        }
      });
      return input
   },

  inputExcel: function(cell, onRendered, success, cancel, editorParams){
      var cellValue = cell.getValue(), input = document.createElement("input");
      input.setAttribute("type", "text");
      for (var k in editorParams){input.setAttribute(k, editorParams[k])};
      if (editorParams.refresh === undefined || editorParams.refresh === true){
        input.onkeydown = function() {var key = event.keyCode ||event.charCode;
          if(key == 8 || key == 46){input.value ="";return false}}};
      if (editorParams.emptyFirst === true){
        input.onkeypress = function() {
          if (cellValue != "" && input.value == cellValue){input.value = ""; cellValue = ""}}};
      input.style.padding = "4px"; input.style.width = "100%";
      input.style.color = "inherit";
      input.style.textAlign = "center";
      input.style.boxSizing = "border-box";
      input.value = typeof cellValue !== "undefined" ? cellValue : "";
      onRendered(function () {input.focus(); input.style.height = "100%"});
      function onChange(e) {
        if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
          success(input.value)} else {cancel()}}
      input.addEventListener("change", onChange);
      input.addEventListener("blur", onChange);
      input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 13:
            success(input.value);
            cell.getElement().focus();
            break;

          case 27:
            cancel();
            break;

          case 66:
            success(input.value * 1000000000);
            cell.getElement().focus();
            e.stopPropagation(); e.preventDefault();
            break;

          case 75:
            success(input.value * 1000);
            cell.getElement().focus();
            e.stopPropagation(); e.preventDefault();
            break;

          case 77:
            success(input.value * 1000000);
            cell.getElement().focus();
            e.stopPropagation(); e.preventDefault();
            break;
        }
      });
      return input
  }

});
