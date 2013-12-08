function InputManager(){
	
	//the keymanager that keeps track of KM.KeyStatuses
	var KM = new KeyManager();

	//keep track of the state of various keyboard inputs
	var IS = new InputState();


	function onDocumentKeyDown( event ) {
		//update the global keyboard state
		KM.KeyStatus[event.keyCode] = true;

		//if this is the delete key, we delete the current object
		if(event.keyCode == 46){
			IS.clearObjectAndHandle();
		}

		//switch handle types with "r"
		if(event.keyCode == 82){
			IS.changeHandleType();
		}

		//zero out position or rotation with "0"
		if(event.keyCode == 48){
			IS.zeroHandle();
		}

		//remove visualization helpers with "h"
		if(event.keyCode == 72){
			IS.toggleVisualization();
		}

		//edit vertices with "v"
		if(event.keyCode == 86){
			IS.toggleVertices();
		}


    }

    function onDocumentKeyUp( event ) {
    	//update global keyboard state
    	KM.KeyStatus[event.keyCode] = false;
    }

    this.checkKey = function(key){
    	//go find corresponding keycode in our list
    	for(var i = 0; i < KM.Keys.length; i ++){
    		if(KM.Keys[i] == key){
    			//alert(Keys[i] + " " + KM.KeyStatus[i]);
    			return KM.KeyStatus[i];
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

    //mouse down
    function onDocumentMouseDown(e){
    	//right click
    	if(e.button == 2){
    		//create a basic right click dialog if no object is selected
    		//if(CurrentObject == null){
    			var r = new RightClickDialog(e.clientX, e.clientY);
    		//}
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
				var HandleClicked = IS.checkHandleClicked(new THREE.Vector3( mouse.x, mouse.y, 0.5 ));

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

					//check to see if the object already has a handle attached
					var HandleAttached = false;
					for(var i = 0; i < GeometryIntersections[index].object.children.length; i ++){
						if(GeometryIntersections[index].object.children[i].name == "Handle") HandleAttached = true;
					}

					//if the object has no children, give it a handle, set that handle as our active handle
					if(!HandleAttached){
						IS.changeObjectAndHandle(GeometryIntersections[index].object);
					}
				}

				else if(GeometryIntersections.length == 0 && !HandleClicked){
					IS.removeHandle();
				}
    		}

    		
    	}
    	
    }

    //mouse up
    function onDocumentMouseUp(e){
    	//if a handle is currently clicked, set it to unclicked
    	IS.unclickHandle();
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