function serializePhone(string) {
	let DDD = string.slice(0, 2);
	let first = string.slice(2, 3);
	let second = string.slice(3, 7);
	let third = string.slice(7);

	let result = "";

	if (DDD) result += "(" + DDD;
	if (first) result += ") " + first;
	if (second) result += "." + second;
	if (third) result += "-" + third;

	return result;
}

function deserializePhone(string) {
	return string.replace(/\D/g, "");
}

document.getElementById("confirm").addEventListener("input", function (e) {
	let pass = document.getElementById("pass").value;

	this.setCustomValidity(
		pass != this.value ? "Passwords must be matching" : ""
	);
});

document.getElementById("phone").addEventListener("input", function (e) {
	let pos = this.selectionStart;
	let previousLength = this.value.length;

	this.value = serializePhone(deserializePhone(this.value));

	let difference = this.value.length - previousLength;

	if (e.inputType === "deleteContentBackward" && difference === 1) pos--;

	pos += difference;
	this.setSelectionRange(pos, pos);
});

document.getElementById("pass").addEventListener("input", function (e) {
	let value = this.value;
	const rules = {
		uper: /\p{Lu}/u,
		lower: /\p{Ll}/u,
		number: /\p{N}/u,
		symbol: /[!@#$%^&*_]/,
		eight: /.{8,}/,
	};

	for (let key in rules) {
		document.getElementById(key).checked = rules[key].test(value);
	}
});
