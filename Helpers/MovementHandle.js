function MovementHandle(){

	//parent object3d that holds all the handles together
	this.Handle = new THREE.Object3D();
	//whether or not this handle is currently clicked
	this.clicked = false;
	//the axis that was clicked on
	this.activeAxis = "";
	//the plane that corresponds to the active axis
	this.activePlane;
	//last click location
	this.lastMouse = new THREE.Vector3(0,0,0);

	var self = this;

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
    var MeshY = new THREE.Mesh(new THREE.LatheGeometry(arrowVertices, 4), new THREE.MeshBasicMaterial({color: 0x00ff00, 
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
    	var projector = new THREE.Projector();
		projector.unprojectVector( vector, RTS.Camera );
		raycaster = new THREE.Raycaster( RTS.CameraHolder.position, vector.sub( RTS.CameraHolder.position ).normalize() );
		HandleIntersections = raycaster.intersectObjects(self.Handle.children);
		if(HandleIntersections.length > 0){
			self.Click(HandleIntersections[0].object.name, new THREE.Vector3(vector.x, vector.y,0));
		} 
    }

    //set this handle to clicked so it will translate on mouse move
    this.Click = function(Axis, InitialClick){
    	self.clicked = true;
    	self.activeAxis = Axis;
    	self.lastMouse = InitialClick;
    }

    this.unClick = function(){
    	self.clicked = false;
    	self.activeAxis = "";
    	self.lastMouse = new THREE.Vector3();
    }

    //when a handle is clicked, keep track of mouse movement
    function onMouseMove(event){
    	if(self.clicked){
    		alert("Mouse MOVED");
    	}
    }

    //listener
    document.addEventListener( 'mousemove', onMouseMove, false);
}