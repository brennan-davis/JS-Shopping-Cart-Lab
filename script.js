// Classes
class Product {
	constructor(name, cost) {
		(this.Name = name), (this.Cost = cost);
	}
}

// Arrays
let products = [
	(malkin = new Product("Signed Evgeni Malkin Jersey", 149.99)),
	(crosby = new Product("Signed Sidney Crosby Jersey", 149.99)),
	(jarry = new Product("Signed Tristan Jarry Jersey", 149.99)),
	(guentzel = new Product("Signed Jake Guentzel Jersey", 149.99)),
	(lemieuxWhite = new Product("Signed Mario Lemieux White Jersey", 349.99)),
	(jágr = new Product("Signed Jaromír Jágr Jersey", 349.99)),
	(fleury = new Product("Signed Marc Andre Fleury Jersey", 279.99)),
	(barrasso = new Product("Signed Tom Barrasso Jersey", 349.99)),
	(lemieuxBlack = new Product("Signed Mario Lemieux Black Jersey", 349.99)),
	(dupuis = new Product("Signed Pascal Dupuis Jersey", 179.99)),
];
let cart = [];

// Variables
const cItems = document.querySelector("#cart-items");
const cTotal = document.querySelector("#cart-total");
const cTaxes = document.querySelector("#cart-taxes");
const cFinalTotal = document.querySelector("#cart-final-total");
const inputs = document.querySelectorAll(".item-count");
const decreaseBtns = document.querySelectorAll(".decreaseBtn");
const increaseBtns = document.querySelectorAll(".increaseBtn");

// Event Listeners
inputs.forEach((input) => {
	input.addEventListener("input", function () {
		AddToCart();
	});
});
decreaseBtns.forEach((btn) => {
	btn.addEventListener("click", function () {
		decreaseInput(btn);
	});
});
increaseBtns.forEach((btn) => {
	btn.addEventListener("click", function () {
		increaseInput(btn);
	});
});

// Functions
function AddToCart() {
	cart = [];
	inputs.forEach((input) => {
		if (parseInt(input.value) > 0) {
			let id = input.getAttribute("name");
			let quantity = parseInt(input.value);
			cart.push([products[id], quantity]);
			CalculateCart();
		}
	});
	if (cart.length === 0) {
		cItems.innerHTML = "";
		cTotal.innerHTML = currency(0);
		cTaxes.innerHTML = currency(0);
		cFinalTotal.innerHTML = currency(0);
	}
}

function CalculateCart() {
	let total = 0;
	let taxes;
	let final;
	AddCartItems();
	cart.forEach((item) => {
		total += item[0].Cost * item[1];
	});
	taxes = total * 0.0975;
	final = total + taxes;
	cTotal.innerHTML = currency(total);
	cTaxes.innerHTML = currency(taxes);
	cFinalTotal.innerHTML = currency(final);
}

function AddCartItems() {
	cItems.innerHTML = "";
	cart.forEach((item) => {
		let cartItem = document.createElement("div");
		cartItem.classList.add("cItem");
		cartItem.innerHTML = `<div class="cItemName">${item[1]}x ${
			item[0].Name
		}</div><div class="cItemPrice">   Price: ${currency(
			item[0].Cost * item[1]
		)}</div>`;
		cItems.appendChild(cartItem);
	});
	console.table(cart);
}

function decreaseInput(element) {
	let input = element.parentElement.querySelector("input");
	input.value = parseInt(input.value) - 1;
	AddToCart();
}

function increaseInput(element) {
	let input = element.parentElement.querySelector("input");
	input.value = parseInt(input.value) + 1;
	AddToCart();
}

// Utility
function $Id(classId) {
	return document.querySelector(classId);
}

function currency(number) {
	return number.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
}
