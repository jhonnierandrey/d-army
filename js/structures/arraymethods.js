// ARRAY METHODS

const items = [
	{ name : 'Bike', price : 100},
	{ name : 'TV', price : 200},
	{ name : 'Album', price : 10},
	{ name : 'Book', price : 5},
	{ name : 'Phone', price : 500},
	{ name : 'Computer', price : 1000},
	{ name : 'Keyboard', price : 25},
]

// filter method
const filteredItems = items.filter((item) => {
	return item.price <= 100;
})

console.log(filteredItems);

// map method

const mappedItems = items.map((item) => {
	return item.price;
})

console.log(mappedItems);

// find method

const foundItem = items.find((item) => {
	return item.name === 'Album';
})

console.log(foundItem);

// forEach method

items.forEach((item) => {
	console.log(item.price);
})

// some method

const hasInexpensiveItems = items.some((item) => {
	return item.price <= 100;
})

console.log(hasInexpensiveItems);

// every method

const hasInexpensiveItems2 = items.every((item) => {
	return item.price <= 100;
})

console.log(hasInexpensiveItems2);

// reduce method

const total = items.reduce((currentTotal, item) =>{
	return item.price + currentTotal;
}, 0)

console.log(total);


// includes method 

const newItems = [ 1, 2, 3, 4, 5]

const includesTwo = newItems.includes(2)

console.log(includesTwo);
