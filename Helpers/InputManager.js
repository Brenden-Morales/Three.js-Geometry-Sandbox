function InputManager(){
	
	//mapping javascript keycodes to actual keypresses
	//http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	var Keys = [];
	Keys[8] = "backspace";
	Keys[9] = "tab";
	Keys[13] = "enter";
	Keys[16] = "shift";
	Keys[17] = "control";
	Keys[18] = "alt";
	Keys[27] = "escape";

	Keys[32] = "space";

	Keys[37] = "left arrow";
	Keys[38] = "up arrow";
	Keys[39] = "right arrow";
	Keys[40] = "down arrow";

	Keys[48] = "0";
	Keys[49] = "1";
	Keys[50] = "2";
	Keys[51] = "3";
	Keys[52] = "4";
	Keys[53] = "5";
	Keys[54] = "6";
	Keys[55] = "7";
	Keys[56] = "8";
	Keys[57] = "9";

	Keys[65] = "a";
	Keys[66] = "b";
	Keys[67] = "c";
	Keys[68] = "d";
	Keys[69] = "e";
	Keys[70] = "f";
	Keys[71] = "g";
	Keys[72] = "h";
	Keys[73] = "i";
	Keys[74] = "j";
	Keys[75] = "k";
	Keys[76] = "l";
	Keys[77] = "m";
	Keys[78] = "n";
	Keys[79] = "o";
	Keys[80] = "p";
	Keys[81] = "q";
	Keys[82] = "r";
	Keys[83] = "s";
	Keys[84] = "t";
	Keys[85] = "u";
	Keys[86] = "v";
	Keys[87] = "w";
	Keys[88] = "x";
	Keys[89] = "y";
	Keys[90] = "z";

	//browser specific bindings for dem keys
	//from http://www.useragentstring.com/pages/useragentstring.php
	var browser = navigator.userAgent;
	if(browser.indexOf("MSIE") != -1) browser = "ie";
	else if(browser.indexOf("Chrome") != -1) browser = "chrome";
	else if(browser.indexOf("Opera") != -1) browser = "opera";
	else if(browser.indexOf("Safari") != -1) browser = "safari";
	else if(browser.indexOf("Firefox") != -1) browser = "firefox";
	
	//semicolon
	if(browser == "opera" || browser == "firefox") Keys[59] = ";";
	else Keys[186] = ";"

	//equals
	if(browser == "opera") Keys[61] = "=";
	else if(browser == "firefox") Keys[107] = "=";
	else Keys[187] = "=";

	//minus
	if(browser == "opera" || browser == "firefox") Keys[109] = "-";
	else Keys[189] = "-";

	//NUMLOCK OFF NUMPAD STUFF
	//opera specific
	if(browser == "opera"){
		Keys[48] = "numpad 0";
		Keys[49] = "numpad 1";
		Keys[50] = "numpad 2";
		Keys[51] = "numpad 3";
		Keys[52] = "numpad 4";
		Keys[53] = "numpad 5";
		Keys[54] = "numpad 6";
		Keys[55] = "numpad 7";
		Keys[56] = "numpad 8";
		Keys[57] = "numpad 9";

		Keys[42] = "numpad *";
		Keys[43] = "numpad +";
		Keys[45] = "numpad -";
		Keys[78] = "numpad .";
		Keys[47] = "numpad /";
	}
	else{
		Keys[96] = "numpad 0";
		Keys[97] = "numpad 1";
		Keys[98] = "numpad 2";
		Keys[99] = "numpad 3";
		Keys[100] = "numpad 4";
		Keys[101] = "numpad 5";
		Keys[102] = "numpad 6";
		Keys[103] = "numpad 7";
		Keys[104] = "numpad 8";
		Keys[105] = "numpad 9";

		Keys[106] = "numpad *";
		Keys[107] = "numpad +";
		Keys[109] = "numpad -";
		Keys[110] = "numpad .";
		Keys[111] = "numpad /";
	}


	//the actual Statuses of the keys
	var KeyStatus = [];


	function onDocumentKeyDown( event ) {
		KeyStatus[event.keyCode] = true;
    }

    function onDocumentKeyUp( event ) {
    	KeyStatus[event.keyCode] = false;
    }

    this.checkKey = function(key){
    	//go find corresponding keycode in our list
    	for(var i = 0; i < Keys.length; i ++){
    		if(Keys[i] == key){
    			//alert(Keys[i] + " " + KeyStatus[i]);
    			return KeyStatus[i];
    		}
    	}
    }

    //preventing ctrl + char shortcuts
    onkeydown = function(e){
    if(e.ctrlKey){
        e.preventDefault();
        //your saving code
        }
    }

    /*
	*****MOUSE STUFF*******
    */

    //right click context menu
    var MainMenuShown = false;

    //UI manager
    var UI = new UIManager($("#WindowOverlay"));

    function callback(){
    	alert("ASDF");
    }

    //active object
    var CurrentObject = null;
    //active object translation handle
    var CurrentHandle = null;

    //mouse down
    function onDocumentMouseDown(e){
    	//right click
    	if(e.button == 2){

    		//create a new window and add elements to it
    		/*
    		var $a = UI.createNew("hello, world!", e.clientX, e.clientY);
    		UI.addText($a, "hoooooraaaay!");
    		UI.addButton($a, "do something", callback);
    		UI.addSlider($a, "variable", -1, 1, 0, 0.01);
    		UI.addInput($a, "X", "0");
    		//UI.addText($a, "hoooooraaaay!");

    		//create an accordion
    		var $accordion = UI.createAccordion();
    		var $accordionElement = UI.createAccordionContent();
    		var $accordionElement2 = UI.createAccordionContent();
    		var $accordionElement3 = UI.createAccordionContent();

    		UI.addButton($accordionElement,"test", callback);
    		UI.addText($accordionElement2,"test");
    		UI.addSlider($accordionElement3, "variable", -1, 1, 0, 0.01);


    		UI.addAccordionContent($accordion, $accordionElement, "woot");
    		UI.addAccordionContent($accordion, $accordionElement2, "asdf");
    		UI.addAccordionContent($accordion, $accordionElement3, "qwerty");
    		UI.addAccordion($a, $accordion);

    		//UI.activate($a);
    		*/

    		//create a basic right click dialog if no object is selected
    		if(CurrentObject == null){
    			var r = new RightClickDialog(e.clientX, e.clientY);
    		}
    		

    	}
    	//left click
    	else if (e.button == 0){
    		//check to see we're not clicking on any generated UI
    		if(e.target.id == "WindowOverlay"){
    			//translate to world space
	    		var mouse = new THREE.Vector3();
	    		mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

				//get raycast starting position
				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				var projector = new THREE.Projector();
				projector.unprojectVector( vector, RTS.Camera );

				//make raycaster
				var raycaster = new THREE.Raycaster( RTS.CameraHolder.position, vector.sub( RTS.CameraHolder.position ).normalize() );
				//check for intersections on geometry
				var GeometryIntersections = raycaster.intersectObjects(ActiveObjects);

				//check for intersections on an active handle
				var HandleClicked = false;
				if(CurrentHandle != null){
					HandleClicked = CurrentHandle.checkClicked(new THREE.Vector3(mouse.x, mouse.y, 0.5));
				}

				if(GeometryIntersections.length > 0 && HandleClicked == false){
					//we have intersected with an object

					//choose the closest intersection
					var index = 0;
					var shortestLength = Infinity;
					for(var i = 0; i < GeometryIntersections.length; i ++){
						if(GeometryIntersections[i].distance < shortestLength){
							shortestLength = GeometryIntersections[i].distance;
							index = i;
						}
					}

					//if the object has no children, give it a handle, set that handle as our active handle
					if(GeometryIntersections[index].object.children.length == 0){
						//if there is an already selected piece of geometry, remove the handle
						if(CurrentHandle != null){
							CurrentObject.remove(CurrentHandle.Handle);
							CurrentHandle = null;
							CurrentObject = null;
						}
						
						//new handle
						var h = new MovementHandle();
						GeometryIntersections[index].object.add(h.Handle);
						CurrentHandle = h;
						CurrentObject = GeometryIntersections[index].object;
					}
				}

				else if(GeometryIntersections.length == 0 && HandleClicked == false){
					CurrentObject.remove(CurrentHandle.Handle);
					CurrentHandle = null;
					CurrentObject = null;
				}
    		}

    		
    	}
    	
    }

    //mouse up
    function onDocumentMouseUp(e){
    	//if a handle is currently clicked, set it to unclicked
    	if(CurrentHandle != null){
    		if(CurrentHandle.clicked) CurrentHandle.unClick();
    	}
    }

    
    function onDocumentContextMenu(e){
    	e.preventDefault();
    }

    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    document.addEventListener( 'keyup', onDocumentKeyUp, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false);
    document.addEventListener( 'mouseup', onDocumentMouseUp, false);
    document.addEventListener( 'contextmenu', onDocumentContextMenu, false);


}