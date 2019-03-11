sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History", 
	"sap/ui/Device"
], function(BaseController, MessageBox, Utilities, History, Device) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.newAppPrototype.controller.Master", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5c7d05e9f13425010d8c81dd";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onSearchFieldLiveChange: function(oEvent) {
			var sControlId = "sap_m_Page_0-content-sap_m_ObjectList-1551698993187";
			var oControl = this.getView().byId(sControlId);

			// Get the search query, regardless of the triggered event ('query' for the search event, 'newValue' for the liveChange one, 'value' for the liveChange of SelectDialogs).
			var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || oEvent.getParameter("value");
			var sSourceId = oEvent.getSource().getId();

			return new Promise(function(fnResolve) {
				var aFinalFilters = [];

				var aFilters = [];
				// 1) Search filters (with OR)
				if (sQuery && sQuery.length > 0) {

					aFilters.push(new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sQuery));

					aFilters.push(new sap.ui.model.Filter("FLName", sap.ui.model.FilterOperator.Contains, sQuery));

					var iQuery = parseFloat(sQuery);
					if (!isNaN(iQuery)) {
						aFilters.push(new sap.ui.model.Filter("Age", sap.ui.model.FilterOperator.EQ, sQuery));
					}

					var iQuery = parseFloat(sQuery);
					if (!isNaN(iQuery)) {
						aFilters.push(new sap.ui.model.Filter("Salary", sap.ui.model.FilterOperator.EQ, sQuery));
					}

					aFilters.push(new sap.ui.model.Filter("Position", sap.ui.model.FilterOperator.Contains, sQuery));

				}

				var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, false)] : [];
				var oBindingOptions = this.updateBindingOptions(sControlId, {
					filters: aFinalFilters
				}, sSourceId);
				var oBindingInfo = oControl.getBindingInfo("items");
				if (oBindingInfo) {
					oControl.bindAggregation("items", {
						model: oBindingInfo.model,
						path: oBindingInfo.path,
						parameters: oBindingInfo.parameters,
						template: oBindingInfo.template,
						templateShareable: true,
						sorter: oBindingOptions.sorters,
						filters: oBindingOptions.filters
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
	
		_onObjectListItemPress: function(oEvent) {
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		//	var oItem=oEvent.getParameter("listItem") || oEvent.getSource();
			
		//	alert("Salary per week "+oItem.getBindingContext().getProperty("Salary")/4);
		},
		_showDetail: function (oItem) {
			console.log("jfjf");
			console.log(this);
			console.log("jfjf");
			var bReplace= !Device.system.phone;
			this.getOwnerComponent().getRouter().navTo("Detail", {
				objectID: oItem.getBindingContext().getProperty("ID")
			}, bReplace);
		},
		
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Master").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	
	});
}, /* bExport= */ true);
