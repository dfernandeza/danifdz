---
path: "/functions-as-values"
date: "2020-07-11"
title: "Functions as values"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "In JavaScript a function is just a value and this feature is exactly what makes the language suitable to write functional code, let's expand on this."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the second post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

In JavaScript **a function is just a value** and this feature is exactly what makes the language suitable to write functional code, let's expand on this.

## What does exactly "a function is just a value" means?

We have two variables in the following piece of code `firstNumber` and `secondNumber`, each of these variables is assigned with a value `4` and `2` respectively.

```js
const firstNumber = 4;
const secondNumber = 2;
```

Think about all the things we can do with these two variables, we could for example pass them as parameters to a function.

```js
add(firstNumber, secondNumber); // 6
```

Here comes the trick, a function is just a value like `4` and `2` which means that we can create a variable and assign a function as its value.

> This form of defining a function is called a function expression.

```js
const greet = function () {
  return "Hello";
};
```

Now, if we can assign a function to a variable, can we also pass it as a parameter to other functions? Yes, and as a matter of fact, this is one of the language features that makes it possible to write functional code using JavaScript.

```js
function hello(greet) {
  return greet() + " reader!";
}

hello(greet); // 'Hello reader!'
```

As with any other value you can pass the function directly and skip the variable creation.

```js
hello(function () {
  return "Hello";
});
// 'Hello reader!'
```

_Even though this is possible it is strongly recommended to use variables to improve readability._

 Great! 🎉 we just dissected what a higher-order function is, the `hello` function from above example is considered a higher-order function because it receives a function as parameter and calls it, a function that returns another function as its result is also considered as a higher-order function.

I hope this post would help you understand this key concept as this will pretty much be the base upon which we will build more concepts moving forward.

Next up, "Function composition, first steps".

> You can write functional code using JavaScript however, JavaScript is not a functional programming language.

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
