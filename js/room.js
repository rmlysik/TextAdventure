/**
* @projectDescription Definition file for the Room class
*
* @author  Robert Lysik robert.lysik@sbcglobal.net
* @version  0.1
*/


/**
* Create a new instance of Room.
*
* @classDescription This class creates a new Room.
* @return {Object} Returns a new Room object.
* @constructor 
*/
function Room(name, description) {
	this.name = name;
	this.description = description;
	this.exits = {};
	this.items = {};
}

Room.prototype.look = function() {
	var response = "";
	var itemList = "";
	var exitCount = 0;
	var itemCount = 0;
	
	response = "<em>" + this.name + "</em><br/>";
	response += this.description + "<br/>";
	
	response += "Obvious exits: ";
    
    for (var exit in this.exits) {
    	if (exitCount == 0) {
        	response += exit;
    	} else {
    		response += ", " + exit;
    	}
    	
    	exitCount++;
    }
    
    if (exitCount == 0) {
    	response += "none!";
    }
    
    response += "<br/>";
    
    itemList = "You also see: ";
    
    for (item in this.items) {
    	if (itemCount == 0) {
        	itemList += this.items[item].name;
    	} else {
    		itemList += " - " + this.items[item].name;
    	}
    	
    	itemCount++;
    }
    
    if (itemCount > 0) {
    	response += itemList + "<br/>";
    }
    
	return response;
}

Room.prototype.isExit = function(direction) {
	var isExit = false;
        
    if (this.exits[direction] != undefined) {
        isExit = true;
    }
        
    return isExit;
}
