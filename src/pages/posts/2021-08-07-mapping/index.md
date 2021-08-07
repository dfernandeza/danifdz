---
path: "/mapping"
date: "2021-08-07"
title: "Mapping"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "If you have been following the \"Functional approach to functional programming\" series then you will be happy to know that this is where everything starts to make sense (or at least that is what I'm hopping)."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the sixth post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

If you have been following the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series then you will be happy to know that this is where everything starts to make sense (or at least that is what I'm hopping). When I first started learning functional programming I couldn't really understand how to connect all the different concepts and it was only after writing a lot of list manipulation algorithms that it finally clicked.

Mapping is the first one of the three well known techniques to manipulate lists that we will cover in the series: mapping, filtering, and reducing.

## What is mapping for?

Mapping is used to modify each element in a list.

> Mapping consists of changing all the elements of a list by applying a common function to them.

Let's illustrate this concept with some code examples. Imagine we have a list containing numbers and these numbers represent prices 💵 so we want to prefix each one with the `$` symbol. We could do something like this:


```js
const prices = [100, 48, 31, 42, 99];

const prefixedPrices = [];

for (const price of prices) {
    prefixedPrices.push("$" + price);
}

// prefixedPrices will contain ['$100', '$48', '$31', '$42', '$99']
```

As you can see we are iterating the list `prices` and generating a new list `prefixedPrices` that contains each price prefixed with the `$` symbol. Now let's apply some of the things we have learned to make this code a bit more "functional". I'll start by moving this to a function.

```js
function prefixPrices(prices) {
    const prefixedPrices = [];

    for (const price of prices) {
        prefixedPrices.push("$" + price);
    }

    return prefixedPrices;
}

// Now we an use the `prefixPrices` as
const prices = [100, 48, 31, 42, 99];
const prefixedPrices = prefixPrices(prices); // ['$100', '$48', '$31', '$42', '$99']
```

Now imagine we want to make a `$1` discount on each price, how should we implement this? 🤔 Well, we can do both things applying the discount and prefixing with the `$` symbol in the same iteration we just need to come up with a better name for our function. 
But then, our function will be doing too much stuff which is not a good thing 🚫 (as we will see in a coming post) and also, what if we need to do more things like convert the prices to euros 💶? Can you spot the pattern 🔍? 

Let me break this down, so far we know that we would like to manipulate the `prices` list to:

- Apply a discount
- Convert to a different currency
- Prefix with the currency symbol

Notice that each one of these points is some sort of transformation that we need to apply to each price in the prices list. 
On top of this we also know that the steps we need to follow to apply any of these transformations are:   

- Iterate the list
- Apply transformation to each item in the list
- **Return a new list** containing all the transformed items

> This last point is extremely important and we will talk about this in a different post, for now just keep in mind that as a rule of thumb we should never modify the original list because we might need it in other parts of the code for example, to generate a different list.

This seems like a perfect scenario to use one of the concepts we have learned, let's use a [higher-order function](/functions-as-values). 

*You might be wondering, how did we come to the conclusion that we need a higher-order function? Don't panic, remember we are still in the process of building up all the required mental models, you will eventually get there.*

First, I'll create a function `map` that will receive the list and a "transformation" function as parameters.

```js{5}
function map(list, transformationFunction) {
    const result = [];

    for (const item of list) {
        const transformedItem = transformationFunction(item);
        result.push(transformedItem);
    }

    return result;
}
```

As you can see the `map` function is pretty similar to our previous `prefixPrices` function but instead of applying the transformation in the spot (prefixing the price with `$`) it receives an additional parameter `transformationFunction` that will be the function we will apply to each item in the list to perform the transformation. This allows us to do the following:

```js
function prefixWithDollarSymbol(price) {
    return "$" + price;
}

function prefixWithEuroSymbol(price) {
    return "€" + price;
}

function applyDiscount(price) {
    return price - 1;
}

function convertToEuro(price) {
    return price * 0.85;
}

const prices = [100, 48, 31, 42, 99];

const pricesWithDiscount = map(prices, applyDiscount);
const pricesWithDollarSymbol = map(pricesWithDiscount, prefixWithDollarSymbol);

const pricesEuro = map(pricesWithDiscount, convertToEuro);
const pricesWithEuroSymbol = map(pricesEuro, prefixWithEuroSymbol);

// pricesWithDollarSymbol ['$99', '$47', '$30', '$41', '$98']
// pricesWithEuroSymbol ['€84.14', '€39.94', '€25.5', '€34.85', '€83.3']

```

We can still go a little further and apply another concept; [partial application](/specialized-functions) would help us reduce some duplication.

```js{1-5, 7-11, 13-17, 19-22}
function prefixWithSymbol(symbol) {
    return function(price) { 
        return symbol + price;
    }
}

function applyDiscountOf(discount) {
    return function(price) {
        return price - discount;
    }
}

function convertTo(rate) {
    return function(price) {
        return price * rate;
    }
}

const prefixWithDollarSymbol = prefixWithSymbol("$");
const prefixWithEuroSymbol = prefixWithSymbol("€");
const applyDiscount = applyDiscountOf(1);
const convertToEuro = convertTo(0.85);

const prices = [100, 48, 31, 42, 99];

const pricesWithDiscount = map(prices, applyDiscount);
const pricesWithDollarSymbol = map(pricesWithDiscount, prefixWithDollarSymbol);
const pricesEuro = map(pricesWithDiscount, convertToEuro);
const pricesWithEuroSymbol = map(pricesEuro, prefixWithEuroSymbol);

// pricesWithDollarSymbol ['$99', '$47', '$30', '$41', '$98']
// pricesWithEuroSymbol ['€84.14', '€39.94', '€25.5', '€34.85', '€83.3']
```

Let's break this down, 

- We created 3 functions `prefixWithSymbol`, `applyDiscountOf`, and `convertTo`. These functions will allow us to create more specialized functions (a.k.a. curried functions) by using partial application. For instance, we could create a `prefixWithYenSymbol` function to prefix prices with `¥` or a `convertToPounds` function. 
- We created 4 curried functions `prefixWithDollarSymbol`, `prefixWithEuroSymbol`, `applyDiscount`, and `convertToEuro`. Notice that each one of these functions receives a single (`price`) parameter, this is important because it will allows us to use them with our `map` function. 
- We used the curried functions with our `map` function to generate our dollar and euro price lists.

The resulting code is a lot more flexible, we could generate price lists for any other currency without writing a lot of code 🥳.


One last thing before wrapping up, remember I said mapping is a well known technique? Well, it is so popular that many languages offer native implementations of the map function out of the box, [JavaScript being one of them](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). You can use map in JavaScript as follows:

```js
function prefixWithDollarSymbol(price) {
    return "$" + price;
}

const prices = [100, 48, 31, 42, 99];

const pricesWithDollarSymbol = prices.map(prefixWithDollarSymbol);

// pricesWithDollarSymbol ['$100', '$48', '$31', '$42', '$99']
```

That's a wrap, we made it! 😅 It has been a long ride until here but I hope you are as exited as I am to start putting all the pieces together. Please don't feel bad if you don't get it just yet, it takes time, you might need to go back and read the previous posts a second or third time and that's totally ok.

Next up, "Filtering".

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
