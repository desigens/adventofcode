// const arr = [0, 2, 7, 0];
const arr = [10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6];

// Step counter zero
let counter = 0;

const hash = {};

// While hash not contains state
while (!hash[arr.join(' ')]) {

	// Set hash key with step counter value
	hash[arr.join(' ')] = counter;

	// Do Routine
	routine();

	// Increase step counter
	counter++;
}

console.log('REPEAT FOUND ON STEP:', counter);
console.log('LOOP SIZE:', counter - hash[arr.join(' ')]);

// Routine
function routine() {

	// Find max index
	let index = getIndexOfMax(arr);
	
	// Get index value to tmp
	let tmp = arr[index];
	
	// Set index value to zero
	arr[index] = 0;

	// While tmp > zero
	while (tmp > 0) {

		// Get next index
		// If next index equal length next index is zero
		index = index === arr.length - 1 ? 0 : index + 1;

		// Increase next index value
		arr[index] = arr[index] + 1;

		// Decrease tmp
		tmp = tmp - 1;
	}
}

function getIndexOfMax(arr) {
	let i = 0;
	let max = 0;
	arr.forEach((a, index) => {
		if (a > max) {
			max = a;
			i = index;
		}
	})
	return i;
}
