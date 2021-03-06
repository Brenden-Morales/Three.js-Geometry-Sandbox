function NewSphereDialog(x,y){

	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("New Sphere", x, y);

	//create an accordion
	var $sphereAccordion = UI.createAccordion();

	//create the "constructor accordion pane"
	var $sphereConstructor = UI.createAccordionContent();

	//the args for the Plane constructor
	var $Radius = UI.addInput($sphereConstructor, "Radius", "50");
	var $WidthSegments = UI.addInput($sphereConstructor, "Width Segments", "32");
	var $HeightSegments = UI.addInput($sphereConstructor, "Height Segments", "32");
	var $PhiStart = UI.addInput($sphereConstructor, "Phi Start", "0");
	var $PhiLength = UI.addInput($sphereConstructor, "Phi Length", Math.PI * 2);
	var $ThetaStart = UI.addInput($sphereConstructor, "Theta Start", "0");
	var $ThetaLength = UI.addInput($sphereConstructor, "Theta Length", Math.PI);

	//add to the accordion
	UI.addAccordionContent($sphereAccordion, $sphereConstructor, "Constructor Options");

	//add acordion to window
	UI.addAccordion($thisWindow, $sphereAccordion);

	//the create button
	function createSphereCallback(){
		var radius = parseInt($Radius.val());
		var widthSegments = parseInt($WidthSegments.val());
		var heightSegments = parseInt($HeightSegments.val());
		var phiStart = parseFloat($PhiStart.val());
		var phiLength = parseFloat($PhiLength.val());
		var thetaStart = parseFloat($ThetaStart.val());
		var thetaLength = parseFloat($ThetaLength.val());

		//make the sphere
        var mat =  new THREE.MeshBasicMaterial( { color: 0xffaa00} );
        var mesh = new THREE.Mesh( new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength), mat );

        //add it to scene and active objects list
        mesh.position.set( 0, 0, 0 );
        scene.add( mesh );
        ActiveObjects.push(mesh);

        //remove dialog
        $thisWindow.remove();
	}
	UI.addButton($thisWindow, "Create Sphere", createSphereCallback);


	//activate window
	UI.activate($thisWindow);

}