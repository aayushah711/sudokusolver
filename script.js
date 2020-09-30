let tds;
let count = 0;
let toBeFilled;
let matrix;

window.onload = () => {
	const problem = document.getElementById('problem');
	problem.value = `0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0`;

	const submit = document.getElementById('submit');
	submit.addEventListener('click', () => {
		event.preventDefault();
		try {
			processData();
		} catch (error) {
			console.log(error);
		}
	});
	const solve = document.getElementById('solve');
	solve.addEventListener('click', () => {
		event.preventDefault();
		try {
			solveProgram();
		} catch (error) {
			console.log(error);
		}
	});

	tds = document.getElementsByTagName('td');
};

async function processData() {
	//Enter your code here
	let input = document.getElementById('problem').value;
	input = input.trim().split('\n');
	matrix = [];

	for (let i = 0; i < 9; i++) {
		matrix.push(input[i].trim().split(' ').map(Number));
	}

	toBeFilled = [];

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] === 0) {
				toBeFilled.push([ i, j ]);
			} else {
				tds[9 * i + j].textContent = matrix[i][j];
			}
		}
	}
}

function solveProgram() {
	recursion(0);

	async function recursion(index) {
		if (index === toBeFilled.length) {
			return true;
		} else {
			let row = toBeFilled[index][0];
			let col = toBeFilled[index][1];
			for (let i = 1; i < 10; i++) {
				if (checkValid(row, col, i)) {
					matrix[row][col] = i;
					await sleep(10);
					tds[9 * row + col].textContent = matrix[row][col];
					tds[9 * row + col].style.color = '#27AE60';
					tds[9 * row + col].style.borderColor = 'black';

					// setTimeout(() => {
					// 	tds[9 * row + col].textContent = matrix[row][col];
					// }, count++ * 1000);
					if (await recursion(index + 1)) {
						return true;
					} else {
						await sleep(10);
						tds[9 * row + col].textContent = '';
						// setTimeout(() => {
						// 	tds[9 * row + col].textContent = '';
						// }, count++ * 1000);
						matrix[row][col] = 0;
					}
				}
			}
			return false;
		}
	}

	function checkValid(row, col, choice) {
		for (let j = 0; j < 9; j++) {
			if (matrix[row][j] === choice) {
				return false;
			}
			if (matrix[j][col] === choice) {
				return false;
			}
		}
		let gridRow = Math.floor(row / 3) * 3;
		let gridCol = Math.floor(col / 3) * 3;
		// console.log("gridRow,gridCol",gridRow,gridCol)

		for (let j = 0; j < 3; j++) {
			for (let k = 0; k < 3; k++) {
				if (matrix[gridRow + j][gridCol + k] === choice) {
					return false;
				}
			}
		}
		return true;
	}
}

function sleep(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

// Albert's function for sudoku
// function print_pos(grid_no){
// 	for( let i=0; i<3; i++ ){
// 			  for( let j=0; j<3; j++){
// 			  console.log(Math.floor(grid_no/3)*3 + i , (grid_no%3-1)*3 + j )
// 		}
// 	  }
//   }

//   print_pos(1)
//   print_pos(2)
