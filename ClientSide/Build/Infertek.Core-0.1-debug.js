/*
	Checks if 'isArray' method is defined for an 'Array' object.
*/
if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) == '[object Array]';
	};
}
if(!Function.isFunction) {
	Function.isFunction = function(arg) {
		return Object.prototype.toString.call(arg) == "[object Function]";
	};
}
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
Namespace.Register("Infertek");

Infertek.ScriptManager = {
	LoadScripts: function (scriptsToLoad, afterScriptsLoadedCallback) {
		/// <summary>
		/// Loads scripts provided in <see cref="scriptsToLoad"/> argument.
		/// Scripts in this argument are ordered in C++ like style - most basic script -> most complex script.
		/// After all scripts has been loaded it calls <see cref="afterScriptsLoadedCallback"/> callback.
		/// </summary>
		/// <param name="scriptsToLoad" type="Array">Ordered collection of scripts to load.</param>
		/// <param name="afterScriptsLoadedCallback" type="Function">Callback to call after all scripts has been loaded.</param>

		if (scriptsToLoad != null && Array.isArray(scriptsToLoad)) {
			if (scriptsToLoad.length > 0) {
				var numberOfLoadedScripts = 0;
				for (var scriptIndex in scriptsToLoad) {
					$.getScript(scriptsToLoad[scriptIndex], function () {
						numberOfLoadedScripts++;
						if(numberOfLoadedScripts == scriptsToLoad.length) {
							if (afterScriptsLoadedCallback != null && Function.isFunction(afterScriptsLoadedCallback)) {
								afterScriptsLoadedCallback();
							}
						}
					});
				}
			} else if (afterScriptsLoadedCallback != null && Function.isFunction(afterScriptsLoadedCallback)) {
				afterScriptsLoadedCallback();
			}
		}
	}
};
