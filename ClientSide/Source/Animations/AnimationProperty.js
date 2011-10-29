Namespace.Register("Infertek.Animations");

Infertek.Animations.AnimationProperty = function (animation, options) {
	/// <summary>
	/// Inicjuje instancję animacji własciwości.
	/// Zawiera ona logikę zarządzania procesem animowania jednej właściwości obiektu DOM.
	/// </summary>
	/// <param name="animation">Instancja animacji, do której dodana jest ta instancja animacji właściwości.</param>
	/// <param name="options">
	/// Kolekcja opcji konfigurujących instancję animacji właściwości.
	/// Dostępne wartości to:
	/// <para>elementSelector - selector dla animowanego obiektu.</para>
	/// <para>propertyName - nazwa animowanej właściwości css.</para>
	/// <para>startupValue - początkowa wartość animowanej właściwości css</para>
	/// <para>keyframes - kolekcja ustawień dla klatek animacji do dodania do tej animacji właściwości.</para>
	/// </param>

	this.animation = animation;
	this.animationDirection = 1;
	this.elementSelector = null;
	this.propertyName = null;
	this.totalAnimationTime = 0;
	this.keyframes = [];

	if (options != null) {
		if (options.elementSelector != null) {
			this.elementSelector = options.elementSelector;
		}
		if (options.propertyName != null) {
			this.propertyName = options.propertyName;
			this.initializeValueAnimatorFunction();
		}
		if (options.startupValue != null)
			this.propertyStartupValue = options.startupValue;
		if (options.keyframes != null && Array.isArray(options.keyframes)) {
			this.loadKeyframes(options.keyframes);
		}
	}
	this.loadAnimatedElement();
	if (this.propertyStartupValue == null) {
		this.initializeStartupValue();
	}
};

