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
var _colorNameMappingArray = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgrey: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkslategrey: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dimgrey: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	grey: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgray: [211, 211, 211],
	lightgrey: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightslategrey: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 216],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [216, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	slategrey: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50]
};

function ParseRgbColorValue(colorToParse) {
	if (colorToParse.substr(0, 1) == "#") {
		// If color is presented as HEX
		if (colorToParse.length == 7) {
			// If color is presented as #000000
			return [parseInt(colorToParse.substr(1, 2), 16),
					parseInt(colorToParse.substr(3, 2), 16),
					parseInt(colorToParse.substr(5, 2), 16)];
		} else if (colorToParse.length == 4) {
			// If color is presented as #000
			return [parseInt(colorToParse.substr(1, 1) + colorToParse.substr(1, 1), 16),
					parseInt(colorToParse.substr(2, 1) + colorToParse.substr(2, 1), 16),
					parseInt(colorToParse.substr(3, 1) + colorToParse.substr(3, 1), 16)];
		}
		// Else color is presented as #0
		var parsedValue = parseInt(colorToParse.substr(1, 1) + colorToParse.substr(1, 1), 16);
		return [parsedValue, parsedValue, parsedValue];
	} else if (colorToParse.substr(0, 3) == "rgb") {
		var trimmedColor = colorToParse.substring(4, colorToParse.length - 1);
		var splittedColor = trimmedColor.split(",");
		return [parseInt(splittedColor[0]),
				parseInt(splittedColor[1]),
				parseInt(splittedColor[2])];
	} else if (colorToParse.toLowerCase !== null) {
		return _colorNameMappingArray[colorToParse.toLowerCase()];
	}
	return null;
}

/// <summary>
/// Expression used for finding elements to format inside string.
/// </summary>
String._stringFormatExpression = new RegExp("{(\\d+)}|{{|}}", "g");

String.format = function (content) {
    /// <summary>
    /// Replaces the format item in a specified string with the string representation of a corresponding object in a specified array.
	/// </summary>
    /// <param name="content" type="String">A composite format string</param>
    /// <returns type="String">A copy of format in which the format items have been replaced by the string representation of the corresponding objects in args.</returns>

    var match, lastIndex = String._stringFormatExpression.lastIndex = 0;
    var replaceCurrentMatch = function (what, whatToSet) {
        content = content.slice(0, lastIndex - what.length) +
                  whatToSet +
                  content.slice(lastIndex, content.length);
        String._stringFormatExpression.lastIndex = lastIndex += whatToSet.length - what.length;
    };
    while ((match = String._stringFormatExpression.exec(content))) {
        lastIndex = String._stringFormatExpression.lastIndex;
        if (match.length == 2) {
            if (arguments.length < parseInt(match[1]) + 2) {
                throw "Index (zero based) must be greater than or equal to zero and less than the size of the argument list.";
            }
            replaceCurrentMatch(match[0], arguments[parseInt(match[1]) + 1]);
        }
        else if (match[0] === "{{") {
            replaceCurrentMatch(match[0], "{");
        } else if (match[0] === "}}") {
            replaceCurrentMatch(match[0], "}");
        }
    }

    return content;
};

String.isNullOrEmpty = function (value) {
	/// <summary>
    /// Indicates whether the specified string is null or an Empty string.
	/// </summary>
    /// <param name="value">The string to test.</param>
    /// <returns type="Boolean">true if the value parameter is null or an empty string (""); otherwise, false.</returns

    return value === null || value === ""
};