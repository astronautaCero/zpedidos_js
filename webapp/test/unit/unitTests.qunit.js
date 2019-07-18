/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/zpedidos/js/ZPEDIDOS_JS/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});