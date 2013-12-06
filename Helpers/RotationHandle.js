function RotationHandle(){

	//parent object3d that holds all the handles together
	this.Handle = new THREE.Object3D();
	//whether or not this handle is currently clicked
	this.clicked = false;
	//the axis that was clicked on
	this.activeAxis = "";
	//the plane that corresponds to the active axis
	this.activePlane = new THREE.Plane();
	//last click location
	this.lastPosition = new THREE.Vector3(0,0,0);

	this.type = "Rotation";

	var self = this;

	//create a circle that we'll extrude our tubes along
	MakeAxis = function ( radius, facing) {
        var verts = [];
        arc = 1
        for ( var i = 0; i <= 64 * arc; ++i ) {
            if ( facing == 'x' ) verts.push( new THREE.Vector3( 0, Math.cos( i / 32 * Math.PI ), Math.sin( i / 32 * Math.PI ) ).multiplyScalar(radius) );
            if ( facing == 'y' ) verts.push( new THREE.Vector3( Math.cos( i / 32 * Math.PI ), 0, Math.sin( i / 32 * Math.PI ) ).multiplyScalar(radius) );
            if ( facing == 'z' ) verts.push( new THREE.Vector3( Math.sin( i / 32 * Math.PI ), Math.cos( i / 32 * Math.PI ), 0 ).multiplyScalar(radius) );
        }
        //set up extrusion geometry
        var extrudeSettings = { amount: 200,  bevelEnabled: true, bevelSegments: 2, steps: 150 };
    	var circleSpline =  new THREE.SplineCurve3( verts );
    	extrudeSettings.extrudePath = circleSpline;

    	//make tube geometry
	    var axis = new THREE.TubeGeometry(extrudeSettings.extrudePath, 64, 0.25, 8, true, false);
	    var axisMaterial =  new THREE.MeshBasicMaterial( { color: 0xff0000, depthTest: false, depthWrite: false, transparent: true} );
	    if(facing == "y"){
	    	axisMaterial =  new THREE.MeshBasicMaterial( { color: 0x00CC00, depthTest: false, depthWrite: false, transparent: true} );
	    }
	    if(facing == "z"){
	    	axisMaterial =  new THREE.MeshBasicMaterial( { color: 0x0000ff, depthTest: false, depthWrite: false, transparent: true} );
	    }

	    //make final mesh and add it
	    var axisMesh = new THREE.Mesh( axis, axisMaterial );
	    if(facing == "x") axisMesh.name = "X";
	    else if(facing == "y") axisMesh.name = "Y";
	    else if(facing == "z") axisMesh.name = "Z";
	    self.Handle.add(axisMesh);
    }

    MakeAxis(50, "x");
    MakeAxis(50, "y");
    MakeAxis(50, "z");


	//check to see if we've clicked a handle
    this.checkClicked = function(vector){
    	var mouse = new THREE.Vector3();
    	mouse.copy(vector);
    	var projector = new THREE.Projector();
		projector.unprojectVector( vector, RTS.Camera );
		raycaster = new THREE.Raycaster( RTS.CameraHolder.position, vector.sub( RTS.CameraHolder.position ).normalize() );
		HandleIntersections = raycaster.intersectObjects(self.Handle.children);
		if(HandleIntersections.length > 0){
			self.Click(HandleIntersections[0].object.name, new THREE.Vector3(vector.x, vector.y,0), mouse);
            return true;
		}
        else{
            return false;
        } 
    }

    //set this handle to clicked so it will translate on mouse move
    this.Click = function(Axis, InitialClick, mouse){
    	self.clicked = true;
    	self.activeAxis = Axis;

    	//set up proper plane
    	if(self.activeAxis == "Z"){
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(1,0,0), self.Handle.parent.position);
       		//check initial plane location
       		self.lastPosition = checkPlane(mouse);
    	}
       	else if(self.activeAxis == "X"){
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0,0,1), self.Handle.parent.position);
       		//check initial plane location
       		self.lastPosition = checkPlane(mouse);
       	}
       	else if(self.activeAxis == "Y"){
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0,1,0), self.Handle.parent.position);
       		//check initial plane location
       		self.lastPosition = checkPlane(mouse);

       	}
    }

    this.unClick = function(){
    	self.clicked = false;
    	self.activeAxis = "";
    	self.lastPosition = new THREE.Vector3();
    }

    function checkPlane(mouse){
    	//project onto plane
		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		var projector = new THREE.Projector();
		projector.unprojectVector( vector, RTS.Camera );
		var Ray = new THREE.Ray(RTS.CameraHolder.position, vector.sub(RTS.CameraHolder.position).normalize());
		var asdf = new THREE.Vector3();
		Ray.intersectPlane(self.activePlane, asdf);

		return asdf;
    }

    //when a handle is clicked, keep track of mouse movement
    function onMouseMove(event){
    	if(self.clicked){
    		//alert("Mouse MOVED");

    		//translate mouse coordinates to world coords
    		var mouse = new THREE.Vector3();
	    	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    		//check the plane
    		var newPosition = checkPlane(mouse);

    		//move based on difference
    		if(self.activeAxis == "Z"){
    			var zDelta = newPosition.z;
    			zDelta -= self.lastPosition.z;
    			//move by delta
    			self.Handle.parent.position.z += zDelta;
    			//set last mouse position
    			self.lastPosition.copy(newPosition);
    		}
    		else if(self.activeAxis == "X"){
    			var xDelta = newPosition.x;
    			xDelta -= self.lastPosition.x;
    			//move by delta
    			self.Handle.parent.position.x += xDelta;
    			//set last mouse position
    			self.lastPosition.copy(newPosition);
    		}
    		else if(self.activeAxis == "Y"){
    			var yDelta = newPosition.y;
    			yDelta -= self.lastPosition.y;
    			//move by delta
    			self.Handle.parent.position.y += yDelta;
    			//set last mouse position
    			self.lastPosition.copy(newPosition);
    		}

    	}
    }

    //listener
    document.addEventListener( 'mousemove', onMouseMove, false);
    
    
	
}