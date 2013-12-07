function NewSpotlightDialog(x,y){
	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Spotlight", x, y);

	//create an accordion
	var $spotlightAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $spotlightConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $Hex = UI.addInput($spotlightConstructor, "Hex", "0xffffff");
	var $Intensity = UI.addInput($spotlightConstructor, "Intensity", "10");
	var $Distance = UI.addInput($spotlightConstructor, "Distance", "100");
	var $Angle = UI.addInput($spotlightConstructor, "Angle", Math.PI / 6);
	var $Exponent = UI.addInput($spotlightConstructor, "Exponent", "1");


	//add to the accordion
	UI.addAccordionContent($spotlightAccordion, $spotlightConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $spotlightAccordion);

	//the create button
	function createSpotlightCallback(){
		var hex = parseInt($Hex.val());
		var intensity = $Intensity.val();
		var distance = $Distance.val();
		var angle = $Angle.val();
		var exponent = $Exponent.val();

		//make the spotlight
        var light = new THREE.SpotLight(hex, intensity, distance, angle, exponent);
        light.position.set( 0, 0, 0 );
        light.castShadow = true;

        //make a target for the spotlight
        var target = new THREE.Object3D();
        target.position.set(0,-distance,0);

        //make a visualization of the spotlights cone
        //first get bottom width of cone with *MATH*
        var theta = angle;
        var radius = Math.tan(theta) * distance;
        //alert(radius);
        //make dat cylinder visualizer
        var debugMat =  new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true} );
        var cylinderMesh = new THREE.Mesh( new THREE.CylinderGeometry(0.01, radius, distance, 16, 1, true), debugMat );
        cylinderMesh.name = "Visualizer";
        cylinderMesh.position.set(0,distance / -2, 0);

        //make the box that we can grab to move the light around
        var boxMesh = new THREE.Mesh( new THREE.CubeGeometry(10, 10, 10, 1, 1, 1), debugMat );

        //combine them into the box
        boxMesh.add(light);
        boxMesh.add(target);
        boxMesh.add(cylinderMesh);
        //set the target of the spotlight
        light.target = target;
        //add
		ActiveObjects.push(boxMesh);
        scene.add(boxMesh);

        //remove dialog
        $thisWindow.remove();

        //need to update materials since a light updated
        for(var i = 0; i < ActiveObjects.length; i ++){
        	ActiveObjects[i].material.needsUpdate = true;
        }
	}
	UI.addButton($thisWindow, "Create Spotlight", createSpotlightCallback);


	//activate window
	UI.activate($thisWindow);
}