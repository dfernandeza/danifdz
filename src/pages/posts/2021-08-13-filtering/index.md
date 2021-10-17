---
path: "/filtering"
date: "2021-08-13"
title: "Filtering"
tags: ["learning", "javascript", "functional programming", "series"]
excerpt: "Another day another another functional approach to manipulate lists."
thumbnail: "../../../images/thumb.png"
published: true
---

_This is the seventh post on the ["Functional approach to functional programming"](/functional-approach-to-functional-programming) series._

Another day another another functional approach to manipulate lists. On the previous post we introduced [the map function](/mapping) which basically allow us to modify all the elements of a list by applying a common function to them. Now we will cover "filtering".

## What is filter for?

Filter is used for filtering elements out of a list.

> Filtering consists of filtering elements out of a list by applying a conditional function to them. If the conditional function returns true the element is included else, the element is excluded.

You know the drill, let's jump into the example. Imagine we have a list containing restaurant star ratings ⭐ where a rating could be a number between 0 and 5 (including half stars i.e. 4.5). Now, let's say we want to get a list containing only the best restaurants, or put in different words we would like to include only those restaurants with a rating higher than or equal to 4.

```js{12-14}
const restaurants = [
  { name: "Grandma’s Sweets", rating: 4.5 },
  { name: "What the PHO", rating: 3 },
  { name: "The Great Tortilla", rating: 4 },
  { name: "Grassfed Grill", rating: 2.5 },
  { name: "5 Stars", rating: 5 }
];

const greatRestaurants = [];

for (const restaurant of restaurants) {
  if (restaurant.rating >= 4) {
    greatRestaurants.push(restaurant);
  }
}

// greatRestaurants contains: [ { name: "Grandma’s Sweets", rating: 4.5 }, { name: "The Great Tortilla", rating: 4 }, { name: "5 Stars", rating: 5 } ]
```

With this code we iterate the list of restaurants and apply a condition (see highlighted lines) to each restaurant. We include the restaurant in the list of "great restaurants" only when the condition evaluates to `true`.

As you might have guessed already 🔮, there is a "more functional" way of doing this and in fact, JavaScript offers a native implementation of the filter function. Let's make use of it.

```js
const restaurants = [
  { name: "Grandma’s Sweets", rating: 4.5 },
  { name: "What the PHO", rating: 3 },
  { name: "The Great Tortilla", rating: 4 },
  { name: "Grassfed Grill", rating: 2.5 },
  { name: "5 Stars", rating: 5 }
];

function isItGreat(restaurant) {
  return restaurant.rating >= 4;
}

const greatRestaurants = restaurants.filter(isItGreat);

// greatRestaurants contains: [ { name: "Grandma’s Sweets", rating: 4.5 }, { name: "The Great Tortilla", rating: 4 }, { name: "5 Stars", rating: 5 } ]
```

Notice that the `filter` function is actually a [higher-order function](/functions-as-values) it receives another function as parameter (a.k.a callback) and applies the function to each element in the list in order to decide whether or not the element should be filtered out of the list.

> Could you picture the implementation of the filter function 🔬? I encourage you to try implementing your own filter function, this will be a great exercise to help you interiorize the concept.

Great, now let's see how we would use `map` and `filter` together. Imagine we want to get **only the names** of the restaurants with a rating higher than or equal to 4. We could do something like:

```js
const restaurants = [
  { name: "Grandma’s Sweets", rating: 4.5 },
  { name: "What the PHO", rating: 3 },
  { name: "The Great Tortilla", rating: 4 },
  { name: "Grassfed Grill", rating: 2.5 },
  { name: "5 Stars", rating: 5 }
];

function isItGreat(restaurant) {
  return restaurant.rating >= 4;
}

function getName(restaurant) {
  return restaurant.name;
}

const greatRestaurants = restaurants.filter(isItGreat);
const greatRestaurantNames = greatRestaurants.map(getName);

// [ "Grandma’s Sweets", "The Great Tortilla", "5 Stars" ]
```

One interesting thing to notice is that we can chain this function calls and the reason why we can do this is because both `map` and `filter` return a new list/array instance.

_I won't enter into much detail because this is out of the scope of this post (this is in fact an OOP concept) however, I invite you to feed your curiosity and read more about this._

```js{17}
const restaurants = [
  { name: "Grandma’s Sweets", rating: 4.5 },
  { name: "What the PHO", rating: 3 },
  { name: "The Great Tortilla", rating: 4 },
  { name: "Grassfed Grill", rating: 2.5 },
  { name: "5 Stars", rating: 5 }
];

function isItGreat(restaurant) {
  return restaurant.rating >= 4;
}

function getName(restaurant) {
  return restaurant.name;
}

const greatRestaurants = restaurants.filter(isItGreat).map(getName);

// [ "Grandma’s Sweets", "The Great Tortilla", "5 Stars" ]
```

Alright, two down, one to go.

Next up, ["Reducing"](/reducing).

---

_If you find something wrong please let me know or open a [GitHub issue](https://github.com/dfernandeza/danifdz/issues)._

_Thanks, [@dfernandeza](https://twitter.com/dfernandeza)_
