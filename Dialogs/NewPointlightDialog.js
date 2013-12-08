function NewPointlightDialog(x,y){
	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Pointlight", x, y);

	//create an accordion
	var $pointlightAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $pointlightConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $Hex = UI.addInput($pointlightConstructor, "Hex", "0xffffff");
	var $Intensity = UI.addInput($pointlightConstructor, "Intensity", "5");
	var $Distance = UI.addInput($pointlightConstructor, "Distance", "100");


	//add to the accordion
	UI.addAccordionContent($pointlightAccordion, $pointlightConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $pointlightAccordion);

	//the create button
	function createPointlightCallback(){
		var hex = parseInt($Hex.val());
		var intensity = parseFloat($Intensity.val());
		var distance = parseFloat($Distance.val());

		//make the pointlight
        light = new THREE.PointLight(hex, intensity, distance);
        light.position.set( 0, 0, 0 );

        //make the box that we can grab to move the light around
        var debugMat =  new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true} );
        var boxMesh = new THREE.Mesh( new THREE.CubeGeometry(10, 10, 10, 1, 1, 1), debugMat );

        //make the visualizer for this point light
        var sphereMesh = new THREE.Mesh( new THREE.SphereGeometry(distance, 8, 8), debugMat );
        sphereMesh.name = "Visualizer";


        //combine them into the box
        boxMesh.add(light);
        boxMesh.add(sphereMesh);
		ActiveObjects.push(boxMesh);
        scene.add(boxMesh);

        //remove dialog
        $thisWindow.remove();

        //need to update materials since a light updated
        for(var i = 0; i < ActiveObjects.length; i ++){
        	ActiveObjects[i].material.needsUpdate = true;
        }
	}
	UI.addButton($thisWindow, "Create Pointlight", createPointlightCallback);


	//activate window
	UI.activate($thisWindow);
}