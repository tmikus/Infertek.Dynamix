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