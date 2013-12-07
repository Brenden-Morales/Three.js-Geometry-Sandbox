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
	this.lastTheta = 0;

	this.type = "Rotation";
    this.Handle.name = "Handle";

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
	    var axis = new THREE.TubeGeometry(extrudeSettings.extrudePath, 64, 0.75, 8, true, false);
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
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0,0,1), self.Handle.parent.position);

       		//rotate plane from parent
        	var RotationMatrix = new THREE.Matrix4();
        	RotationMatrix.extractRotation(self.Handle.parent.matrix);
        	activePlane.applyMatrix4(RotationMatrix);

       		//check initial plane / angle
       		var newPosition = checkPlane(mouse);
    		//set the position relative to the parents origin
    		newPosition.x -= self.Handle.parent.position.x;
    		newPosition.y -= self.Handle.parent.position.y;
    		newPosition.z -= self.Handle.parent.position.z;
    		self.lastTheta = CalcAngle(newPosition.x,newPosition.y);
    	}
       	else if(self.activeAxis == "X"){
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(1,0,0), self.Handle.parent.position);

       		//rotate plane from parent
        	var RotationMatrix = new THREE.Matrix4();
        	RotationMatrix.extractRotation(self.Handle.parent.matrix);
        	activePlane.applyMatrix4(RotationMatrix);

       		//check initial plane / angle
       		var newPosition = checkPlane(mouse);
    		//set the position relative to the parents origin
    		newPosition.x -= self.Handle.parent.position.x;
    		newPosition.y -= self.Handle.parent.position.y;
    		newPosition.z -= self.Handle.parent.position.z;
    		self.lastTheta = CalcAngle(newPosition.z,newPosition.y);

       	}
       	else if(self.activeAxis == "Y"){
       		self.activePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0,1,0), self.Handle.parent.position);

       		//rotate plane from parent
        	var RotationMatrix = new THREE.Matrix4();
        	RotationMatrix.extractRotation(self.Handle.parent.matrix);
        	activePlane.applyMatrix4(RotationMatrix);

       		//check initial plane / angle
       		var newPosition = checkPlane(mouse);
    		//set the position relative to the parents origin
    		newPosition.x -= self.Handle.parent.position.x;
    		newPosition.y -= self.Handle.parent.position.y;
    		newPosition.z -= self.Handle.parent.position.z;
    		self.lastTheta = CalcAngle(newPosition.x,newPosition.z);
       	}
    }

    this.unClick = function(){
    	self.clicked = false;
    	self.activeAxis = "";
    	self.lastTheta = 0;
    }

    function checkPlane(mouse){
    	//project onto plane
		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		var projector = new THREE.Projector();
		projector.unprojectVector( vector, RTS.Camera );
		var Ray = new THREE.Ray(RTS.CameraHolder.position, vector.sub(RTS.CameraHolder.position).normalize());
		var intersection = new THREE.Vector3();
		Ray.intersectPlane(self.activePlane, intersection);

		//the active plane is potentially all kittywumpus and whatnot, 
		//so we have to rotate it properly
		var RotationMatrix = new THREE.Matrix4();
		RotationMatrix.extractRotation(self.Handle.matrix);
		var InverseMatrix = new THREE.Matrix4();
		InverseMatrix.getInverse(RotationMatrix);
		var newIntersection = new THREE.Vector3();
		newIntersection.copy(intersection);

		//rotate the intersection point
		intersection.applyMatrix4(InverseMatrix);

		return intersection;
    }

    //get the radians from 0 degrees an (x,y) coordinate is
    function CalcAngle (x, y){
    	var theta = Math.atan(y/x)*360/2/Math.PI;
		if (x >= 0 && y >= 0) {
			theta = theta;
		} else if (x < 0 && y >= 0) {
			theta = 180 + theta;
		} else if (x < 0 && y < 0) {
			theta = 180 + theta;
		} else if (x > 0 && y < 0) {
			theta = 360 + theta;
		} 
		return theta;
    }

    //calculate angle distance between last theta and a given theta
    function CalcAngleDifference(theta){
    	var raw_diff = self.lastTheta > theta ? self.lastTheta - theta : theta - self.lastTheta;
    	if(raw_diff > 180) raw_diff = 360 - raw_diff;

    	if(self.lastTheta > theta) raw_diff *= -1;
    	return raw_diff;
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
    		//set the position relative to the parents origin
    		newPosition.x -= self.Handle.parent.position.x;
    		newPosition.y -= self.Handle.parent.position.y;
    		newPosition.z -= self.Handle.parent.position.z;

    		//move based on difference
    		if(self.activeAxis == "Z"){
    			//Y and X Axis will determine our angle of rotation
    			//console.log("X:" + newPosition.x + " Y:" + newPosition.y);
    			var theta = CalcAngle(newPosition.x,newPosition.y);
    			var diff = CalcAngleDifference(theta);
    			
    			//do the rotation
    			if(!isNaN(diff))self.Handle.parent.rotateOnAxis(new THREE.Vector3(0,0,1), diff * (Math.PI / 180));

    			self.lastTheta = theta;
    			console.log(diff);
    		}
    		else if(self.activeAxis == "X"){
    			// Y and Z axis will determine our angle of rotation
    			//console.log("Z:" + newPosition.z + " Y:" + newPosition.y);
    			var theta = CalcAngle(newPosition.z,newPosition.y);
    			var diff = CalcAngleDifference(theta);

    			//do the rotation
    			if(!isNaN(diff))self.Handle.parent.rotateOnAxis(new THREE.Vector3(1,0,0), -diff * (Math.PI / 180));

    			self.lastTheta = theta;
    			console.log(diff);
    		}
    		else if(self.activeAxis == "Y"){
    			//X and Z axis will determine our angle of rotation
    			//console.log("X:" + newPosition.x + " Z:" + newPosition.z);
    			var theta = CalcAngle(newPosition.x,newPosition.z);
    			var diff = CalcAngleDifference(theta);
    			
    			//do the rotation
    			if(!isNaN(diff))self.Handle.parent.rotateOnAxis(new THREE.Vector3(0,1,0), -diff * (Math.PI / 180));
    			
    			self.lastTheta = theta;
    			console.log(diff);
    		}

    	}
    }

    //listener
    document.addEventListener( 'mousemove', onMouseMove, false);
    
    
	
}