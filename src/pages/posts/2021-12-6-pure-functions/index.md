---
path: "/pure-functions"
date: "2021-12-06"
title: "Pure functions"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Probably the most popular and more discussed concept in the functional programing world."
thumbnail: "../../../images/thumb.png"
published: true
parent: "functional programming"
---

_This is the ninth post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

The concept we will cover on this post is probably the most popular and more discussed concept in the functional programing world. There is a good reason for this, we could say that pure functions form the foundation of functional programming. All the benefits of the functional programming paradigm are directly correlated to this concept; readability, testability, composability, reusability, just to mention a few.

> You may be wondering, why are we covering such an important concept this far into the series? The answer to this question is, because we needed to cover all the previous concepts first in order to make it easier to understand why function purity is important.

Having said that lets jump into a more proper definition. A pure function is a function that has the following properties:

- Provided with the same parameters it will always return the same output
- It causes no side effects

## Same input, same output

Let's illustrate this with an example of a function that given the same input **won't necessarily return the same output**. Consider the following _impure function_:

```js{11-13}
const onSale = true;
const discount = 0.10; // 10%

// tens of lines of code ...

function getTotal(products) {
  const total =  products.reduce(function(accumulator, product) {
    return accumulator + product.price;
  }, 0);

  if (onSale) {
    return (total - (total * discount));
  }

  return total;
}

const total = getTotal([
  { name: "coffee", price: 4 },
  { name: "carrot cake", price: 6 },
  { name: "cupcake", price: 5 }
]);

// total = 13.5
```

> If you need a refresher on the use of `reduce` you can go back to my previous post about [reducing](/reducing).

The reason why `getTotal` is not pure is because **given the same list of products it won't always return the same total**. In the highlighted lines you can see that we are making use of 2 external variables `onSale` and `discount` and depending on these variables we could have different results.

This is important because reasoning about a function that given the same input will always return the same output is a lot easier for instance, imagine that `onSale` and `discount` are not defined in the same file where our function `getTotal` is defined. We wouldn't be able to tell what the result of calling the function is just by looking at the function call, because we would also need to know the values of `onSale` and `discount`.
Another disadvantage of this code is related to reusability. Imagine we want to reuse `getTotal` in a different part of our application. It wouldn't be as easy as just calling the function in that other place, we would need to make sure that `onSale` and `discount` can also be accessed there which is not great 👎.

Now, how can we make `getTotal` pure? The easiest way would be to pass `onSale` and `discount` as parameters, it would look something like this:

```js{1,19,20}
function getTotal(products, onSale, discount) {
  const total = products.reduce(function (accumulator, product) {
    return accumulator + product.price;
  }, 0);

  if (onSale) {
    return total - total * discount;
  }

  return total;
}

const total = getTotal(
  [
    { name: "coffee", price: 4 },
    { name: "carrot cake", price: 6 },
    { name: "cupcake", price: 5 }
  ],
  true, // onSale
  0.10 // 10% discount
);

// total = 13.5
```

Calling `getTotal` with the same input will now always return the same output. We would now be able to reuse our function in any other place without thinking on any external factors and we can also read our code more easily.

## No side effects

> "A pure function produces no side effects, which means that it can’t alter any external state."
>
> -- Eric Elliott. "Composing Software: An Exploration of Functional Programming and Object Composition in JavaScript."

A pure function can't have any side effects, this means it can't alter or rely on anything out of its own scope. Reading or writing from a variable defined outside its own scope, a database, a file, or even the console can be described as side effects.

⚠️ Disclaimer, in the specific case of JavaScript applications we will always need to alter some sort of external state. For instance, we need to write/read from a database if we want to create/authenticate users, and we may also want to log our errors to some kind of monitoring system. From my own experience I can say that you can get a lot of the functional programming paradigm benefits even if your codebase is not 100% "functional". The secret is to know where and when side effects should be used, and this is exactly what functional programming can help you with.

> "Purity is about confidence. But we have to admit that in many cases, any confidence we feel is actually relative to the context of our program and what we know about it. In practice (in JavaScript) the question of function purity is not about being absolutely pure or not, but about a range of confidence in its purity.
> The more pure, the better."
>
> -- Kyle Simpson. "Functional Light JS."

I'll make a small change to our `getTotal` function to illustrate a potential problem when not properly managing side effects.

```js{1, 8-10}
let discount = 0.1; // 10%

function getTotal(products, onSale, hasCoupon) {
  const total = products.reduce(function (accumulator, product) {
    return accumulator + product.price;
  }, 0);

  if (hasCoupon) {
    discount = 0.15; // 15%
  }

  if (onSale) {
    return total - total * discount;
  }

  return total;
}

const total1 = getTotal(
  [
    { name: "coffee", price: 4 },
    { name: "carrot cake", price: 6 },
    { name: "cupcake", price: 5 }
  ],
  true, // onSale
  true // hasCoupon
);

// total1 = 12.75 ✅

// a second purchase is made without using a coupon
const total2 = getTotal(
  [
    { name: "tea", price: 4 },
    { name: "carrot cake", price: 6 }
  ],
  true, // onSale
  false // hasCoupon
);

// total2 = 8.5  ERROR 💥 (this should actually be 9)

```

The highlighted lines in the above example contain the changes that cause the side effect to happen and therefore, transformed our `getTotal` function into an impure function.

- The `discount` setting is now in a global state.
- `getTotal` sets `discount` to a different value depending on whether or not there is a discount coupon. (This is the unwanted side effect)

Notice how the side effect `getTotal` has on the `discount` setting is causing an error in our application. The first call to `getTotal` is provided with `hasCoupon` set to **true** causing the `discount` setting to be overridden with 15%. The problem comes with the second call to `getTotal` which is provided with `hasCoupon` set to **false** meaning that the discount to be applied should be 10% however, as the previous call set the discount to 15% we are getting an erroneous result.

This might seem like a pretty obvious bug 🐛 but I hope it illustrates how poorly managed side effects could affect our application code. Let's wrap this up by fixing the bug in our code.

```js{1-7,28,40}
function getDiscount(hasCoupon) {
  if (hasCoupon) {
    return 0.15; // 15%
  }

  return 0.10; // 10%
}

function getTotal(products, onSale, discount) {
  const total = products.reduce(function (accumulator, product) {
    return accumulator + product.price;
  }, 0);

  if (onSale) {
    return total - total * discount;
  }

  return total;
}

const total1 = getTotal(
  [
    { name: "coffee", price: 4 },
    { name: "carrot cake", price: 6 },
    { name: "cupcake", price: 5 }
  ],
  true, // onSale
  getDiscount(true) // discount
);

// total1 = 12.75 ✅

// a second purchase is made without using a coupon
const total2 = getTotal(
  [
    { name: "tea", price: 4 },
    { name: "carrot cake", price: 6 }
  ],
  true, // onSale
  getDiscount(false) // discount
);

// total2 = 9 ✅
```

In our example we were able to remove the side effect entirely however, this won't be alway the case, you’ll run across impure functions containing side effects that can't just be removed (e.g. database operations, API calls, and others). There are well known techniques to work around this type of impurity, although I won't cover those in this post I encourage you to keep reading about it, I'd recommend the book ["Functional Light JS"](https://github.com/getify/Functional-Light-JS) by Kyle Simpson and more specifically the chapter 5 "Reducing Side Effects" (a couple Google searches could also get you pretty far).

Next up, "A word about immutability".

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
