---
path: "/specialized-functions"
date: "2020-09-16"
title: "Specialized functions"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "From generalized functions to specialized functions, using partial application and currying."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the fourth post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

In the previous post we covered the core of functional programming, [function composition](/function-composition-first-steps). We also went through some rules we need to follow to make sure our functions are composable, one of these rules is: functions should have an arity of one (these functions are also called unary functions). However, writing only unary functions in our programs could be very cumbersome and it will most likely lead to code duplication. 

Let's see an example.

```js
/**
 * Performs n + 1
 * @param {number} n
 * @returns {number}
 */
function add1(n) {
  return n + 1;
}

/**
 * Performs n + 2
 * @param {number} n
 * @returns {number}
 */
function add2(n) {
  return n + 2;
}

/**
 * Performs n * 2
 * @param {number} n
 * @returns {number}
 */
function times2(n) {
  return n * 2;
}

/**
 * Performs (n + 1) * 2
 * @param {number} n
 * @returns {number}
 */
function times2add1(n) {
  return add1(times2(n));
}

/**
 * Performs (n + 2) * 2
 * @param {number} n
 * @returns {number}
 */
function times2add2(n) {
  return add2(times2(n));
}

times2add1(1); // 3
times2add2(2); // 6
```

As you can see we wrote quite a bit of code to implement `times2add1` and `times2add2` and the reason for this is that we are running into some code duplication. For example, `add1` and `add2` look very similar they both add two numbers and return the resulting calculation although, 🤔 they are "specialized" to add a specific number `1` and `2` respectively. 

Wouldn't be cool to use a "generalized" function instead? Something like:

```js
/**
 * Performs n1 + n2
 * @param {number} n1
 * @param {number} n2
 * @returns {number}
 */
function add(n1, n2) {
  return n1 + n2;
}
```

As you may have already noticed we would be breaking our arity rule as `add` would have an arity of two meaning that we wouldn't be able to use function composition. 

Now that we identified the problem allow me to introduce a couple concepts that will help us work around this limitation.

## Partial application and currying

The partial application technique allows pre-setting some of the arguments of the function. We can use partial application to transform functions of higher arity into functions that take less arguments. 

We can use partial application to create a curried version of a function. A curried function is a function that takes its arguments one at a time, for example given a function that takes three arguments `add(1, 2, 3)` its curried version would be execute like `add(1)(2)(3)`.

Both techniques partial application and currying allow to "specialize" a function which is extremely handy when using function composition and functional programming in general.

Let's see how we can use these techniques to create `add1` and `add2`.  

```js{1-11, 13-14}
/**
 * Returns a new function which will perform n1 + n2 
 * (n2 being the parameter of the returned function).
 * @param {number} n1 
 * @returns {function}
 */
function add(n1) {
  return function addN(n2) {
    return n1 + n2;
  };
}

const add1 = add(1);
const add2 = add(2);

/**
 * Performs n * 2
 * @param {number} n
 * @returns {number}
 */
function times2(n) {
  return n * 2;
}

/**
 * Performs (n + 1) * 2
 * @param {number} n
 * @returns {number}
 */
function times2add1(n) {
  return add1(times2(n));
}

/**
 * Performs (n + 2) * 2
 * @param {number} n
 * @returns {number}
 */
function times2add2(n) {
  return add2(times2(n));
}

times2add1(1); // 3
times2add2(2); // 6
```

The highlighted lines in above code snippet contain our new implementation of `add1` and `add2`. Notice that:

- `add` is now a [higher-order function](/functions-as-values) that takes the first argument and returns another function `addN` that expects the second argument.
- We partially applied (or executed) `add` to create `add1` and `add2`.
- We went from a binary function (a function that takes two arguments) to multiple unary functions.
- We could now very easily create a function `add3`, `add4`, and so forth.

This is great but you might be wondering what is the deal with the implementation of our `add` function? This is indeed a great question and we will go into more detail in the next post. 

>⚠️ spoiler alert ⚠️ to properly understand what is happening in this function we must first understand **closures**.

Next up, ["Closures"](/closures).

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
