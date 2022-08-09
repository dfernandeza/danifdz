---
path: "/reducing"
date: "2021-09-24"
title: "Reducing"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Reducing the values of a list down to a single value."
thumbnail: "../../../images/thumb.png"
published: true
parent: "functional programming"
---

_This is the eighth post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

After covering [mapping](/mapping) and [filtering](/filtering) it is time to tackle "reducing", which is in my humble opinion the most powerful of them all. Proof of this, it is that "map" and "filter" functions can be implemented by using "reduce"; but let's not get into this yet, let's start from the beginning.

## What is reduce for?

Reduce (or fold) is in fact used to "reduce" the values of a list down to a single value.

> Reducing consists of applying a function against an accumulator and each element in the list to reduce it to a single value.

You can think of "reducing" as performing a sum operation, for instance:

```
2 + 3 = 5
```

In above example we reduced/folded 2 and 3 into the value 5. Let's translate this into code:

```js
const numbers = [2, 3];

let accumulator = 0;
for (const number of numbers) {
  accumulator = accumulator + number;
}

// accumulator = 5
```

The operation we use to "reduce" the values of a list has a direct relationship to the data type of each item in the list; for instance, numbers can be "reduced" using arithmetic operations, strings using concatenation, booleans using logical operations, and so on.

```js
const strings = ["hello", " world"];

let accumulator = "";
for (const string of strings) {
  accumulator = accumulator + string;
}

// accumulator = "hello world"

const booleans = [true, false];

let accumulator = true;
for (const boolean of booleans) {
  accumulator = accumulator && boolean;
}

// accumulator = false
```

By looking at these examples we can identify some patterns:

- We always need an accumulator to store the resulting value.
- We always loop through the list and perform an operation to the accumulator and the list item.

Let's extract this into a `reduce` function:

```js
function reduce(list, reducer, initialValue) {
  let accumulator = initialValue;

  for (const item of list) {
    accumulator = reducer(accumulator, item);
  }

  return accumulator;
}
```

Our `reduce` function receives 3 parameters, the list we want to reduce, the reducer [callback](/functions-as-values) function and the initial value for our accumulator. The reducer callback is a binary function that receives the current accumulated value, and the current item from the list as parameters. Let's put our `reduce` function to the test.

```js
const shoppingCart = [
  { name: "coffee", price: 4 },
  { name: "carrot cake", price: 6 },
  { name: "cupcake", price: 5 }
];

function shoppingCartPriceReducer(accumulator, product) {
  return accumulator + product.price;
}

const total = reduce(shoppingCart, shoppingCartPriceReducer, 0);

// total = 15
```

This is a small example but we can already see the potential of the `reducer` function.

Let's explore one more example, imagine we were asked to generate an invoice from the shopping cart data perhaps, we could reduce the `shoppingCart` list to a string containing all the details. Let's use JavaScript's native implementation of the [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) function for this example.

```js
const shoppingCart = [
  { name: "coffee", price: 4 },
  { name: "carrot cake", price: 6 },
  { name: "cupcake", price: 5 }
];

function shoppingCartPriceReducer(accumulator, product) {
  return accumulator + product.price;
}

function shoppingCartDetailReducer(accumulator, product) {
  const row = product.name + " - " + "$" + product.price + "\n";
  return accumulator + row;
}

const total = shoppingCart.reduce(shoppingCartPriceReducer, 0);
let invoice = shoppingCart.reduce(shoppingCartDetailReducer, "");

invoice = invoice + "\n" + "TOTAL - " + "$" + total;

// coffee - $4
// carrot cake - $6
// cupcake - $5
//
// TOTAL - $15
```

There are many other ways in which we could have implemented this. In fact, I'd like to encourage you to come up with your own implementation. What about mixing `map` and `reduce` 🤔?

Next up, ["Pure functions"](/pure-functions).

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
