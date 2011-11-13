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
				for (var scriptIndex = 0; scriptIndex < scriptsToLoad.length; scriptIndex++) {
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