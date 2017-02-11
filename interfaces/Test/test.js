"use strict";

var options = {
    mode: 'code',
    history: false,
    modes: ['code', 'form', 'tree', 'view', 'text'], // allowed modes
    error: function(err) {
        alert(err.toString());
    }
};

var editor = new JSONEditor(document.querySelector("#info"), options);
var sensor = new JSONEditor(document.querySelector("#model"), options);

connnection.write();