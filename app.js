class analysisNumbersFromFile {
	constructor (arr) {
		this.arr = arr		
		this.quantity = this.step = this.median = this.average = 
		this.number = this.min = this.max =
		this.growSequenceArr = this.growSequenceBufferArr = 
		this.descendSequenceArr = this.descendSequenceBufferArr = 0
	}

	calculationAnalytics() {
		this.initializationVariablesNumbers()

		while(this.step < this.arr.length) {
			this.number = +this.arr[this.step]

			if( !this.isCheckForNumber(this.number) ) {
				this.step++
				continue
			}

			this.number < this.min ? this.min = this.number : 0;
			this.number > this.max ? this.max = this.number : 0;
			this.checkGrowSequence(this.number)
			this.checkDescendSequence(this.number)

			this.average = +this.average + +this.number
			this.step++
			this.quantity++
		}

		this.findMedian()
		this.average = this.average / this.quantity
	}

	isCheckForNumber(value) {
		return Number.isInteger(+value)
	}

	initializationVariablesNumbers() {
		for(let i=0;;i++) {
			if( this.isCheckForNumber(+this.arr[i]) ) {
				this.number = this.min = this.max = +this.arr[i]
				this.growSequenceArr = this.growSequenceBufferArr = 
				this.descendSequenceArr = this.descendSequenceBufferArr = [this.number]
				break
			}
		}
	}

	findMedian() {
		this.step = 1
		let medianPositionNum = this.quantity / 2

		for(let i=0;i < this.arr.length;i++) {
			if( !Number.isInteger(+this.arr[i]) ) {
				continue
			}

			if( this.step == Math.ceil(medianPositionNum) && this.quantity % 2 == 1) {
				this.median = this.arr[i]
				break
			}

			if( this.step == Math.ceil(medianPositionNum) || (this.step-1) == Math.ceil(medianPositionNum) ) {
				if(this.step == Math.ceil(medianPositionNum)) {
					this.median = this.arr[i]
				} else {
					this.median = (+this.median + +this.arr[i]) / 2
					break
				}
			}		

			this.step++
		}
	}

	printStatistics() {
		console.log("Min:", this.min)
		console.log("Max:", this.max)
		console.log("Average:", this.average)
		console.log("Median:", this.median)
		console.log("Growing sequence:", this.growSequenceArr)
		console.log("Decreasing sequence:", this.descendSequenceArr)
	}

	checkGrowSequence(number) {
		if(this.growSequenceBufferArr[this.growSequenceBufferArr.length-1] < number) {
			this.growSequenceBufferArr.push(number)
		} else {
			this.growSequenceBufferArr = [number]
		}

		if(this.growSequenceBufferArr.length > this.growSequenceArr.length) {
			this.growSequenceArr = this.growSequenceBufferArr.slice()
		}
	}

	checkDescendSequence(number) {
		if(this.descendSequenceBufferArr[this.descendSequenceBufferArr.length-1] > number) {
			this.descendSequenceBufferArr.push(number)
		} else {
			this.descendSequenceBufferArr = [number]
		}

		if(this.descendSequenceBufferArr.length > this.descendSequenceArr.length) {
			this.descendSequenceArr = this.descendSequenceBufferArr.slice()
		}
	}
}


function main() {
	const fs = require("fs")

	if(process.argv[2] === undefined) {
		console.log('Enter path to file with numbers')
		return 0
	}

	if(!fs.existsSync(process.argv[2])) {
		console.log('The file you specified was not found')
		return 0
	}

	arr = fs.readFileSync(process.argv[2], "utf8").toString().split("\n")
	const startTime = new Date().getTime()
	
	analysisNumbersClass = new analysisNumbersFromFile(arr)
	analysisNumbersClass.calculationAnalytics()
	analysisNumbersClass.printStatistics()
	
	const endTime = new Date().getTime()
	console.log(`Script execution time: ${(endTime - startTime)/1000} second(-s)`)
}


main()