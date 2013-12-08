function InputState(){
	
	//currently selected object, null if no object selected
	var CurrentObject = null;
	//handle associated with current object, null if there is not a handle
	var CurrentHandle = null;
	//whether or not the current handle is clicked
	var HandleClicked = false;
	//whether or not we're messing with vertices
	var VerticesActive = false;

	var self = this;

	//delete an object and its handle, remove the object from scene
	this.clearObjectAndHandle = function(){
		//don't do anything if the current object is null
		if(CurrentObject != null){
			for(var i = 0; i < ActiveObjects.length; i ++){
				if(ActiveObjects[i] == CurrentObject){
					ActiveObjects.splice(i,1);
					CurrentObject.remove(CurrentHandle.Handle);
					CurrentHandle = null;
					scene.remove(CurrentObject);
					CurrentObject = null;
				}
			}
		}
	}

	//switch from translation handle to rotation handle
	//or vice versa
	this.changeHandleType= function(){
		//if we have a handle and an object, we can switch them
		if(CurrentHandle != null && CurrentObject != null){
			if(CurrentHandle.type == "Movement"){
				CurrentObject.remove(CurrentHandle.Handle);
				CurrentHandle = new RotationHandle();
				CurrentObject.add(CurrentHandle.Handle);
			}
			else if(CurrentHandle.type == "Rotation"){
				CurrentObject.remove(CurrentHandle.Handle);
				CurrentHandle = new MovementHandle();
				CurrentObject.add(CurrentHandle.Handle);
				CurrentHandle.negateRotation();
			}
		}
	}

	//check to see if we clicked a handle
	this.checkHandleClicked = function(vector){
		var HandleClicked = false;
		if(CurrentHandle != null)HandleClicked = CurrentHandle.checkClicked(vector);
		return HandleClicked;
	}

	//unclick a handle
	this.unclickHandle = function(){
		if(CurrentHandle != null){
    		if(CurrentHandle.clicked) CurrentHandle.unClick();
    	}
	}

	//changing a handle from one object to another
	this.changeObjectAndHandle = function(newObject){
		//remove a handle if it exists
		if(CurrentHandle != null){
			CurrentObject.remove(CurrentHandle.Handle);
			CurrentHandle = null;
			CurrentObject = null;
		}

		//new handle
		CurrentObject = newObject;
		CurrentHandle = new MovementHandle();
		newObject.add(CurrentHandle.Handle);
		CurrentHandle.negateRotation();
		
	}

	//remove a handle if necessary
	this.removeHandle = function(){
		if(HandleClicked == false && CurrentObject != null){
			CurrentObject.remove(CurrentHandle.Handle);
			CurrentHandle = null;
			CurrentObject = null;
		}
	}

	//zero out position or rotation handle
	this.zeroHandle = function(){
		if(CurrentHandle != null && CurrentObject != null){
			if(CurrentHandle.type == "Movement"){
				CurrentObject.position.set(0,0,0);
			}
			else if(CurrentHandle.type == "Rotation"){
				CurrentObject.rotation.set(0,0,0);
			}
		}
	}

	//toggle mesh visualization helpers from object
	this.toggleVisualization = function(){
		if(CurrentHandle != null && CurrentObject != null){
			for(var i = 0; i < CurrentObject.children.length; i ++){
				if(CurrentObject.children[i].name == "Visualizer"){
					if(CurrentObject.children[i].visible) CurrentObject.children[i].visible = false;
					else CurrentObject.children[i].visible = true;
				}
			}
		}
	}

	//toggle vertice editor mode
	this.toggleVertices = function(){
		if(CurrentHandle != null && CurrentObject != null){

			//check to see if vertex handles already exist
			var vertHandlesExist = false;
			var vertHandlesIndex = 0;
			for(var i = 0; i < CurrentObject.children.length; i ++){
				if(CurrentObject.children[i].name == "VertexHandles"){
					vertHandlesExist = true;
					vertHandlesIndex = i;
				} 
			}
			//if vertex handles exist, remove them
			if(vertHandlesExist){
				CurrentObject.remove(CurrentObject.children[vertHandlesIndex]);
				//maybe not?
				CurrentObject.add(CurrentHandle.Handle);
			}
			else{
				//maybe not?
				CurrentObject.remove(CurrentHandle.Handle);

				var particles = CurrentObject.geometry.vertices.length;
				//create the main buffergeometry for the particles
		        var geometry = new THREE.BufferGeometry();
		        geometry.addAttribute( 'position', Float32Array, particles, 3 );
		        geometry.addAttribute( 'color', Float32Array, particles, 3 );
		        //positions and colors array
		        var positions = geometry.attributes.position.array;
		        var colors = geometry.attributes.color.array;
		        //color for each particle
		        var color = new THREE.Color();
		        color.setRGB( 1, 0, 1 );

				for(var i = 0; i < CurrentObject.geometry.vertices.length; i ++){
					//set up particle positions
			        positions[ (i*3)+0 ] = CurrentObject.geometry.vertices[i].x;
			        positions[ (i*3)+1 ] = CurrentObject.geometry.vertices[i].y;
			        positions[ (i*3)+2 ] = CurrentObject.geometry.vertices[i].z;
			        //set up particle colors
			        colors[ (i*3)+0 ] = color.r;
			        colors[ (i*3)+1 ] = color.g;
			        colors[ (i*3)+2 ] = color.b;
				}
				//make the particle system
				geometry.computeBoundingSphere();
			    var material = new THREE.ParticleSystemMaterial( { size: 1, vertexColors: true } );
			    particleSystem = new THREE.ParticleSystem( geometry, material );
			    particleSystem.name = "VertexHandles";
			    

			    //create a wireframe mesh over current Geometry
			    var geom = CurrentObject.geometry.clone();
			    var wiremat = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: true});
			    var msh = new THREE.Mesh(geom, wiremat);
			    msh.scale.set(1.0005, 1.0005, 1.0005);
			    particleSystem.add(msh);
			    CurrentObject.add(particleSystem);
			}
		}
	}


}