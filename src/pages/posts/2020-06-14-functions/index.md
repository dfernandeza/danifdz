---
path: "/functions"
date: "2020-06-14"
title: "Function's anatomy"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Quick exploration of the Function concept in the context of functional programming."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the 1st post of the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

In the context of functional programming, functions are the fundamental building blocks, they allow to group instructions in order to calculate a result, it is also possible to provide them with input values (parameters) and used them to perform the result calculation.

Functions in JavaScript can be written in a couple different ways however, to our interest this is what we need to know (at least for now):

```js
function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
```

Let's go through each part in above function definition:

- The `function` keyword, determines our intention to define a function.
- The function name `add`, is the name we give to our function in order to refer to it.
- The function parameters `firstNumber` and `secondNumber`, are the input values.
- The function body is everything between `{` and `}`, this is where the instructions needed to calculate the resulting value would be.

A function can be executed/called as follows:

```js
add(40, 2); // 42
```

By this point you might have some questions:

- Does every function needs a name?
- Are parameters always required?
- Is it a hard requirement to always return a value?

All these questions will be answered as we move forward, there is no need to get overwhelmed now however, if you want to explore the function concept further I strongly suggest the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) which is a great resource.

Next up, "Functions as values".

> Programs are made out of functions, functions are programs. Functions are made out of functions.

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
