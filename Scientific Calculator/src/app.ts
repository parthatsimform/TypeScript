let memory: number = 0;
const process = document.getElementById("process")! as HTMLElement;
const output = document.getElementById("output")! as HTMLInputElement;
output.value = "0";
const btns = document.getElementsByTagName(
	"button"
) as HTMLCollectionOf<HTMLButtonElement>;
const mc = document.getElementById("mc")! as HTMLButtonElement;
const mr = document.getElementById("mr")! as HTMLButtonElement;

let error: string = "Invalid Input!";

interface NaNErr {
	res: number;
	err: string;
}

function checkNaN(chk: NaNErr) {
	if (isNaN(Number(chk.res))) {
		output.value = chk.err;
	} else {
		output.value = String(chk.res);
	}
}

function calcFactorial(): void {
	let ff = 1;
	output.value = eval(output.value);
	process.innerHTML = output.value + "!";
	if (isNaN(Number(output.value))) {
		output.value = "Syntax Error";
	} else {
		for (let i: number = 1; i <= Number(output.value); i++) {
			ff *= i;
		}
		output.value = String(ff);
	}
}

function evaluate(): void {
	try {
		process.innerHTML = output.value;
		if (
			output.value.includes("//") ||
			!output.value.charAt(output.value.indexOf("/") + 1)
		) {
			checkNaN({ res: Number(output.value), err: "Invalid use of '/'" });
		} else if (output.value.includes("%")) {
			let op1: number = Number(eval(output.value.split(" % ")[0]));
			let op2: number = Number(eval(output.value.split(" % ")[1]));
			checkNaN({ res: op1 % op2, err: error });
		} else if (output.value.includes("e**")) {
			const res = output.value.replace(/e/g, "2.718");
			checkNaN({
				res: Function("return " + res)(),
				err: error,
			});
		} else {
			process.innerHTML = output.value;
			output.value = String(parseFloat(eval(output.value).toFixed(6)));
		}
	} catch (e) {
		output.value = error;
	}
}

document.addEventListener("keydown", (e) => {
	if (!isNaN(Number(e.key))) {
		process.innerHTML = "";
		if (output.value === "0") {
			output.value = "";
		}
		output.value += e.key;
	} else {
		switch (e.key) {
			case "/":
			case "*":
			case "-":
			case "+":
			case "%":
			case "(":
			case ")":
				process.innerHTML = "";
				if (output.value === "0") {
					output.value = "";
				}
				output.value += e.key;
				break;

			case ".":
				if (output.value.indexOf(".") == -1) {
					output.value += ".";
				}
				break;

			case "!":
				calcFactorial();
				break;

			case "Backspace":
				output.value = output.value.substring(
					0,
					output.value.length - 1
				);
				process.innerHTML = "";
				break;

			case "=":
			case "Enter":
				evaluate();
				break;

			default:
				break;
		}
	}
});

