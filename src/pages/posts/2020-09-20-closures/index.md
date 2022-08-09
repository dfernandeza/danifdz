---
path: "/closures"
date: "2021-02-27"
title: "Closures"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Understanding closures will help us understand how other concepts (currying, higher-order functions) are related to each other and will also help our brain creating the necessary connections for these concepts to take hold."
thumbnail: "../../../images/thumb.png"
published: true
parent: "functional programming"
---

_This is the fifth post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

We have covered quite a few concepts so far. We have also learned how these concepts are related to each other for example, in the [previous post](/specialized-functions) we saw how a curried function is also a [higher-order function](/functions-as-values). It's very important to understand these connections as this is what will allow us to create our own mental models.

In this post we will explore one of these connecting concepts, **closures**. Understanding **closures** will help us understand how a curried function works under the hood and will also help our brain creating the necessary connections for the concepts to take hold.

Let's take the following example:

```js
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

// n1 is assigned with the value 2
const add2 = add(2);

// n2 is assigned with the value 40
add2(40); // 42
```

What happens when we execute the function `add(2)`? Let's go through each step:

1. Assigns the value `2` to `n1`.
2. Returns a new function `addN` which receives a single parameter `n2`. (In the above example we are assigning this resulting function to the variable `add2`).

At this point we have something similar to the following code:

```js
const add2 = function addN(n2) {
  return n1 + n2; // n1 contains the value 2
};
```

Now, what happens when we execute `add2(40)`?

1. Assigns the value `40` to `n2`.
2. Performs `n1 + n2` where `n1` contains the value `2` and (as mentioned in the previous step) `n2` contains the value `40`.
3. Returns the resulting number which is `42`.

Did you notice how `add2` remembered the value stored in `n1`? This distinctive aspect of the `add2` function makes it a closure function, it encloses the variable `n1` from its parent function scope.

> A closure is a function that has access to its outer function scope even after the outer function has returned.

You might want to go deeper and learn about how JavaScript handles closures (and function execution in general) under the hood, I won't go there in this post because I'm trying very hard to keep things simple however, if you want to go further I'd recommend you to read about **JavaScript's execution context and lexical scope**.

Thanks for reading. 😃

Next up, ["Mapping"](/mapping).

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
