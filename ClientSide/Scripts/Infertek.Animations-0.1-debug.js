/// <summary>
/// Inicjuje instancję wyjątku zgłaszanego w momencie przekroczenia dozwolonego zakresu przez pewien index.
///</summary>
function IndexOutOfRangeException(message, errorId) {
	Error.call(this, message, errorId);
}

IndexOutOfRangeException.prototype = new Error();


/// <summary>
/// Inicjuje instancję wyjątku zgłaszanego w przypadku wystąpienia niewspieranej operacji.
/// </summary>
function InvalidOperationException(message, errorId) {
	Error.call(this, message, errorId);
}

InvalidOperationException.prototype = new Error();

/// <summary>
/// Inicjuje instsancję wyjątku zgłaszanego w przypadku wykrycia null'owej wartości.
/// </summary>
function NullReferenceException(message, errorId) {
	Error.call(this, message, errorId);
}

NullReferenceException.prototype = new Error();
Namespace.Register("Infertek.Animations");

Infertek.Animations.PropertyValueAnimators = {
	GetAnimatorFunctionByName: function (animatorFunctionName) {
		/// <summary>
		/// Pobiera funkcję animatora wartości po podanej nazwie animatora.
		/// </summary>
		/// <param name="animatorFunctionName">Nazwa funkcji animatora do pobrania.</param>
		/// <returns>Pobrana funkcja animatora wartości.</returns>

		if (animatorFunctionName == "numeric")
			return NumericValueAnimator;
		if (animatorFunctionName == "size")
			return SizeAnimator;

		throw new InvalidOperationException("Invlaid value animator function name: " + animatorFunctionName);
	},
	NumericValueAnimator: function (sourceValue, destinationValue, valueScale) {
		/// <summary>
		/// Manipuluje wartościami numerycznymi.
		/// Argumenty 'sourceValue' i 'destinationValue' są liczbami.
		/// </summary>
		/// <param name="sourceValue">Wartość, od której zaczynana jest animacja.</param>
		/// <param name="destinationValue">Wartość, do której dąży animacja.</param>
		/// <param name="valueScale">Skala wartości. Zazwyczaj w przedziale od 0 do 1. Może nieco od niego odbiegać.</param>
		/// <returns>Obliczona wartość animowanej własciwości numerycznej.</returns>

		return Math.round(sourceValue + ((destinationValue - sourceValue) * valueScale));
	},
	SizeAnimator: function (sourceValue, destinationValue, valueScale) {
		/// <summary>
		/// Manipuluje wartościami reprezentującymi rozmiary i położenie obiektów.
		/// Jednostki te mają swoje typy jednakże zakładane jest, że każde położenie wyrażone jest w pixelach.
		/// </summary>
		/// <param name="sourceValue">Wartość, od której zaczynana jest animacja.</param>
		/// <param name="destinationValue">Wartość, do której dąży animacja.</param>
		/// <param name="valueScale">Skala wartości. Zazwyczaj w przedziale od 0 do 1. Może nieco od niego odbiegać.</param>
		/// <returns>Obliczona wartość animowanej własciwości wraz z typem jednostki.</returns>

		var destinationValueLength = destinationValue.length;
		var sourceValueNumber = Number(sourceValue.substr(0, sourceValue.length - 2));
		var destinationValueNumber = Number(destinationValue.substr(0, destinationValueLength - 2));

		return window.Infertek.Animations.PropertyValueAnimators.NumericValueAnimator(sourceValueNumber, destinationValueNumber, valueScale) + destinationValue.substr(destinationValueLength - 2, 2);
	},
	ColorAnimator: function (sourceValue, destinationValue, valueScale) {
		// TODO: Dokumentacja i implementacja.
		return valueScale >= 1 ? destinationValue : sourceValue;
	},
	OtherAnimator: function (sourceValue, destinationValue, valueScale) {
		// TODO: Dokumentacja.
		return valueScale >= 1 ? destinationValue : sourceValue;
	}
};
Namespace.Register("Infertek.Animations");

