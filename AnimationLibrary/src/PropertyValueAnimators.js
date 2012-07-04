Infertek.Animations.PropertyValueAnimators = {
	GetAnimatorFunctionByName: function (animatorFunctionName) {
		/// <summary>
		/// Pobiera funkcję animatora wartości po podanej nazwie animatora.
		/// </summary>
		/// <param name="animatorFunctionName">Nazwa funkcji animatora do pobrania.</param>
		/// <returns>Pobrana funkcja animatora wartości.</returns>

		if (animatorFunctionName == "numeric")
			return Infertek.Animations.PropertyValueAnimators.NumericValueAnimator;
		if (animatorFunctionName == "size")
			return Infertek.Animations.PropertyValueAnimators.SizeAnimator;

		throw "Invlaid value animator function name: " + animatorFunctionName;
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
	FloatingPointValueAnimator: function (sourceValue, destinationValue, valueScale) {
		/// <summary>
		/// Manipuluje wartościami numerycznymi.
		/// Argumenty 'sourceValue' i 'destinationValue' są liczbami.
		/// </summary>
		/// <param name="sourceValue">Wartość, od której zaczynana jest animacja.</param>
		/// <param name="destinationValue">Wartość, do której dąży animacja.</param>
		/// <param name="valueScale">Skala wartości. Zazwyczaj w przedziale od 0 do 1. Może nieco od niego odbiegać.</param>
		/// <returns>Obliczona wartość animowanej własciwości numerycznej.</returns>

		return sourceValue + ((destinationValue - sourceValue) * valueScale);
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
		/// <summary>
		/// Manipuluje wartościami reprezentującymi kolory.
		/// Wartości tych kolorów są wyciągane przez metodę pomocniczą <see cref="ParseRgbColorValue" />
		/// </summary>
		/// <param name="sourceValue">Wartość, od której zaczynana jest animacja.</param>
		/// <param name="destinationValue">Wartość, do której dąży animacja.</param>
		/// <param name="valueScale">Skala wartości. Zazwyczaj w przedziale od 0 do 1. Może nieco od niego odbiegać.</param>
		/// <returns>Obliczona wartość animowanej własciwości wraz z typem jednostki.</returns>

		return "rgb(" + Math.round(sourceValue[0] + ((destinationValue[0] - sourceValue[0]) * valueScale)) + ", "
					  + Math.round(sourceValue[1] + ((destinationValue[1] - sourceValue[1]) * valueScale)) + ", "
					  + Math.round(sourceValue[2] + ((destinationValue[2] - sourceValue[2]) * valueScale)) + ")";
	},
	OtherAnimator: function (sourceValue, destinationValue, valueScale) {
		/// <summary>
		/// Manipuluje wartościami reprezentującymi dowolne obiekty.
		/// Jeżeli wartość <see cref="valueScale" /> jeszcze nie osiągnęła wartości 1 to zwraca <see cref="sourceValue" />.
		/// Gdy wartość <see cref="valueScale" /> osiągnęła 1 to zwraca wartość <see cref="destinationValue" />
		/// </summary>
		/// <param name="sourceValue">Wartość, od której zaczynana jest animacja.</param>
		/// <param name="destinationValue">Wartość, do której dąży animacja.</param>
		/// <param name="valueScale">Skala wartości. Zazwyczaj w przedziale od 0 do 1. Może nieco od niego odbiegać.</param>
		/// <returns>Obliczona wartość animowanej własciwości wraz z typem jednostki.</returns>

		return valueScale >= 1 ? destinationValue : sourceValue;
	}
};