Array.from(btns).forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const target = e.target as HTMLButtonElement;
		const parentElement = target.parentElement as HTMLButtonElement;
		switch (target.value || parentElement.value) {
			case "DEG":
				process.innerHTML = output.value + " RAD to DEG";
				checkNaN({
					res: (Number(output.value) * 180) / 3.14159265359,
					err: error,
				});
				target.value = "RAD";
				target.innerHTML = target.value;
				break;

			case "RAD":
				process.innerHTML = output.value + " DEG to RAD";
				checkNaN({
					res: (Number(output.value) * 3.14159265359) / 180,
					err: error,
				});
				target.value = "DEG";
				target.innerHTML = target.value;
				break;

			case "fe":
				output.value = parseFloat(output.value).toExponential();
				break;

			case "mc":
				memory = 0;
				mc.disabled = true;
				mr.disabled = true;
				break;

			case "mr":
				output.value = String(memory);
				break;

			case "m+":
				memory += parseFloat(output.value);
				break;

			case "m-":
				memory -= parseFloat(output.value);
				break;

			case "ms":
				memory = parseFloat(output.value);
				mc.disabled = false;
				mr.disabled = false;
				break;

			case "sin":
				process.innerHTML = "sin(" + output.value + ")";
				checkNaN({
					res: Math.sin(parseFloat(output.value)),
					err: error,
				});
				break;

			case "cos":
				process.innerHTML = "cos(" + output.value + ")";
				checkNaN({
					res: Math.cos(parseFloat(output.value)),
					err: error,
				});
				break;

			case "tan":
				process.innerHTML = "tan(" + output.value + ")";
				checkNaN({
					res: Math.tan(parseFloat(output.value)),
					err: error,
				});
				break;

			case "ceiling":
				process.innerHTML = "⌈" + output.value + "⌉";
				checkNaN({
					res: Math.ceil(Number(output.value)),
					err: error,
				});
				break;

			case "floor":
				process.innerHTML = "⌊" + output.value + "⌋";
				checkNaN({
					res: Math.floor(Number(output.value)),
					err: error,
				});
				break;

			case "random":
				process.innerHTML = "Random Number";
				output.value = String(Math.random());
				break;

			case "2raiseTo":
				if (output.value === "0") {
					output.value = "2**";
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += "2**";
				} else {
					output.value += "*2**";
				}
				break;

			case "3raiseTo":
				if (output.value === "0") {
					output.value = "3**";
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += "3**";
				} else {
					output.value += "*3**";
				}
				break;

			case "cubeRoot":
				process.innerHTML = "3√" + output.value;
				checkNaN({
					res: Math.cbrt(Function("return " + output.value)()),
					err: error,
				});
				break;

			case "cube":
				process.innerHTML = "(" + output.value + ")<sup>3</sup>";
				checkNaN({
					res: Math.pow(Number(eval(output.value)), 3),
					err: error,
				});
				break;

			case "clear":
				process.innerHTML = "";
				output.value = "0";
				break;

			case "delete":
				output.value = output.value
					.toString()
					.substring(0, output.value.length - 1);
				process.innerHTML = "";
				break;

			case "pi":
				if (output.value == "0") {
					output.value = String(3.14159265359);
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += 3.14159265359;
				} else {
					output.value += "*3.14159265359";
				}
				break;

			case "e":
				if (output.value == "0") {
					output.value = String(2.718);
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += 2.718;
				} else {
					output.value += "*2.718";
				}
				break;

			case "square":
				process.innerHTML = "(" + output.value + ")<sup>2</sup>";
				checkNaN({
					res: Math.pow(Number(eval(output.value)), 2),
					err: error,
				});
				break;

			case "oneUpon":
				process.innerHTML = "1/(" + output.value + ")";
				checkNaN({
					res: 1 / Number(eval(output.value)),
					err: error,
				});
				break;

			case "mod":
				process.innerHTML = "|" + output.value + "|";
				checkNaN({
					res: Math.abs(Number(eval(output.value))),
					err: error,
				});
				break;

			case "exp":
				if (output.value === "0") {
					output.value = "e**";
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += "e**";
				} else {
					output.value += "*e**";
				}
				break;

			case "modulo":
				output.value += " % ";
				break;

			case "squareRoot":
				process.innerHTML = "2√" + output.value;
				checkNaN({
					res: Math.sqrt(Function("return " + output.value)()),
					err: error,
				});
				break;

			case "factorial":
				calcFactorial();
				break;

			case "raiseTo":
				output.value += "**";
				break;

			case "tenRaiseTo":
				if (output.value === "0") {
					output.value = "10**";
				} else if (
					output.value.slice(-1) === "+" ||
					output.value.slice(-1) === "-" ||
					output.value.slice(-1) === "*" ||
					output.value.slice(-1) === "/"
				) {
					output.value += "10**";
				} else {
					output.value += "*10**";
				}
				break;

			case "loge":
				process.innerHTML = "log<sub>e</sub>(" + output.value + ")";
				checkNaN({
					res: Math.log(Number(eval(output.value))),
					err: error,
				});
				break;

			case "ln":
				process.innerHTML = "ln(" + output.value + ")";
				checkNaN({
					res: Math.log2(Number(eval(output.value))),
					err: error,
				});
				break;

			case "invert":
				output.value = String(-Number(output.value));
				break;

			case ".":
				if (output.value.indexOf(".") == -1) {
					output.value += ".";
				}
				break;

			case "trigonometry":
			case "function":
			case "2nd":
				break;

			case "=":
				evaluate();
				break;

			default:
				process.innerHTML = "";
				if (output.value === "0") {
					output.value = "";
				}
				output.value += target.value || parentElement.value;
				break;
		}
	});
});
