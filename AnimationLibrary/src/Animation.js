Infertek = { Animations: {} };

Infertek.Animations.Animation = function (animatedElement, options) {
	/// <summary>
	/// Inicjuje instancję animacji obiektu DOM o podanych parametrach.
	/// Ustawienia animacji są zawarte w argumencie <c>options</c>
	/// </summary>
	/// <param name="animatedElement" domElement="true">Obiekt DOM, do którego przypisana będzie ta animacja.</param>
	/// <param name="options" type="Object">
	/// Ustawienia animacji. Przechowują wartości wymagane do poprawnego skonfigurowania animacji elementu.
	/// <para>Dostępne wartości to:</para>
	/// <para>animationDirection - kierunek animacji: 1 - do przodu, -1 - do tyłu.</para>
	/// <para>properties - ustawienia animacji właściwości.</para>
	/// <para>timeScale - skala czasu. do spowolnienia...</para>
	/// </param>

	this.animatedElement = animatedElement;
	this.animationDirection = 1;
	this.timeScale = 1;
	this.properties = [];

	if (options !== null) {
		if (options.animationDirection !== null)
			this.animationDirection = options.animationDirection;
		if (options.properties !== null && Array.isArray(options.properties)) {
			this.loadProperties(options.properties);
		}
		if (options.timeScale !== null)
			this.timeScale = options.timeScale;
		if (options.complete !== null)
			this.animationCompleted = options.complete;
	}
};

Infertek.Animations.Animation.prototype = {
	getAnimatedElement: function () {
		/// <summary>
		/// Pobiera instancję animowanego obiektu DOM.
		/// Instancja ta jest ustawiana w konstruktorze.
		/// </summary>
		/// <returns domElement="true" />
        
		return this.animatedElement;
	},
	getAnimationDirection: function () {
		/// <summary>
		/// Pobiera kierunek 'przepływu' animacji.
		/// </summary>
		/// <returns type="Number" />
        
		return this.animationDirection;
	},
	setAnimationCompletedCallback: function(callback) {
		/// <summary>
		///	Ustawia callback, jaki ma być wywoływany po zakończeniu animacji.
		/// </summary>
		/// <param name="callback">Funkcja callback jaka ma być ustawiona do tej animacji</param>
        
		this.animationCompleted = callback;
	},
	loadProperties: function (propertiesConfiguration) {
		/// <summary>
		/// Wczytuje konfigurację animacji własciwości obiektu DOM
		/// z konfiguracji podanej w argumencie.
		/// </summary>
		/// <param name="propertiesConfiguration">Konfiguracja animacji właściwości do wczytania.</param>

		for (var propertyConfigurationIndex = 0; propertyConfigurationIndex < propertiesConfiguration.length; propertyConfigurationIndex++) {
			this.properties.push(new window.Infertek.Animations.AnimationProperty(this, propertiesConfiguration[propertyConfigurationIndex]));
		}
	},
	performAnimationFromStart: function () {
        /// <summary>
        /// Method called every time animation is called.
        /// Instructs all animations to recalculate.
        /// </summary>
        
		for (var animationIndex = 0; animationIndex < this.animationsToProcess.length; animationIndex++) {
			this.animationsToProcess[animationIndex].processAnimation(((+new Date()) - this.animationStartTime) * this.timeScale);
			if (this.animationsToProcess[animationIndex].animationHasEnded) {
				this.animationsToProcess.splice(animationIndex, 1);
			}
		}
		if (this.animationsToProcess.length === 0) {
			if (this.animationCompleted !== null) {
				this.animationCompleted(this);
			}
			this.stop();
		}
	},
	performAnimationFromEnd: function () {
        /// <summary>
        /// Method called every time animation is called.
        /// Instructs all animations to recalculate.
        /// </summary>
        
		for (var animationIndex = 0; animationIndex < this.animationsToProcess.length; animationIndex++) {
			this.animationsToProcess[animationIndex].processAnimation(this.animationsToProcess[animationIndex].getTotalAnimationTime() - (((+new Date()) - this.animationStartTime) * this.timeScale));
			if (this.animationsToProcess[animationIndex].animationHasEnded) {
				this.animationsToProcess.splice(animationIndex, 1);
			}
		}
		if (this.animationsToProcess.length === 0) {
			if (this.animationCompleted !== null) {
				this.animationCompleted(this);
			}
			this.stop();
		}
	},
	reverse: function () {
		/// <summary>
		/// Odwraca kierunek odtwarzania animacji.
		/// </summary>
        
		if (this.animationHasStarted)
			throw "Cannot reverse already running animation!";
            
		this.animationDirection *= -1;
	},
	start: function () {
		/// <summary>
		/// Rozpoczyna proces animowania obiektu DOM.
		/// </summary>
        
		var thisAnimationInstance = this;
		this.animationStartTime = +new Date();
		this.animationHasStarted = true;
		for (var animationPropertyIndex = 0; animationPropertyIndex < this.properties.length; animationPropertyIndex++) {
			this.properties[animationPropertyIndex].startAnimation(this.animationDirection);
		}
		this.animationsToProcess = this.properties.slice();
		if (this.animationDirection == 1) {
			this.animationInterval = setInterval(function () {
				thisAnimationInstance.performAnimationFromStart();
			}, 16); // 16 ms tylko dlatego, bo ekran ma odświeżanie ~60 Hz
		} else {
			this.animationInterval = setInterval(function () {
				thisAnimationInstance.performAnimationFromEnd();
			}, 16); // 16 ms tylko dlatego, bo ekran ma odświeżanie ~60 Hz
		}
	},
	stop: function () {
		/// <summary>
		/// Kończy proces animowania.
		/// Odpina zdarzenia od przeglądarki i zwalnia niepotrzebne zasoby.
		/// </summary>
        
		clearInterval(this.animationInterval);
		this.animationHasStarted = false;
	}
};