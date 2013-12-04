function UIManager($root){
	
	//the root div
	var $Root = $root;

	//create a new window
	this.createNew = function (name, x, y){

		//create the div, set it up
		var $thisWindow = $("<div class=\"MainWindow ui-widget\"></div>");
		
		//set the css
		$thisWindow.css('background', 'rgba(176,176,176,0.91)');
    	$thisWindow.css('position', 'absolute');
    	$thisWindow.css('left', x);
    	$thisWindow.css('top', y);
    	$thisWindow.css('padding-bottom', '18px');
    	$thisWindow.css('border-radius', '4px');

    	//header bar
    	var $header = $("<div class=\"header\" style=\"cursor:default\"></div>");
    	

    	//text
    	var $message = $("<div></div>");
    	var $messageText = $("<h2>" + name + "</h2>");
    	$messageText.css('float', 'left');
    	$messageText.css('margin-left', '5px');
    	$messageText.css('margin-top', '0px');
    	$messageText.css('padding-top', '0px');
    	$messageText.css('margin-bottom', '0px');
    	$messageText.css('padding-bottom', '0px');
    	$message.append($messageText);

    	//button
    	var $buttonDiv = $("<div></div>");
    	var $button = $("<button>close</button>")
    	$buttonDiv.css('float', 'right');
    	//button function
    	$button.click(function(event){
    		init = false;
    		$thisWindow.remove();
    	});
    	$buttonDiv.append($button);

    	//$message.append($buttonDiv);
    	//combine them
    	$header.append($message);
    	$header.append($buttonDiv);
    	$thisWindow.append($header);

    	//add a border div
    	var $borderDiv = $("<div></div>");
    	$borderDiv.css('clear', 'both');
    	$borderDiv.css('width', '100%');
    	$borderDiv.css('height', '1px');
    	$borderDiv.css('border-bottom', '3px solid rgba(255, 255, 255, .2)');
    	$thisWindow.append($borderDiv);


    	//window content
		var $content = $("<div class=\"MainContent\"></div>");
		//set content css
		//$content.css('background-color', '#BDDCD9');
		$content.css('margin-left', '3px');
		$content.css('margin-right', '10px');
		$content.css('margin-top', '5px');
		$content.css('margin-bottom', '5px');

		//add content to div
		$thisWindow.append($content);

    	//return the window
    	return $thisWindow;
	}
	//add a "clear" div
	function clearDiv($mainDiv){
		var $clearDiv = $("<div></div>");
		$clearDiv.css('clear', 'both');
		$mainDiv.append($clearDiv);
	}

	//add a plain text info to a window
	this.addText = function ($UI, text, classSelector){
		//get the main content div
		var $mainDiv = classSelector == undefined ? $UI : $UI.find(classSelector);
		if($mainDiv.length == 0) $mainDiv = $UI;
		clearDiv($mainDiv);

		//create the text content div
		var $textContent = $("<div>" + text + "</div>");
		$textContent.css('cursor','default');
		$textContent.css('clear', 'both');

		//add the text content to the main div
		$mainDiv.append($textContent);
		
	}

	//add a button to a window, with a function callback
	this.addButton = function ($UI, text, callback, classSelector){
		//get the main content div
		var $mainDiv = classSelector == undefined ? $UI : $UI.find(classSelector);
		if($mainDiv.length == 0) $mainDiv = $UI;
		clearDiv($mainDiv);

		//create the button div
		var $Content = $("<div></div>");
		$Content.css('clear', 'both');

		//create the button
		var $button = $("<button>" + text + "</button>");
		$button.css('width', '100%');
		//button function
		$button.click(function(event){
			callback();
		});

		//add button to content div
		$Content.append($button);

		//add content div to main div
		$mainDiv.append($Content);
	}

	this.addInput = function($UI, text, start, callback, classSelector){
		//get the main content div
		var $mainDiv = classSelector == undefined ? $UI : $UI.find(classSelector);
		if($mainDiv.length == 0) $mainDiv = $UI;
		clearDiv($mainDiv);

		//create the Input Div
		var $Content = $("<div>"+ text +" :</div>");
		$Content.css('clear', 'both');
		$Content.css('margin-bottom', '10px');

		//input box
		var $InputDiv = $("<div></div>");
		var $Input = $("<input type=\"text\" size=\"5\" value=\"" + start + "\">");
		$InputDiv.append($Input);
		$InputDiv.css('float', 'right');

		//add them
		$Content.append($InputDiv);
		$mainDiv.append($Content);

		//return the input object so we can use it later
		return $Input;
	}

	//add a slider to a window with a callback
	this.addSlider = function ($UI, text, min, max, start, step, callback, classSelector){
		//get the main content div
		var $mainDiv = classSelector == undefined ? $UI : $UI.find(classSelector);
		if($mainDiv.length == 0) $mainDiv = $UI;
		clearDiv($mainDiv);

		//create the main slider content div
		var $Content = $("<div></div>");
		$Content.css('clear', 'both');

		//create the div for the slider label
		var $Label = $("<div>" + text + " :</div>")
		$Label.css('float', 'left');
		$Label.css('vertical-align', 'middle');
		$Label.css('padding-top', '1px');
		$Label.css('margin-right', '3px');

		//input box for confirmation of slider value
		var $Input = $("<input type=\"text\" size=\"5\" value=\"" + start + "\">");
		$Input.css('float', 'right');
		$Input.css('vertical-align', 'middle');

		//create the div for the slider
		var $Slider = $("<div></div>");
		$Slider.css('overflow', 'hidden');
		//wrapper for slider div
		var $SliderWrapper = $("<div></div>");
		$SliderWrapper.css('padding-top', '5px');


		//activate slider
		$Slider.slider({
			value: start,
			min: min,
			max: max,
			step: step,
			change: function( event, ui ) {
				$Input.val(ui.value);
				//make the callback function
				if(callback != undefined)callback(ui.value);
			}
		});

		//bind input to slider
		$Input.bind('input', function(){
			var val = $(this).val();
			//gotta handle decimal only nums and NaNs
			if(val == "-" || val == "-0" || val == "-0." || (val.indexOf("-0.") != -1 && val.lastIndexOf("0") == val.length - 1)){
				
			}
			else if(val == "-" || val == "-."|| (val.indexOf("-.") != -1 && val.lastIndexOf("0") == val.length - 1)){
				
			}
			else if(val == "0" || val == "0." ||(val.indexOf("0.") != -1 && val.lastIndexOf("0") == val.length - 1)){
				
			}
			else if(val == "."|| (val.indexOf(".") != -1 && val.lastIndexOf("0") == val.length - 1)){
				
			}
			else if (!isNaN(val) && val != ""){
				if(val > max) val = max;
				if(val < min) val = min;
				$Slider.slider("value", val);
			}
			else $Slider.slider("value", 0);
			
			
		});
		//put slider in wrapper
		$SliderWrapper.append($Slider);

		//set slider css
		$Content.css('margin-top', '10px');
		$Content.css('margin-bottom', '10px');
		//add slider
		$Content.append($Label);
		$Content.append($Input);
		$Content.append($SliderWrapper);

		//add content div to main div
		$mainDiv.append($Content);
	}


	//ACCORDION STUFF
	//create an accordion div
	this.createAccordion = function (){
		var $Content = $("<div></div>");
		$Content.css('clear', 'both');
		$Content.addClass("MainContent");
		return $Content;
	}

	//create an accordion content div
	this.createAccordionContent = function(){
		var $Content = $("<div class=\"MainContent\"></div>");
		$Content.css('clear', 'both');
		$Content.css('padding', '2px');
		return $Content;
	}

	//add an accordion content div to an accordion div
	this.addAccordionContent = function ($Accordion, $Content, text){
		$Accordion.append("<h3>" + text + "</h3>");
		$Accordion.append($Content);
	}

	//add an accordion to specified UI
	this.addAccordion = function ($UI, $Accordion){
		var $mainDiv = $UI;
		clearDiv($mainDiv);
		$Accordion.accordion({
			heightStyle: "MainContent",
			collapsible: true,
			active: false
		});
		$Accordion.css('margin-left', '3px');
		$Accordion.css('margin-right', '3px');
		$mainDiv.append($Accordion);
	}

	//MENU STUFF

	//menu item wrapper class
	simpleMenuItem = function(par, self, level, width, $list){
		//keep track of parent and self
		this.Parent = par;
		this.Self = self;
		//and level that this menu is
		this.Level = level;
		this.Width = width;

		this.li = $("<li></li>");
		this.html = $("<a href=\"#\">" + self.replace("-", " ") + "</a>");
		$(this.li).append($(this.html));
		$(this.li).addClass(self);

		if($list != undefined){
			this.List = $list;
		}
	}

	//menu wrapper class
	this.simpleMenu = function(){

		//list of menu items
		var Items = [];

		//adding stuff to the menu
		this.add = function(str, width){
			str = str.replace(" ", "-");
			var splitArray = str.split("/");
			//root items
			if(splitArray.length == 1){
				Items.push(new simpleMenuItem(null,splitArray[0],1,width, null));
			}
			else{
				//not root, create new item
				var self = splitArray[splitArray.length - 1];
				var parent = splitArray[splitArray.length - 2];
				var level = splitArray.length;
				Items.push(new simpleMenuItem(parent, self, level, width, null));
			}
		}

		//create the menu
		this.create = function(){
			var IntermediateMenus = [];

			//keep going until there is only 1 menu item
			while(Items.length > 0){
				//create the list Wrapper
				var $listWrapper = $("<ul></ul>");

				//pop off a menu item
				var CurrentItem = Items.pop();

				//find any neighbors
				for(var i = 0; i < Items.length; i ++){
					//check neighbor
					if(Items[i].Parent == CurrentItem.Parent && Items[i].Level == CurrentItem.Level){
						var neighbor = Items.splice(i,1);
						$listWrapper.append($(neighbor[0].li));
						i--;
						//width checking
						if(neighbor[0].Width != null) {
							$listWrapper.css('width', neighbor[0].Width);
						}
					}
				}
				$listWrapper.append($(CurrentItem.li));
				//set width
				if(CurrentItem.Width != null) {
					$listWrapper.css('width', CurrentItem.Width);
				}

				//create the new compound item and push it
				var compoundItem = new simpleMenuItem(CurrentItem.Parent, CurrentItem.Self, CurrentItem.Level, null, $listWrapper);
				IntermediateMenus.push(compoundItem);

			}//we have now consolidated all the menu items into sublists

			//keep going until there are no menus left
			while(IntermediateMenus.length > 1){

				//pop off a max level sub menu
				var index = 0;
				var maxLevel = -1;
				for(var i = 0; i < IntermediateMenus.length; i ++){
					if(IntermediateMenus[i].Level > maxLevel){
						maxLevel = IntermediateMenus[i].Level;
						index = i;
					}
				}
				//get the menu were working on
				var ar = IntermediateMenus.splice(index,1);
				var currentMenu = ar[0];

				//find the menu to attach it to
				for(var i = 0; i < IntermediateMenus.length; i ++){
					if(IntermediateMenus[i].Level == currentMenu.Level -1){
						var $menuParent = $(IntermediateMenus[i].List).find("." + currentMenu.Parent);
						//if we've got a match
						if($menuParent.length > 0){
							$($(IntermediateMenus[i].List).find("." + currentMenu.Parent)).append($(currentMenu.List));
						}
					}
				}

			}

			//return the final menu
			return $(IntermediateMenus[0].List);

		}

	}

	//add a menu to specified UI with a callback for handling menu selections
	this.addMenu = function($UI, $Menu, callback){
		$Menu.menu({
			select:function(event, ui) {
				if(callback != null && callback != undefined) callback(event, ui);
			}
		});
		$UI.append($Menu);
	}

	//add and activate a window
	this.activate = function($UI){

		//add to the main window
		$Root.append($UI);
		$UI.width($UI.width() + 100);

		//set size jquery attributes
		$UI.draggable({ snap: true, scroll: false, containment: "parent", distance: 50 });
		$UI.resizable({minHeight: $UI.height(), minWidth: $UI.width()});

	}

}