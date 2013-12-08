function NewCubeDialog(x,y){

	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Cube", x, y);

	//create an accordion
	var $cubeAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $cubeConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $Width = UI.addInput($cubeConstructor, "Width", "50");
	var $Height = UI.addInput($cubeConstructor, "Height", "50");
	var $Depth = UI.addInput($cubeConstructor, "Depth", "50");
	var $WidthSegments = UI.addInput($cubeConstructor, "Width Segments", "1");
	var $HeightSegments = UI.addInput($cubeConstructor, "Height Segments", "1");
	var $DepthSegments = UI.addInput($cubeConstructor, "Depth Segments", "1");

	//add to the accordion
	UI.addAccordionContent($cubeAccordion, $cubeConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $cubeAccordion);

	//the create button
	function createCubeCallback(){
		var width = parseInt($Width.val());
		var height = parseInt($Height.val());
		var depth = parseInt($Depth.val());
		var widthSegments = parseInt($WidthSegments.val());
		var heightSegments = parseInt($HeightSegments.val());
		var depthSegments = parseInt($DepthSegments.val());

		//make the cube
        var mat =  new THREE.MeshBasicMaterial( { color: 0xffaa00} );
        var mesh = new THREE.Mesh( new THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments), mat );

        //add it to scene and active objects list
        mesh.position.set( 0, 0, 0 );
        scene.add( mesh );
        ActiveObjects.push(mesh);

        //remove dialog
        $thisWindow.remove();
	}
	UI.addButton($thisWindow, "Create Cube", createCubeCallback);


	//activate window
	UI.activate($thisWindow);

}