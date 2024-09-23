console.log('%cUsage of __proto__ in object initializer', 'font-size: 16px;');
let objectA = {
	a: Number(1),
	b: {
		ba: 1
	}
}

let objectB = {
	__proto__: objectA,
	c: 3,
	d: 4
}

console.log('Number is', objectB.a);
console.log(objectA.a === objectB.a);
console.log('Referenced object is', objectB.b);
console.log(objectA.b === objectB.b);

objectB.a = Number(1);
console.log('Despite the wrapper is different, the result is the same', objectA.a === objectB.a);

let objectC = JSON.parse('{"__proto__": {"a": 1}, "c": 3, "d": 4}');
console.log('__proto__ is a plain property in JSON', objectC);

let objectD = Object.create(objectA);
console.log('__proto__ and Object.create lead to the same result', objectD.constructor.prototype === objectA.constructor.prototype);

let objectE = JSON.parse(/** @lang JSON */`{
	"a": 1,
	"a": 2
}`);

console.log('Json allows property duplicates with overriding', objectE);

let dictionaryObject = {
	__proto__: null
}

console.log('Dictionary object is', dictionaryObject);
console.log('No standard prototype property is available: toString=%s', dictionaryObject.toString);
try {
	console.log('Concatenation: string + ' + dictionaryObject);
} catch (e) {
	console.error(e);
}
console.log('Reverting to a "normal" object');
Object.setPrototypeOf(dictionaryObject, Object.prototype);
console.log('Concatenation: string + ' + dictionaryObject);