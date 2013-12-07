function MovementHandle(){

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

    this.type = "Movement";
    this.Handle.name = "Handle";

	var self = this;

    //zero out parents rotation
    this.negateRotation = function(){
        var parentRotation = new THREE.Matrix4();
        parentRotation.extractRotation(self.Handle.parent.matrix);
        var RotationMatrix = new THREE.Matrix4();
        RotationMatrix.getInverse(parentRotation);
        this.Handle.applyMatrix(RotationMatrix);
    }

	//arrows
    var arrowVertices = [];
    arrowVertices.push(new THREE.Vector3(0.01,0,0));
    arrowVertices.push(new THREE.Vector3(0.01,0,1));
    arrowVertices.push(new THREE.Vector3(0.125,0,1));
    arrowVertices.push(new THREE.Vector3(0,0,1.5));

    //depthTest = false;
	//depthWrite = false;
	//side = THREE.FrontSide;
	//transparent = true;

    //z
    var MeshZ = new THREE.Mesh(new THREE.LatheGeometry(arrowVertices, 4), new THREE.MeshBasicMaterial({color: 0x0000ff, 
    																									depthTest: false, 
    																									depthWrite: false, 
    																									transparent: true}));
    MeshZ.name = "Z";
    //x
    var MeshX = new THREE.Mesh(new THREE.LatheGeometry(arrowVertices, 4), new THREE.MeshBasicMaterial({color: 0xff0000, 
    																									depthTest: false, 
    																									depthWrite: false, 
    																									transparent: true}));
    MeshX.name = "X";
    //y
    var MeshY = new THREE.Mesh(new THREE.LatheGeometry(arrowVertices, 4), new THREE.MeshBasicMaterial({color: 0x00CC00, 
    																									depthTest: false, 
    																									depthWrite: false, 
    																									transparent: true}));
    MeshY.name = "Y";

    //scale out the handles
    MeshZ.scale = new THREE.Vector3(20,20,20);
    MeshX.scale = new THREE.Vector3(20,20,20);
    MeshY.scale = new THREE.Vector3(20,20,20);

    //rotate x and z handles
    MeshX.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI / 2);
    MeshY.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / -2);

    //add handles
    this.Handle.add(MeshZ);
    this.Handle.add(MeshX);
    this.Handle.add(MeshY);

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
       		//have to get the proper normal
       		var normal = new THREE.Vector3(0,0,1);
       		normal.applyAxisAngle(new THREE.Vector3(0,1,0), RTS.CameraHolder.rotation.y);
       		//alert(normal.x + "\n" + normal.y + "\n" + normal.z);
       		self.activePlane.setFromNormalAndCoplanarPoint(normal, self.Handle.parent.position);
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