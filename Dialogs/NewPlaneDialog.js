function NewPlaneDialog(x,y){

	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Plane", x, y);

	//create an accordion
	var $planeAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $planeConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $Width = UI.addInput($planeConstructor, "Width", "50");
	var $Height = UI.addInput($planeConstructor, "Height", "50");
	var $WidthSegments = UI.addInput($planeConstructor, "Width Segments", "1");
	var $HeightSegments = UI.addInput($planeConstructor, "Height Segments", "1");

	//add to the accordion
	UI.addAccordionContent($planeAccordion, $planeConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $planeAccordion);

	//add 

	//the create button
	function createPlaneCallback(){
		var width = $Width.val();
		var height = $Height.val();
		var widthSegments = $WidthSegments.val();
		var heightSegments = $HeightSegments.val();

		//make the plane
        var mat =  new THREE.MeshBasicMaterial( { color: 0xffaa00, side:THREE.DoubleSide} );
        var mesh = new THREE.Mesh( new THREE.PlaneGeometry( width, height, widthSegments, heightSegments), mat );

        //add it to scene and active objects list
        mesh.position.set( 0, 0, 0 );
        scene.add( mesh );
        ActiveObjects.push(mesh);

        //remove dialog
        $thisWindow.remove();
	}
	UI.addButton($thisWindow, "Create Plane", createPlaneCallback);


	//activate window
	UI.activate($thisWindow);

}