function RightClickDialog(x,y){
	
	//UI manager
    var UI = new UIManager($("#WindowOverlay"));

	//the UI window attached to this right click
	var $thisWindow = UI.createNew("options", x, y);

	//TRYING OUT A SIMPLER MENU CREATION SYSTEM
	var Menu1 = new UI.simpleMenu();
	Menu1.add("Create New");

	Menu1.add("Create New/Geometry", 80);
	Menu1.add("Create New/Lights");

	Menu1.add("Create New/Geometry/Plane", 60);
	Menu1.add("Create New/Geometry/Cube");
	Menu1.add("Create New/Geometry/Cylinder");
	Menu1.add("Create New/Geometry/Sphere");

	Menu1.add("Create New/Lights/Basic", 80);
	Menu1.add("Create New/Lights/Ambient");
	Menu1.add("Create New/Lights/Area");
	Menu1.add("Create New/Lights/Directional");
	Menu1.add("Create New/Lights/Hemisphere");
	Menu1.add("Create New/Lights/Point");
	Menu1.add("Create New/Lights/Spot");

	//add the menu
	UI.addMenu($thisWindow, $(Menu1.create()));

	//create an accordion
	var $cameraAccordion = UI.createAccordion();
	var $cameraPosition = UI.createAccordionContent();
	var $cameraRotation = UI.createAccordionContent();
	//camera position accordion
	UI.addInput($cameraPosition, "X", "0");
	UI.addInput($cameraPosition, "Y", "0");
	UI.addInput($cameraPosition, "Z", "0");
	//camera rotation accordion
	UI.addSlider($cameraRotation, "X", -1 * Math.PI, 1 * Math.PI, 0, 0.01, function(x){
    	RTS.Camera.rotation.x = -x;
    });
	UI.addSlider($cameraRotation, "Y", -1 * Math.PI, 1 * Math.PI, 0, 0.01, function(y){
    	RTS.Camera.rotation.y = -y;
    });
	UI.addSlider($cameraRotation, "Z", -1 * Math.PI, 1 * Math.PI, 0, 0.01, function(z){
    	RTS.Camera.rotation.z = -z;
    });
	//add the accordion panes 
	UI.addAccordionContent($cameraAccordion, $cameraPosition, "Camera Position");
	UI.addAccordionContent($cameraAccordion, $cameraRotation, "Camera Rotation");
	UI.addAccordion($thisWindow, $cameraAccordion);




	//activate window
	UI.activate($thisWindow);



}