Infertek.Animations.AnimationProperty.prototype = {
	initializeStartupValue	: function () {
		/// <summary>
		/// Inicjuje wartość startową animacji.
		/// </summary>
		this.propertyStartupValue = this.animatedElement.css(this.propertyName);
	},
	getElementSelector: function () {
		/// <summary>
		/// Zwraca selector dla animowanego obiektu DOM.
		/// </summary>
		/// <returns>Selector animowanego obiektu DOM.</returns>
		return this.elementSelector;
	},
	getPropertyName: function () {
		/// <summary>
		/// Pobiera nazwę animowanej właściwości CSS.
		/// </summary>
		/// <returns>Nazwa animowanej właściwości css.</returns>
		return this.propertyName;
	},
	getTotalAnimationTime: function () {
		/// <summary>
		/// Pobiera całkowity czas trwania wszystkich animacji.
		/// </summary>
		/// <returns>Całkowity czas trwania wszystkich animacji.</returns>
		return this.totalAnimationTime;
	},
	initializeValueAnimatorFunction: function () {
		/// <summary>
		/// Metoda inicjująca funkcję animatora wartości właściwości korzystając z nazwy animowanej
		/// właściwości css.
		/// </summary>
		switch (this.propertyName) {
			case "background-color":
			case "border-bottom-color":
			case "border-top-color":
			case "border-left-color":
			case "border-right-color":
			case "border-color":
			case "color":
				this.valueAnimatorFunction = window.Infertek.Animations.PropertyValueAnimators.ColorAnimator;
				break;
			case "border-bottom-width":
			case "border-top-width":
			case "border-left-width":
			case "border-right-width":
			case "border-width":
			case "outline-width":
			case "border-bottom-left-radius":
			case "border-bottom-right-radius":
			case "border-top-left-radius":
			case "border-top-right-radius":
			case "border-image-width":
			case "width":
			case "height":
			case "min-width":
			case "min-height":
			case "max-width":
			case "max-height":
			case "font-size":
			case "margin-bottom":
			case "margin-top":
			case "margin-left":
			case "margin-right":
			case "padding-bottom":
			case "padding-top":
			case "padding-left":
			case "padding-right":
			case "bottom":
			case "top":
			case "left":
			case "right":
			case "z-index":
				this.valueAnimatorFunction = window.Infertek.Animations.PropertyValueAnimators.SizeAnimator;
				break;
			default:
				this.valueAnimatorFunction = window.Infertek.Animations.PropertyValueAnimators.OtherAnimator;
		}
	},
	loadAnimatedElement: function () {
		/// <summary>
		/// Metoda wczytująca animowany element korzystając z ustawionego selectora lub jeżeli
		/// nie jest on ustawiony, wczytuje animowany obiekt.
		/// </summary>
		if (this.elementSelector == null || this.elementSelector == "") {
			this.animatedElement = this.animation.getAnimatedElement();
		} else {
			this.animatedElement = jQuery(this.elementSelector, this.animation.getAnimatedElement());
		}
	},
	loadKeyframes: function (keyframesConfiguration) {
		/// <summary>
		/// Wczytuje klatki animacji z konfiguracji wszystkich klatek animacji.
		/// Dodatkowo oblicza całkowitą długość animacji właściwości.
		/// <para>Czas ten jest wyrażony w milisekundach i jest on obliczany na podstawie długości czasu
		/// poszczególnych klatek animacji.</para>
		/// </summary>
		/// <param name="keyframesConfiguration">Konfiguracja wszystkich klatek animacji.</param>
		for (var keyframeOptionsIndex in keyframesConfiguration) {
			var keyframeInstance = new window.Infertek.Animations.AnimationKeframe(this.valueAnimatorFunction, keyframesConfiguration[keyframeOptionsIndex]);
			this.keyframes.push(keyframeInstance);
			this.totalAnimationTime += keyframeInstance.getDuration() + keyframeInstance.getOffset();
		}
	},
	processAnimation: function (timeFromAnimationBeginning) {
		/// <summary>
		/// Metoda procesująca animację posługując się informacją o ilości milisekund, jakie upłynęły
		/// od początku animacji.
		/// <para>W przypadku animacji, których kierunek zmierza do początku wartość argumentu maleje.</para>
		/// </summary>
		/// <param name="timeFromAnimationBeginning">Ilość milisekund od początku animacji.</param>
		if (!this.animationHasEnded) {
			if (timeFromAnimationBeginning <= this.totalAnimationTime) {
				this.animatedElement.css(this.propertyName, this.processAnimationFunction(timeFromAnimationBeginning));
			}
			else {
				if (this.animationDirection == 1) {
					this.animatedElement.css(this.propertyName, this.keyframes[this.keyframes.length - 1].getTargetValue());
				} else {
					this.animatedElement.css(this.propertyName, this.keyframes[0].getTargetValue());
				}
				this.animationHasEnded = true;
			}
		}
	},
	processAnimationBackward: function (timeFromAnimationBeginning) {
		/// <summary>
		/// Metoda procesująca animację w kierunku wstecznym.
		/// <para>Zawiera w sobie optymalizację pobierania aktualnej klatki animacji.</para>
		/// </summary>
		/// <param name="timeFromAnimationBeginning">Ilość milisekund od początku animacji.</param>

		var timeFromEnd = this.totalAnimationTime - timeFromAnimationBeginning;
		if (this.elapsedAnimationTime + this.currentKeyframe.getDuration() >= timeFromEnd) {
			if (this.currentKeyframeIndex == 0)
				return this.currentKeyframe.animateValue(this.propertyStartupValue, timeFromAnimationBeginning);
			return this.currentKeyframe.animateValue(this.keyframes[this.currentKeyframeIndex - 1].getTargetValue(), this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset() - (timeFromEnd - this.elapsedAnimationTime));
		} else if (this.elapsedAnimationTime + this.currentKeyframe.getOffset() + this.currentKeyframe.getDuration() >= timeFromEnd) {
			if (this.currentKeyframeIndex == 0) {
				return this.propertyStartupValue;
			}
			return this.keyframes[this.currentKeyframeIndex - 1].getTargetValue();
		} else if (this.currentKeyframeIndex > 0) {
			do {
				this.elapsedAnimationTime += this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset();
				this.currentKeyframe = this.keyframes[--this.currentKeyframeIndex];
				if (this.elapsedAnimationTime + this.currentKeyframe.getDuration() >= timeFromEnd) {
					if (this.currentKeyframeIndex == 0)
						return this.currentKeyframe.animateValue(this.propertyStartupValue, this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset() - (timeFromEnd - this.elapsedAnimationTime));
					return this.currentKeyframe.animateValue(this.keyframes[this.currentKeyframeIndex - 1].getTargetValue(), this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset() - (timeFromEnd - this.elapsedAnimationTime));
				} else if (this.elapsedAnimationTime + this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset() >= timeFromEnd) {
					if (this.currentKeyframeIndex == 0)
						return this.propertyStartupValue;
					return this.keyframes[this.currentKeyframeIndex - 1].getTargetValue();
				}
			} while (this.currentKeyframeIndex > 1);

			this.animationHasEnded = true;
			return this.propertyStartupValue;
		} else {
			this.animationHasEnded = true;
			return this.propertyStartupValue;
		}
	},
	processAnimationForward: function (timeFromAnimationBeginning) {
		/// <summary>
		/// Metoda procesująca animację w kierunku do przodu.
		/// <para>Zawiera w sobie optymalizację pobierania aktualnej klatki animacji.</para>
		/// </summary>
		/// <param name="timeFromAnimationBeginning">Ilość milisekund od początku animacji.</param>

		if (this.elapsedAnimationTime + this.currentKeyframe.getOffset() >= timeFromAnimationBeginning) {
			if (this.currentKeyframeIndex == 0) {
				return this.propertyStartupValue;
			}
			return this.keyframes[this.currentKeyframeIndex - 1].getTargetValue();
		} else if (this.elapsedAnimationTime + this.currentKeyframe.getOffset() + this.currentKeyframe.getDuration() >= timeFromAnimationBeginning) {
			if (this.currentKeyframeIndex == 0)
				return this.currentKeyframe.animateValue(this.propertyStartupValue, timeFromAnimationBeginning);
			return this.currentKeyframe.animateValue(this.keyframes[this.currentKeyframeIndex - 1].getTargetValue(), timeFromAnimationBeginning - this.elapsedAnimationTime);
		} else {
			do {
				this.elapsedAnimationTime += this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset();
				this.currentKeyframe = this.keyframes[++this.currentKeyframeIndex];
				if (this.elapsedAnimationTime + this.currentKeyframe.getOffset() >= timeFromAnimationBeginning) {
					return this.keyframes[this.currentKeyframeIndex - 1].getTargetValue();
				} else if (this.elapsedAnimationTime + this.currentKeyframe.getDuration() + this.currentKeyframe.getOffset() >= timeFromAnimationBeginning) {
					return this.currentKeyframe.animateValue(this.keyframes[this.currentKeyframeIndex - 1].getTargetValue(), timeFromAnimationBeginning - this.elapsedAnimationTime);
				}
			} while (this.currentKeyframeIndex < this.keyframes.length - 1);

			this.animationHasEnded = true;
			return this.keyframes[this.keyframes.length - 1].getTargetValue();
		}
	},
	startAnimation: function (animationDirection) {
		/// <summary>
		/// Przygotowuje obiekt animacji właściwości do właściwej animacji.
		/// <para>Zapisuje informacje o kierunku animacji celem zastosowania optymalizacji w procesie
		/// faktycznego animowania...</para>
		/// </summary>
		/// <param name="animationDirection">
		/// Kierunek, w którym postępuje animacja.
		/// <para>1 - animacja idzie 'do przodu'.</para>
		/// <para>-1 animacja idzie 'do tyłu'.</para>
		/// </param>
		if (this.keyframes != null && this.keyframes.length > 0) {
			this.animationDirection = animationDirection;
			this.animationHasEnded = false;
			this.elapsedAnimationTime = 0;
			if (animationDirection == -1) {
				this.processAnimationFunction = this.processAnimationBackward;
				this.currentKeyframeIndex = this.keyframes.length - 1;
			} else {
				this.processAnimationFunction = this.processAnimationForward;
				this.currentKeyframeIndex = 0;
			}
			this.currentKeyframe = this.keyframes[this.currentKeyframeIndex];
		} else {
			this.animationHasEnded = true;
		}
	},
	stopAnimation: function () {
		/// <summary>
		/// Metoda zatrzymująca animację.
		/// </summary>

		this.animationHasEnded = true;
	}
};