---
path: "/functions"
date: "2020-06-14"
title: "Function's anatomy"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Quick exploration of the Function concept in the context of functional programming."
thumbnail: "../../../images/thumb.png"
published: true
parent: "functional programming"
---

_This is the first post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

In the context of functional programming, functions are the fundamental building blocks, they allow to group instructions in order to calculate a result, it is also possible to provide them with input values (parameters) and use them to perform the resulting calculation.

Functions in JavaScript can be written in many different forms however, to our interest this is what we need to know (at least for now):

```js
function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
```

> This form of defining a function is called a function declaration.

Let's go through each part in above function declaration:

- The `function` keyword, determines our intention to define a function.
- The function name `add`, is the name we give to our function in order to refer to it.
- The function parameters `firstNumber` and `secondNumber`, are the input values.
- The function body is everything between `{` and `}`, this is where the instructions needed to calculate the resulting value would be. Variables defined within the function starting `{` and closing `}` are only accessible there, this area is known as the function scope.

A function can be executed/called as follows:

```js
add(40, 2); // 42
```

In JavaScript functions don't necessarily have to return a value however, **in the context of functional programming all functions must return a value.**

> A function that doesn't return a value is usually referred to as a procedure

By this point you might have some questions hopefully, all these questions will be answered as we move forward, there is no need to get overwhelmed now however, if you want to explore the function concept further I strongly suggest the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) which is a great resource.

Next up, ["Functions as values"](/functions-as-values).

> Programs are made out of functions, functions are programs. Functions are made out of functions.

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
