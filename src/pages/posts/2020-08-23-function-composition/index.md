---
path: "/function-composition-first-steps"
date: "2020-09-05"
title: "Function composition, first steps"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "The art of combining functions together."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the third post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

Before we start... If you surf the internet 🏄 looking for the definition of function composition you will most likely end up reading about mathematics which makes a lot of sense since functional programming is based on math principles however, I purposely decided to stay away from the mathematical explanation so that we keep it as simple as possible.

A simpler definition for function composition would be something around these lines:

> Mixing two or more functions together to produce a new function.
> Applying one function to the results of another.

There are some rules we need to follow to be able to properly implement and take full advantage of function composition. If we were to compose functions `A` and `B` (i.e. `A(B(1))`), we would need to make sure that:

- **A and B accept only one parameter,** in other words the functions should have an arity of one (The arity of a function is the number of arguments that the function takes).
- **A and B return a value** in relation to their inputs/parameters (as mentioned in a [previous post](/functions) in this series).
- **The input of A matches the output of B,** `A` will take the output from `B` as argument, meaning that if `B` returns a number then `A` should be able to receive a number as argument.

Let's jump right into an example.

```js
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
 * Performs (n * 2) + 2
 * @param {number} n
 * @returns {number}
 */
function times2add2(n) {
  return add2(times2(n));
}

times2add2(2); // 6
```

In the example we are composing 2 functions `add2` and `times2`, let's see if we are aligned with the rules mentioned above.

- Both functions `add2` and `times2` have an arity of 1. ✅
- Both functions `add2` and `times2` return a value. ✅
- `times2` returns a number and `add2` accepts a number as argument. ✅

Something important to notice about the last point is that both functions accept a number as argument and both functions return a number, this allows to compose them in both directions. For example we could write an `add2times2` function.

```js
/**
 * Performs (n + 2) * 2
 * @param {number} n
 * @returns {number}
 */
function add2times2(n) {
  return times2(add2(n));
}

add2times2(2); // 8
```

> Execution goes from right to left. i.e. A(B(1)) here B is executed first and whatever B outputs will be passed on to A.

We can now compose these resulting functions (`times2add2` and `add2times2`) with other functions to build more complex ones and continue doing this until we implement an entire program. This is actually the idea behind function composition, **to combine small and reusable pieces to build programs**.

This is great but... it seems very cumbersome and limiting to enforce an arity of one for all these functions, imagine we now want to implement an `add1times2` function.

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
 * Performs (n + 1) * 2
 * @param {number} n
 * @returns {number}
 */
function add1times2(n) {
  return times2(add1(n));
}

add1times2(1); // 4
```

As you can see we had to implement the `add1` function which is very similar to `add2`, we are repeating ourselves too much, it doesn't feel right. The good news is that there are a couple techniques we can use to work around this limitation and I will dedicate the next post to them.

So, get your favorite drink and spend some minutes internalizing what you just read, we will cover these concepts in the next post.

Next up, "Specialized functions".

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
