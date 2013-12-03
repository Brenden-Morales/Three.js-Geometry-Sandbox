function RTSCamera(Input){

	//I AM SO UPSET THAT THIS WORKS YOU DO NOT EVEN KNOW
	//YOU DO NOT

	//use this to transform the camera around its local X Y and Z axis,
	//as well as rotation around the Y Axis
	this.CameraHolder = new THREE.Object3D();
	
	//this we use to rotate around the x axis
	this.Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	this.Camera.rotationAutoUpdate = true;

	//so we can rotate independently about the x axis without breaking movement in a planar sense
	this.CameraHolder.add(this.Camera);
	
	var self = this;

	this.update = function(){
		if(Input.checkKey("q")){
			self.CameraHolder.rotateOnAxis(new THREE.Vector3(0,1,0), 0.05);
	    }
	    if(Input.checkKey("e")){
	        self.CameraHolder.rotateOnAxis(new THREE.Vector3(0,1,0), -0.05);
	    }
	    if(Input.checkKey("up arrow")){
	    	//ROTATING THE CAMERA AND NOT ITS PARENT
	    	self.Camera.rotateOnAxis(new THREE.Vector3(1,0,0), 0.05);
	    }
	    if(Input.checkKey("down arrow")){
	    	//ROTATING THE CAMERA AND NOT ITS PARENT
	        self.Camera.rotateOnAxis(new THREE.Vector3(1,0,0), -0.05);
	    }
	    if(Input.checkKey("w")){
	    	self.CameraHolder.translateZ(-1);
	    }
	    if(Input.checkKey("s")){
	    	self.CameraHolder.translateZ(1);
	    }
	    if(Input.checkKey("a")){
	        self.CameraHolder.translateX(-1);
	        
	    }
	    if(Input.checkKey("d")){
	        self.CameraHolder.translateX(1);
	        
	    }
	    if(Input.checkKey("space")){
	        self.CameraHolder.translateY(1);
	        
	    }
	    if(Input.checkKey("control")){
	        self.CameraHolder.translateY(-1);
	    }

	}

}