Namespace.Register("Infertek.Animations");

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

	if (options != null) {
		if (options.animationDirection != null)
			this.animationDirection = options.animationDirection;
		if (options.properties != null && Array.isArray(options.properties)) {
			this.loadProperties(options.properties);
		}
		if (options.timeScale != null)
			this.timeScale = options.timeScale;
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
	loadProperties: function (propertiesConfiguration) {
		/// <summary>
		/// Wczytuje konfigurację animacji własciwości obiektu DOM
		/// z konfiguracji podanej w argumencie.
		/// </summary>
		/// <param name="propertiesConfiguration">Konfiguracja animacji właściwości do wczytania.</param>

		for (var propertyConfigurationIndex in propertiesConfiguration) {
			this.properties.push(new window.Infertek.Animations.AnimationProperty(this, propertiesConfiguration[propertyConfigurationIndex]));
		}
	},
	performAnimationFromStart: function () {
		for (var animationPropertyIndex in this.properties) {
			this.properties[animationPropertyIndex].processAnimation(((+new Date()) - this.animationStartTime) * this.timeScale);
		}
	},
	performAnimationFromEnd: function () {
		for (var animationPropertyIndex in this.properties) {
			this.properties[animationPropertyIndex].processAnimation(this.properties[animationPropertyIndex].getTotalAnimationTime() - (((+new Date()) - this.animationStartTime) * this.timeScale));
		}
	},
	reverse: function () {
		/// <summary>
		/// Odwraca kierunek odtwarzania animacji.
		/// </summary>
		if (this.animationHasStarted)
			throw new InvalidOperationException("Cannot reverse already running animation!");
		this.animationDirection *= -1;
	},
	start: function () {
		/// <summary>
		/// Rozpoczyna proces animowania obiektu DOM.
		/// </summary>
		var thisAnimationInstance = this;
		this.animationStartTime = +new Date();
		this.animationHasStarted = true;
		for (var animationPropertyIndex in this.properties) {
			this.properties[animationPropertyIndex].startAnimation(this.animationDirection);
		}
		if (this.animationDirection == 1) {
			this.animationInterval = setInterval(function () {
				thisAnimationInstance.performAnimationFromStart();
			}, 10);
		} else {
			this.animationInterval = setInterval(function () {
				thisAnimationInstance.performAnimationFromEnd();
			}, 10);
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