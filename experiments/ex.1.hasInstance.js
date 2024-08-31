console.groupCollapsed("%c- Has instance -", 'color: purple; font: 16px/1.4 bold');

function Animal(){

}

try {
	Animal[Symbol.hasInstance] = function(instance){
		return false;
	}
} catch(e){
	console.error(e);

	console.info('Direct property assignment is prohibited by writable: false')
}

let descriptor = Object.getOwnPropertyDescriptor(Function.prototype, Symbol.hasInstance);
console.info("The descriptor is writable=%s", descriptor.writable);
console.dir(descriptor);

Object.defineProperty(Animal, Symbol.hasInstance, {
	writable: true
});
let childDescriptor = Object.getOwnPropertyDescriptor(Animal, Symbol.hasInstance);
console.info("The child descriptor is set to be writable=%s", childDescriptor.writable);
console.dir(childDescriptor);

Animal[Symbol.hasInstance] = function(instance){
	console.log('Has instance call');
	return false;
}

let instance = new Animal();
if(instance instanceof Animal){
	console.error('Is instance ???');
} else {
	console.info('%cInstanceof calls the correct method and the instance is denied to be a child of Animal', 'color: green; font: 20px')
}

console.groupEnd();