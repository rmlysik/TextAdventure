/**
* @projectDescription Definition file for the Player class
*
* @author  Robert Lysik robert.lysik@sbcglobal.net
* @version  0.1
*/


/**
* Create a new instance of Player.
*
* @classDescription This class creates a new Player.
* @return {Object} Returns a new Item object.
* @constructor 
*/
function Player(currentLocation) {
	this.inventory = {};
	this.score = 20;
	this.currentLocation = currentLocation;
}

Player.prototype.create = function(currentLocation) {
	
}

/**
 * Looks up the location corresponding to the specified direction and
 * sets the player's current location to that location. 
 *
 * @param {String} direction A compass direction or up / down
 */
Player.prototype.go = function(direction) {
	var response = "You can't go that way.<br/>";
	
    if (this.currentLocation.isExit(direction)) {
		this.currentLocation = this.currentLocation.exits[direction];
		response = this.currentLocation.look();
	}
	
	return response;
}

/**
 * Displays the player's current inventory.
 *
 * @return {String} A list of items the player is carrying.
 */
Player.prototype.displayInventory = function() {   
	var response = "";
	var itemList = "";
	var itemCount = 0;
	
	for (item in this.inventory) {
    	if (itemCount == 0) {
        	itemList = this.inventory[item].name;
    	} else {
    		itemList += " - " + this.inventory[item].name;
    	}
    	
    	itemCount++;
    }
    
    if (itemCount > 0) {
    	response += "You're carrying: " + itemList + "<br/>";
    } else {
    	response = "You're carrying nothing.<br/>";
    }    
    
    return response;
}

/**
 * Removes an item from the player's inventory and adds it to the 
 * items found at the player's current location.
 *
 * @param {String} itemName The name of the item to drop
 * @return {String} Message indicating that the item was dropped.
 */
Player.prototype.dropItem = function(itemName) {
	var response = "You can't see any such thing.<br/>";
	
	for (item in this.inventory) {
		var name = this.inventory[item].name.toLowerCase();
		if (name.indexOf(itemName) >= 0) {			
		    this.currentLocation.items[item] = this.inventory[item];
			delete this.inventory[item];
			response = "Dropped.<br/>";
			break;
		}
    }
    
    return response;
}

/**
 * Removes an item from the current location and adds it to the 
 * player's inventory.
 *
 * @param {String} itemName The name of the item to take
 * @return {String} Message indicating whwther item was taken.
 */
Player.prototype.takeItem = function(itemName) {
	var response = "You can't see any such thing.<br/>";
	
	for (item in this.currentLocation.items) {
		var name = this.currentLocation.items[item].name.toLowerCase();
		if (name.indexOf(itemName) >= 0) {			
		    this.inventory[item] = this.currentLocation.items[item];
			delete this.currentLocation.items[item];
			response = "Taken.<br/>";
			break;
		}
  }
    
  return response;
}