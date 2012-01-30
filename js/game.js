/**
* @projectDescription Definition file for the Game class
*
* @author  Robert Lysik robert.lysik@sbcglobal.net
* @version  0.1
*/

/**
* Create a new instance of Game.
*
* @classDescription This class creates a new Game.
* @return {Object} Returns a new Game object.
* @constructor 
*/
function Game(name, description) {
	this.name = name;
	this.description = description;
	this.items = {};
	this.rooms = {};
	this.ignoreWords = new Array();
}

Game.prototype.create = function() {
	this.ignoreWords.push('a');
	this.ignoreWords.push('the');
	this.ignoreWords.push('an');
	this.ignoreWords.push('at');
	this.ignoreWords.push('to');
	
	this.items['chalice'] = new Item("Golden Chalice", "An ornately decorated golden chalice.");
	this.items['candelabra'] = new Item("Wrought Iron Candelabra", "A three arm wrought iron candelabra.");	
	this.items['sack'] = new Item("Leather Sack", "A heavily worn leather sack.");	
	
	this.rooms['frontHall'] = new Room("Front Hall", "You are in the front hall.");
	this.rooms['diningRoom'] = new Room("Dining Room", "You are in the dining room.");
	this.rooms['diningRoom'].hint = "The chalice may come in handy.";
	this.rooms['study'] = new Room("Study", "You are in the study.");
	
	this.rooms['frontHall'].exits['east'] = this.rooms['study'];
	this.rooms['frontHall'].exits['west'] = this.rooms['diningRoom'];
	this.rooms['diningRoom'].exits['east'] = this.rooms['frontHall'];
	this.rooms['study'].exits['west'] = this.rooms['frontHall'];
	
	this.rooms['diningRoom'].items['chalice'] = this.items['chalice'];
	this.rooms['study'].items['candelabra'] = this.items['candelabra'];
	
	this.player = new Player(this.rooms['frontHall']);
	this.player.inventory['sack'] = this.items['sack'];
}

Game.prototype.toString = function() {	
    var response = "<b>" + game.name + "</b><br/>";
    response += game.description + "<br/><br/>";
    
    return response;
}

/**
* Takes a string as an argument and performs the specified action. 
* For example, command "go north" will move the player to the location 
* north of their current location. The command string may consist of a 
* single word, such as "help", or a combination of words such as 
* "take candelabra".  If the command is not supported, the message 
* "That's not a verb I recognize" is returned to the player. 
* 
* @param {String} command The command string entered by the player.
* @return {String} Returns response indicating the result of command.
*/
Game.prototype.processCommand = function(command) {
	command = command.toLowerCase();
	command = jQuery.trim(command);
	var response = "";
	var arguments = "";
	var argStart = command.indexOf(' ');
	
	if (argStart >= 0) {
		arguments = command.substr(argStart + 1);
		command = command.substr(0, argStart);
	}
	
    if (this.ignoreWords.indexOf(command) > 0) {
    	response = this.processCommand(arguments);	
    } else {
    	switch (command) {
	        case 'go':
	            response = this.processCommand(arguments);
	            
	            if (response.length == 0) {
	            	response = "You can't go that way." + "<br/>";
	            }
	            
	            break;
	    
	        case 'take':
	            response = this.take(arguments);
	            break;
	    
	        case 'drop':
	            response = this.drop(arguments);
	            break;
	        
	        case 'n':
	        case 'north':
	            response = this.player.go('north');
	            break;
	
	        case 's':
	        case 'south':
	            response = this.player.go('south');
	            break;
	
	        case 'e':
	        case 'east':
	            response = this.player.go('east');
	            break;
	
	        case 'w':
	        case 'west':
	            response = this.player.go('west');
	            break;
	
	        case 'u':
	        case 'up':
	            response = this.player.go('up');
	            break;
	
	        case 'd':
	        case 'down':
	            response = this.player.go('down');
	            break;
	            
			case 'l':
			case 'look':
			    response = this.look();
			    break;
			
			case 'i':
			case 'inventory':
			    response = this.inventory();
			    break;
			
			case 'help':
			    response = this.help();
			    break;
			  
			case 'score':
			    response = this.score();
			    break;
			    
			default:
			    response = "Sorry, I don't understand.<br/>"
		}
  }
	
	return response;
}

/**
 * Takes the name of an item as an argument and removes the item from the player's 
 * inventory. If the item doesn't exist in the player's inventory, the message 
 * "You can't see any such thing" is returned to the player. Otherwise, the 
 * item is added to the current location and the message "Dropped" is returned 
 * to the player.
 *
 * @param {String} itemName The name of the item to drop
 * @return {String} Message indicating whether item was dropped.
 */
Game.prototype.drop  = function(itemName) {	
	return this.player.dropItem(itemName);
}
  
/**
* Determines whether the command entered is a valid direction.
* @param {String} command The command string entered by the player.
* @return {Boolean} Returns reponse indicating the result of command.
*/
Game.prototype.go = function(direction) {
	return this.player.go(direction);
}

/**
* Determines whether the command entered is a valid direction.
* @param {String} command The command string entered by the player.
* @return {Boolean} Returns reponse indicating the result of command.
*/
Game.prototype.help = function() {
	response = "A voice booms out...<br/>" + 
               "Try: LOOK,JUMP,SWIM,CLIMB,THROW,FIND,GO,TAKE,INVENTORY,SCORE.<br/>";
      
	hint = this.player.currentLocation.hint;
	  
	if (hint != undefined) {
	    if (hint.length > 0) {
	        response += hint + "<br/>";
	    }
	}
	
	return response;
}

/**
* Determines whether the command entered is a valid direction.
* @param {String} command The command string entered by the player.
* @return {Boolean} Returns reponse indicating the result of command.
*/
Game.prototype.inventory = function() {
	return this.player.displayInventory();
}

/**
* Determines whether the command entered is a valid direction.
* @param {String} command The command string entered by the player.
* @return {Boolean} Returns reponse indicating the result of command.
*/
Game.prototype.look = function() {
	return this.player.currentLocation.look();
}

/**
* Returns a message to the player indicating their current points out the 
* total available points.
* @return {String} The player's score.
*/
Game.prototype.score = function() {
	var response = "You have scored " + this.player.score + " out of a possible " + this.maxScore + ".<br/>";
    
    return response;
}

/**
 * Takes the name of an item as an argument and adds the item to the player's 
 * inventory. If the item doesn't exist at the current location, the message 
 * "You can't see any such thing" is returned to the player. Otherwise, the 
 * item is added to the player's inventory and the message "Taken" is returned 
 * to the player.
 *
 * @param {String} itemName The name of the item to take
 * @return {String} Message indicating whether item was taken.
 */
Game.prototype.take  = function(itemName) {	
	return this.player.takeItem(itemName);
}

