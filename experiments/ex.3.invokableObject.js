console.group("%c- Invokable Object -", 'color: purple; font: 16px/1.4 bold');

let obj = {
	a: 1,
	b: 2,
	c: 3
}

try {
	obj();
} catch(e){
	console.error(e);
}

// https://262.ecma-international.org/5.1/#sec-13.2
console.info('Setting a prototype is not enough as the body does not exist and the body is set internally in the [[Call]]')
let obj2 = Object.setPrototypeOf(obj, function(){});
console.dir(obj2);
try {
	obj2();
	console.error('Impossible to reach this point');
} catch(e){
	console.error(e);
	console.info(obj2)
}

console.log('Though the call exists in the prototype', obj2.call);
try {
	obj2.call(window);
	console.error('Impossible to reach this point');
} catch(e){
	console.log('Calling is not possible due to', e);
}


console.info('Setting a constructed function will not work');
let obj3 = Object.setPrototypeOf(obj, new Function('a', 'b', 'return a + b'));
console.log(obj3);
console.log(obj3.call);

try {
	obj3();
	console.error('Impossible to reach this point');
} catch(e){
	console.log('Neither for a direct invocation', e);
}

try {
	obj3.call(window);
} catch(e){
	console.log('Nor for a call invocation', e);
}

console.log('%c Direct object invocation is not possible', 'color: red; font: 16px/1.4 bold');


console.log('%c Object invocation is possible as a workaround via copying it to the function', 'color: green; font: 16px/1.4 bold');
let baseFunction = function(){
	console.log('Called the base function');
};
let obj4 = Object.assign(baseFunction, obj);
console.log(obj4);
obj4();

console.groupEnd();