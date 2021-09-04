import React from "react";

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: 0,
			num1: "",
			num2: "",
		};
	}

	handleFirstNum = (e) => {
		this.setState({
			num1: parseInt(e.target.value, 10),
		});
	};

	handleSecondNum = (e) => {
		this.setState({
			num2: parseInt(e.target.value, 10),
		});
	};

	add = (e) => {
		this.setState({
			result: this.state.num1 + this.state.num2
		})
	}

	subtract = (e) => {
		this.setState({
			result: this.state.num1 - this.state.num2
		})
	}

	multiply = (e) => {
		this.setState({
			result: this.state.num1 * this.state.num2
		})
	}

  divide = (e) => {
		this.setState({
			result: this.state.num1 / this.state.num2
		})
	}

	clearInput = () => {
		this.setState({
			result: 0,
			num1: '',
			num2: '',
		})
	}



	render() {
		let {result, num1, num2} = this.state
		return (
			<div>
				<h1>Result: {result}</h1>
				<input
					onChange={this.handleFirstNum}
					placeholder="First number"
					value={num1}
				/>
				<input
					onChange={this.handleSecondNum}
					placeholder="Second number"
					value={num2}
				/>
				<button onClick={this.add}>+</button>
				<button onClick={this.subtract}>-</button>
				<button onClick={this.multiply}>*</button>
				<button onClick={this.divide}>/</button>
				<button onClick={this.clearInput}>clear</button>
			</div>
		);
	}
}

export default Calculator;
