

Tabulator.prototype.extendModule("format", "formatters", {

    /**

    **/
    dragAndDrop: function(cell, formatterParams){
      var cellElement = cell.getElement();
      if (typeof formatterParams.css !== 'undefined'){
        // Update the CSS Style attributes
        Object.keys(formatterParams.css).forEach(function(key){
            cell.getElement().style[key] = formatterParams.css[key]})}

      //
      cellElement.ondragover = function(e) { event.preventDefault() };
      cellElement.addEventListener('drop', (function(cell){
        return function(){
          var pos = -1; var rowIndex = cell.getRow().getPosition(); var cells = cell.getRow().getCells();
          var row = cell.getRow();
          cells.forEach(function(c, i){
            if(c.getColumn().getField() == cell.getColumn().getField() ) { pos = i } });

          event.dataTransfer.getData("text").trim().split(formatterParams.rowDelimiter).forEach(function(line){
            line.trim().split(colDelimiter).forEach(function(v, j){ cells[pos + j].setValue(v) });
            row = row.getNextRow(); cells = row.getCells();
          })
        }
        })(cell)
     );
     return cell.getValue();
   }
}