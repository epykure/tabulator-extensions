
# Tabulator extensions

A set of bespoke components for tabulators in order to 

Those components are maintained by Epyk Team and they are designed to work with the Python Epyk-ui.
The goal of this project being to extend the rich Python ecosystem with selected JavaScript features and render modern and interactive pages.

![](https://raw.githubusercontent.com/epykure/epyk-ui/master/epyk/static/images/epyklogo_whole_big.png)

If you are interested in this project please have a look at the below repositories
- [Epyk-ui](https://github.com/epykure/epyk-ui)
- [Epyk-studio](https://github.com/epykure/epyk-studio)


Presentation
================================
This repository will provide some pre defined Formatters, Editors and Mutators for Tabulators.
Those bespoke components need to be integrated to your project in a traditional way and they will enrich the scope of features 
already available in Tabulator.

If you need more details regarding this concept please refer to the official [Tabulator website](https://github.com/epykure/epyk-studio).
The documentation is really good and the set of examples allow to understand quickly those concepts.


Quickstart
================================

From HTML / Javascript

```html
<script language="javascript" type="text/javascript" src="https://unpkg.com/tabulator-tables@4.8.2/dist/js/tabulator.min.js"></script>
<script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js"></script>
<script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/tabulator-extensions@0.0.2/formatters/formatters-numbers.js"></script>
<script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/tabulator-extensions@0.0.2/formatters/formatters-inputs.js"></script>
<link rel="stylesheet" href="https://unpkg.com/tabulator-tables@4.8.2/dist/css/tabulator.min.css" type="text/css">

<body style="font-size:12px;font-family:Calibri;margin:0px;background:#FFFFFF;color:#000000"><div id="table_2005485509544" style="font-size:inherit;font-family:inherit;box-sizing:border-box;width:100%;background:None" class="cssdivnoborder csstabulator"></div></body>
<script>
var table_2005485509544_obj =  new Tabulator("#table_2005485509544", {layout: "fitColumns", columns: [{field: "name", title: "name"},{field: "type", title: "type"},{field: "rating", title: "rating", formatter: "cssStyle", formatterParams: {"css": {"color": "blue"}}},{field: "change", title: "change", formatter: "numbers", formatterParams: {"format": "%v", "symbol": "", "precision": 6, "thousand": ",", "decimal": "."}}], selectable: false, index: "_row", pagination: "local", paginationSize: 25, resizableRows: false, movableColumns: true, data: [{"name": "C", "type": "code", "rating": 17.07, "change": 12.82}, {"name": "Java", "type": "code", "rating": 16.28, "change": 0.28}, {"name": "Python", "type": "script", "rating": 9.12, "change": 1.29}, {"name": "C++", "type": "code", "rating": 6.13, "change": -1.97}, {"name": "C#", "type": "code", "rating": 4.29, "change": 0.3}, {"name": "Visual Basic", "type": "script", "rating": 4.18, "change": -1.01}, {"name": "JavaScript", "type": "script", "rating": 2.68, "change": -0.01}, {"name": "PHP", "type": "script", "rating": 2.49, "change": 0}, {"name": "SQL", "type": "script", "rating": 2.09, "change": -0.47}, {"name": "R", "type": "script", "rating": 1.85, "change": 0.9}]})
</script>
```

From Python using Epyk

```py
from epyk_studio.core.Page import Report
from epyk.tests import mocks

page = Report()
table = page.ui.table(mocks.languages)

table.get_column("rating").exts.formatters.style({"color": 'blue'})
table.get_column("change").exts.formatters.number(precision=6)
```

In a static web page

#### Client side

```py
from epyk_studio.core.Page import Report
from epyk.core.data import events

page = Report()
table = page.ui.table()

page.ui.button("click").click([
  page.js.post("/table").onSuccess([
    table.js.columns(events.data['columns']), table.build(events.data["data"])
  ])
])
```

#### Server Side

In a dynamic web page (using Flask)

```py
import random

@app.route('/table', methods=["POST"])
def table():
  import random
  
  line_data = [{"x": i, "y": random.randint(1, 100), "y1": random.randint(1, 100), "y2": random.randint(1, 100)} for i in range(10)]
  records = [{{"col_%s" % j: random.randint(1, 100} for j in range(10)} for i in range(50)]
  
  return jsonify({
        'columns': [{'formatter': 'cssStyle', 'formatterParams': {'css': {"color": 'red', 'background-color': 'blue'}}, 
                                        'field': "col_%s" % j, 'title': "col_%s" % j} for j in range(10)],
        'data': records, 'line_data': line_data, 'bar_data': line_data, 'multi_data': line_data
    })
```


Compatibility
================================

Epyk is compatible with the most common Web Python Frameworks (Flask and Django).
By default, the server package embeds a Flask app as it is easier to install and ready to use.

Usage
======

This package contains the below features and they can be used like any
standard Tabulator object supplying the expected set of parameters.

Those features are groups in each files per type of object.

### Editors

#### Dates

<code><i>datePlus</i></code>: This will display a proper DatePicker object in the same using as underlying component 
Jquery UI. 

*Epyk is importing the dependancies on the fly on the Js side please make sure the import is satisfyed.*

#### Inputs

<code><i>inputPlus</i></code>: 

<code><i>inputExcel</i></code>: This will properly consider the letter passed in the cell and it will convert them to multipliers.
This is a way to have shortcuts for K, M factors.


#### Selects

<code><i>selectPlus</i></code>:

<code><i>selectConditiions</i></code>:

<code><i>selectMultiConditions</i></code>:


### Formatters

#### Drops

<code><i>dragAndDrop</i></code>: 


#### Icons

<code><i>icon</i></code>:

<code><i>iconMapPivot</i></code>:

 
#### Inputs

<code><i>cssStyle</i></code>:

<code><i>cssStylePivot</i></code>:

<code><i>password</i></code>:

<code><i>lookupPivot</i></code>:

<code><i>labelThresholds</i></code>:

<code><i>flagThresholdsPivot</i></code>: 

#### Numbers
Those Formmatters will use as underlying package the **accounting.js** module.

Namely the below formatter parameters can be supplied in order to benefit from the various features available in this library.
For more details about the Accounting library, please have a look at the [official website](http://openexchangerates.github.io/accounting.js/)
 - css: Dictionary. The CSS attributes for the cell (Optional)
 - decimal: String. decimal point separator default "."
 - thousand: String. thousands separator default ","
 - precision: Integer. decimal places default 0
 - symbol: default currency symbol is ''
 - format: String. "%s%v" controls output: %s = symbol, %v = value/number (can be object: see below)

<code><i>numbers</i></code>: 
    formatterParams: {css: {{}}}

<code><i>numbersFormat</i></code>: 
    formatterParams: {css: {{}}, colors:[], threshold: value, color: }
    
<code><i>numbersDifference</i></code>:
    formatterParams: {css: {{}}, colors:[], threshold: value, color: }

with:
    css: Dictionary. The CSS attributes which will be applied to the cell object
    color: String. The color of the cell content

or 
    css: Dictionary. The CSS attributes which will be applied to the cell object. (Optional) 
    threshold: String. Float. The pivot value to change the color of the cell content
    colors: [colorelow, colorAbove]

<code><i>numbersThreshold</i></code>:
    formatterParams: {css: {{}}, thresholds:[]}

<code><i>numbersThresholdPivot</i></code>:
    formatterParams: {css: {{}}, thresholds:[], pivot: columnName}

<code><i>numbersIntensity</i></code>:
    formatterParams: {css: {}, steps:[], colors: [], intensity: columnName}

<code><i>numbersQuality</i></code>:
    formatterParams: {css: {}, steps:[], colors: [], intensity: columnName, colors2: [] , quantity: columnName}

This module is using as underlying d3.js

### Mutators

From Tabulator's [website](http://tabulator.info/docs/4.0/mutators):

Mutators (setters) and Accessors (getters) allow you to manipulate the table data as it enters and leaves your Tabulator, allowing you to convert values for use in your table and then change them again as they leave.

#### Inputs

<code><i>formatNumbers</i></code>

<code><i>formatStrings</i></code>

Tips
==================
If you want to surcharge an existing feature without having to reimplement the entiere component you can do the below:

For example the below will change the return cell object and add extra CSS styles
```js
function(cell, formatterParams){ 
    const cssAttrs = formatterParams.css;
    var cell = cell.getTable().modules.format.getFormatter('number').call(cell.getTable().modules.format, cell, formatterParams);
    let frag = document.createRange().createContextualFragment(cell).firstChild;
    Object.keys(cssAttrs).forEach(function(key){frag.style[key] = cssAttrs[key]}); 
    return frag; }
```

From Epyk in Python you can do the below:

```py
table.get_column('column_name').formatters.wrapper('number', formatterParams)
```

Next features
==================

More features will be implemented in this package to:
- make visible data overrides
- 


Contributing
==================

All those projects are collaborative projects so please feel free to give your feedbacks but also to help improve its by fixing bugs and
bringing new ideas. This will benefit both the JavaScript ecosystem but also the Python community using Epyk to generate 
websites.

Please create an issue in this project for any request.
