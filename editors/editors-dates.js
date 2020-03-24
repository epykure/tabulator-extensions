// This module requires moment.js and jquery-ui

Tabulator.prototype.extendModule("edit", "editors", {

    datePlus: function(cell, onRendered, success, cancel, editorParams){
      var cellValue = cell.getValue(),
        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.style.padding = "4px";
        input.style.color = "inherit";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";
        input.value = typeof cellValue !== "undefined" ? cellValue : "";
        onRendered(function(){
          $(input).datepicker({
            onSelect: function(dateStr) {
              var dateselected = $(this).datepicker('getDate');
              var cleandate = (moment(dateselected, "YYYY-MM-DD").format("DD/MM/YYYY"));
              $(input).datepicker("destroy");
              cell.setValue(cleandate, true);
              cancel()},
           });
          input.style.height = "100%";
       });
       return input}

});