/**
* @projectDescription Definition file for the Item class
*
* @author  Robert Lysik robert.lysik@sbcglobal.net
* @version  0.1
*/


/**
* Create a new instance of Item.
*
* @classDescription This class creates a new Item.
* @return {Object} Returns a new Item object.
* @constructor 
*/
function Item(name, description) {
	this.name = name;
	this.description = description;
}

Item.prototype.create = function() {
	
}