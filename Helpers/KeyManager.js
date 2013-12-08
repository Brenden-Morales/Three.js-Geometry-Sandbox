function KeyManager(){

	//the actual Statuses of the keys
	this.KeyStatus = [];

	//mapping javascript keycodes to actual keypresses
	//http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	this.Keys = [];
	this.Keys[8] = "backspace";
	this.Keys[9] = "tab";
	this.Keys[13] = "enter";
	this.Keys[16] = "shift";
	this.Keys[17] = "control";
	this.Keys[18] = "alt";
	this.Keys[27] = "escape";

	this.Keys[32] = "space";

	this.Keys[37] = "left arrow";
	this.Keys[38] = "up arrow";
	this.Keys[39] = "right arrow";
	this.Keys[40] = "down arrow";

	this.Keys[46] = "delete";

	this.Keys[48] = "0";
	this.Keys[49] = "1";
	this.Keys[50] = "2";
	this.Keys[51] = "3";
	this.Keys[52] = "4";
	this.Keys[53] = "5";
	this.Keys[54] = "6";
	this.Keys[55] = "7";
	this.Keys[56] = "8";
	this.Keys[57] = "9";

	this.Keys[65] = "a";
	this.Keys[66] = "b";
	this.Keys[67] = "c";
	this.Keys[68] = "d";
	this.Keys[69] = "e";
	this.Keys[70] = "f";
	this.Keys[71] = "g";
	this.Keys[72] = "h";
	this.Keys[73] = "i";
	this.Keys[74] = "j";
	this.Keys[75] = "k";
	this.Keys[76] = "l";
	this.Keys[77] = "m";
	this.Keys[78] = "n";
	this.Keys[79] = "o";
	this.Keys[80] = "p";
	this.Keys[81] = "q";
	this.Keys[82] = "r";
	this.Keys[83] = "s";
	this.Keys[84] = "t";
	this.Keys[85] = "u";
	this.Keys[86] = "v";
	this.Keys[87] = "w";
	this.Keys[88] = "x";
	this.Keys[89] = "y";
	this.Keys[90] = "z";

	//browser specific bindings for dem keys
	//from http://www.useragentstring.com/pages/useragentstring.php
	var browser = navigator.userAgent;
	if(browser.indexOf("MSIE") != -1) browser = "ie";
	else if(browser.indexOf("Chrome") != -1) browser = "chrome";
	else if(browser.indexOf("Opera") != -1) browser = "opera";
	else if(browser.indexOf("Safari") != -1) browser = "safari";
	else if(browser.indexOf("Firefox") != -1) browser = "firefox";
	
	//semicolon
	if(browser == "opera" || browser == "firefox") this.Keys[59] = ";";
	else this.Keys[186] = ";"

	//equals
	if(browser == "opera") this.Keys[61] = "=";
	else if(browser == "firefox") this.Keys[107] = "=";
	else this.Keys[187] = "=";

	//minus
	if(browser == "opera" || browser == "firefox") this.Keys[109] = "-";
	else this.Keys[189] = "-";

	//NUMLOCK OFF NUMPAD STUFF
	//opera specific
	if(browser == "opera"){
		this.Keys[48] = "numpad 0";
		this.Keys[49] = "numpad 1";
		this.Keys[50] = "numpad 2";
		this.Keys[51] = "numpad 3";
		this.Keys[52] = "numpad 4";
		this.Keys[53] = "numpad 5";
		this.Keys[54] = "numpad 6";
		this.Keys[55] = "numpad 7";
		this.Keys[56] = "numpad 8";
		this.Keys[57] = "numpad 9";

		this.Keys[42] = "numpad *";
		this.Keys[43] = "numpad +";
		this.Keys[45] = "numpad -";
		this.Keys[78] = "numpad .";
		this.Keys[47] = "numpad /";
	}
	else{
		this.Keys[96] = "numpad 0";
		this.Keys[97] = "numpad 1";
		this.Keys[98] = "numpad 2";
		this.Keys[99] = "numpad 3";
		this.Keys[100] = "numpad 4";
		this.Keys[101] = "numpad 5";
		this.Keys[102] = "numpad 6";
		this.Keys[103] = "numpad 7";
		this.Keys[104] = "numpad 8";
		this.Keys[105] = "numpad 9";

		this.Keys[106] = "numpad *";
		this.Keys[107] = "numpad +";
		this.Keys[109] = "numpad -";
		this.Keys[110] = "numpad .";
		this.Keys[111] = "numpad /";
	}

}