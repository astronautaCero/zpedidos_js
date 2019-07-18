sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	//"com/zpedidos/js/ZPEDIDOS_JS/controller/BaseController"
], function (Controller, Filter, FilterOperator, BaseController) {
	"use strict";

	return Controller.extend("com.zpedidos.js.ZPEDIDOS_JS.controller.View1", {

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onInit: function () {

			var jsonTemplate = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("com/zpedidos/js/ZPEDIDOS_JS/localService/mockdata",
				"/Ped_HeaderSet.json"));
			jsonTemplate.attachRequestCompleted(function (oEvent) {
				var ModelNEW = oEvent.getSource();
				this.getView().setModel(ModelNEW, "modelData");
			}.bind(this));

		},

		_handleRouteMatched: function (evt) {

		},

		onItemSelected: function (oEvent) {

			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("modelData");
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.getView().byId("productDetail");

			oProductDetailPanel.bindElement({
				path: sPath,
				model: "modelData"
			});
			this.byId("productDetail").setVisible(true);
		},

		onFilterProduct: function (oEvent) {

			// build filter array    
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control     
				oList = this.getView().byId("lst"),
				// get binding for aggregation 'items'     
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("Vbeln", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter    
			// which will make all entries visible again    
			oBinding.filter(aFilter);

		},

		onAdd: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("add");
		}
	});
});