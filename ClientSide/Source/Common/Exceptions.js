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