Infertek.Animations.FrameBlendingFunctions = {
	GetBlendingByName: function (blendingFunctionName) {
		/// <summary>
		/// Metoda pobierająca funkcję przejścia po nazwie podanej w argumencie.
		/// </summary>
		/// <param name="blendingFunctionName" type="String">Nazwa funkcji przejścia do pobrania.</param>
		/// <returns type="Function">Pobrana funkcja.</returns>

		if (blendingFunctionName == "linear")
			return LinearBlending;

		throw new InvalidOperationException("Invlaid blending function name: " + blendingFunctionName);
	},
	LinearBlending: function (keyframe, deltaTime) {
		/// <summary>
		/// Pobiera wartość wymaganą do animowania właściwości.
		/// <para>Jako, że jest to animacja liniowa to wartość animacji zmienia się liniowo 
		/// od wartości 0 do wartości 1</para>
		/// </summary>
		/// <param name="keyframe" type="Infertek.Animations.AnimationKeyframe">Obiekt klatki kluczowej, na rzecz której obliczyć wartość.</param>
		/// <param name="deltaTime" type="Number">Ilość milisekund jakie upłynęły od początku klatki kluczowej.</param>
		/// <returns type="Number">Wartość o jaką zeskalować właściwość - z zakresu 0-1.</returns>
		return (deltaTime - keyframe.getOffset()) / keyframe.getDuration();
	}
}
Namespace.Register("Infertek.Animations");

Infertek.Animations.AnimationKeframe = function (valueAnimatorFunction, options) {
	/// <summary>
	/// Inicjuje instancję klatki animacji podanymi w argumencie opcjami.
	/// </summary>
	/// <param name="valueAnimatorFunction">Funkcja wykorzystywana do animowania wartości klatki kluczowej.</param>
	/// <param name="options" type="Object">
	/// Kolekcja opcji klatki animacji do ustawienia.
	/// <para>Dostępne do ustawienia opcje:</para>
	/// <para>targetValue - wartość, do jakiej dąży animacja w trakcie trwania tej kluczowej klatki.</para>
	/// <para>duration - czas trwania tej klatki w milisekundach.</para>
	/// <para>offset - odstęp pomiędzy poprzednią klatką a obecnąklatką - w milisekundach.</para>
	/// <para>blending - funkcja służąca do obliczania wartości animowanej właściwości na podstawie danych o przebiegu czasu.</para>
	/// </param>

	this.duration = 0;
	this.blendingFunction = window.Infertek.Animations.FrameBlendingFunctions.LinearBlending;
	this.offset = 0;
	this.targetValue = null;
	this.valueAnimatorFunction = valueAnimatorFunction;

	if (options != null) {
		if (options.duration != null)
			this.duration = options.duration;
		if (options.blending != null) {
			this.blendingFunction = window.Infertek.Animations.FrameBlendingFunctions.GetBlendingByName(options.blending);
		}
		if (options.offset != null)
			this.offset = options.offset;
		if (options.targetValue != null)
			this.targetValue = options.targetValue;
	}
};

Infertek.Animations.AnimationKeframe.prototype = {
	animateValue: function (sourceValue, deltaTime) {
		/// <summary>
		/// Metoda animująca wartość źródłową właściwości wykorzystując informację o upływie czasu od początku
		/// tej klatki animacji.
		/// </summary>
		/// <param name="sourceValue">Wartość animowanej właściwości na początku tej klatki animacji.</param>
		/// <param name="deltaTime">Ilość milisekund, jaka upłynęła od początku tej klatki.</param>
		/// <returns type="Object">Wartość właściwości w tej milisekundzie animacji.</returns>

		return this.valueAnimatorFunction(sourceValue, this.getTargetValue(), this.blendingFunction(this, deltaTime));
	},
	getDuration: function () {
		/// <summary>
		/// Pobiera czas trwania tej klatki animacji.
		/// <para>Czas trwania jest wyrażony w milisekundach.</para>
		/// </summary>
		/// <returns type="Number">Czas trwania klatki animacji (w milisekundach).</returns>
		return this.duration;
	},
	getOffset: function () {
		/// <summary>
		/// Pobiera odstęp pomiędzy poprzednią klatką a obecną klatką.
		/// <para>Chodzi o odstęp czasowy wyrażony w milisekundach.</para>
		/// </summary>
		/// <returns type="Number">Odstep pomiędzy poprzednią klatką a rozpoczęciem tej klatki.</returns>
		return this.offset;
	},
	getTargetValue: function () {
		/// <summary>
		/// Pobiera wartość animowanej właściwości, do której dąży animacja w tej klatce.
		/// Wartość ta może się odnosić do dowolnej właściwości obiektu.
		/// </summary>
		/// <returns type="Object">Wartość, do której zmierza ta klatka kluczowa.</returns>
		return this.targetValue;
	}
};

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
