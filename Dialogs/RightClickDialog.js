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

	//listening for menu selections
	function menuListener(event,ui){
		var $a = $(ui.item)
		if($a.children().length == 1){
			//the text of the menu item that we chose
			var choice = $a.text();

			if(choice == "Plane"){
				NewPlaneDialog(event.clientX, event.clientY);
			}
			else if(choice == "Cube"){
				NewCubeDialog(event.clientX, event.clientY);
			}
			else if(choice == "Cylinder"){
				NewCylinderDialog(event.clientX, event.clientY);
			}
			else if(choice == "Sphere"){
				NewSphereDialog(event.clientX, event.clientY);
			}

			$thisWindow.remove();
		}
	}

	//add the menu
	UI.addMenu($thisWindow, $(Menu1.create()), menuListener);

	//create an accordion
	var $cameraAccordion = UI.createAccordion();
	var $cameraPosition = UI.createAccordionContent();
	var $cameraRotation = UI.createAccordionContent();
	//camera position accordion
	var $XInput = UI.addInput($cameraPosition, "X", "0");
	var $YInput = UI.addInput($cameraPosition, "Y", "0");
	var $ZInput = UI.addInput($cameraPosition, "Z", "0");
	function positionButtonCallback(){
		//alert($XInput.val() + "\n" + $YInput.val() + "\n" + $ZInput.val());
	}
	UI.addButton($cameraPosition, "set camera position", positionButtonCallback)
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