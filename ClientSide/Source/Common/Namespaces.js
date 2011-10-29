var Namespace =
{
	Register: function (namespaceName) {
		/// <summary>
		/// Registers namespace with specified name.
		/// If namespace with specified name already exists, method does NOT override it.
		/// </summary>
		/// <param name="namespaceName">Name of namespace to create.</param>
		var chk;
		var cob = "";
		var spc = namespaceName.split(".");
		for (var i = 0; i < spc.length; i++) {
			if (cob != "") { cob += "."; }
			cob += spc[i];
			chk = this.Exists(cob);
			if (!chk) { this.Create(cob); }
		}
	},

	Create: function (source) {
		/// <summary>
		/// Creates specified object as member of 'window' object.
		/// </summary>
		/// <param name="source">Object to create.</param>
		eval("window." + source + " = new Object();");
	},

	Exists: function (source) {
		/// <summary>
		/// Checks if object with specified name already exists.
		/// </summary>
		/// <param name="source">Object to check.</param>
		/// <returns type="bool">Does specified object already exist.</returns>
		var ne = false; 
		eval("try{if(" + source + "){ne = true;}else{ne = false;}}catch(err){ne=false;}");
		return ne;
	}
};