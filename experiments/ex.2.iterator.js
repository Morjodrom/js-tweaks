console.group("%c- Iterator -", 'color: purple; font: 16px/1.4 bold');

function Animal(){

}

try {
	for(let i of Animal){}
} catch(e){
	console.info('No iterator symbol, no iteration')
	console.error(e);
}

Animal[Symbol.iterator] = function(){
	console.warn('Wrong iterator. The symbol MUST return the very iterable');
	console.warn('However, array contains the iterable but is not iterable itself')
	return [1,2,3];
}

try {
	for(let i of Animal){}
} catch(e){
	console.info('Wrong iterator symbol');
	console.error(e);
}

console.info('Correct iterator symbol');
Animal[Symbol.iterator] = function(){
	return [1,2,3].values();
}

for(let i of Animal){
	console.log(i);
}