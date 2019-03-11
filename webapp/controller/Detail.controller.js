sap.ui.define([
	"sap/ui/core/mvc/Controller",
		'sap/m/MessageBox'
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.sap.build.standard.newAppPrototype.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.build.standard.newAppPrototype.view.Detail
		 */
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var oView = this.getView(); 
			var oModel = oView.getModel();
			var oArgs=oEvent.getParameter("arguments");
			oModel.metadataLoaded().then(function() {
				oView.bindElement({
					path: oModel.createKey("/EmployeeSet", {"ID": oArgs.objectID})
					
				});
			});
		}, 
		
		_OnSavePress: function (oEvent) {
			var oView = this.getView(); 
			var oModel = oView.getModel();
			var ID = oView.byId("Id").getText();
			var SLR=oView.byId("SALARY").getValue();
			var AG= oView.byId("AGE").getValue();
			var TextBox=oView.byId("Txt").getText();
			MessageBox.confirm(TextBox,
			{
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				onClose: function(sAction) {
					if (sAction===sap.m.MessageBox.Action.OK) {
						oModel.update(oModel.createKey("/EmployeeSet", {"ID": ID}), {"Salary": SLR}, {"Age": AG});
					}
					sap.m.MessageToast.show("Action selected: " + sAction);
				}
			}
			);
		},
		
		_OnDeletePress: function (oEvent) {
			var oView = this.getView(); 
			var oModel = oView.getModel();
			var ID = oView.byId("Id").getText();
			var TextBox=oView.byId("Txt2").getText();
			MessageBox.confirm(TextBox,
			{
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
			
				onClose: function(sAction) {
					if (sAction===sap.m.MessageBox.Action.OK) {
						oModel.remove(oModel.createKey("/EmployeeSet", {"ID": ID}));
					}
					sap.m.MessageToast.show("Action selected: " + sAction);
				}
			}
			);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.build.standard.newAppPrototype.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.build.standard.newAppPrototype.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.build.standard.newAppPrototype.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});