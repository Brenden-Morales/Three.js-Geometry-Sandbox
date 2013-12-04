function NewCylinderDialog(x,y){

	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Cylinder", x, y);

	//create an accordion
	var $cylinderAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $cylinderConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $RadiusTop = UI.addInput($cylinderConstructor, "Radius Top", "25");
	var $RadiusBottom = UI.addInput($cylinderConstructor, "Radius Bottom", "25");
	var $Height = UI.addInput($cylinderConstructor, "Height", "100");
	var $RadiusSegments = UI.addInput($cylinderConstructor, "Radius Segments", "32");
	var $HeightSegments = UI.addInput($cylinderConstructor, "Height Segments", "1");

	//add to the accordion
	UI.addAccordionContent($cylinderAccordion, $cylinderConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $cylinderAccordion);

	//the create button
	function createCylinderCallback(){
		var radiusTop = $RadiusTop.val();
		var radiusBottom = $RadiusBottom.val();
		var height = $Height.val();
		var radiusSegments = $RadiusSegments.val();
		var heightSegments = $HeightSegments.val();

		//make the plane
        var mat =  new THREE.MeshBasicMaterial( { color: 0xffaa00} );
        var mesh = new THREE.Mesh( new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, false), mat );

        //add it to scene and active objects list
        mesh.position.set( 0, 0, 0 );
        scene.add( mesh );
        ActiveObjects.push(mesh);

        //remove dialog
        $thisWindow.remove();
	}
	UI.addButton($thisWindow, "Create Cylinder", createCylinderCallback);


	//activate window
	UI.activate($thisWindow);

}