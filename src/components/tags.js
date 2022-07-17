import React from "react";

// Makes sure that tags like 'functional programming' are transformed into `functional-programming`
const tagged = ([tagClass], tagExp) => `${tagClass}${tagExp.replace(" ", "-")}`;
// hot-pink, lilac, gold, cyan
const COLORS = ["#e46795", "#bc96ca", "#fbc641", "#66d3d6"];

function Tag({ tag }) {
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  return (
    <span
      className={tagged`tags__tag tags__tag--${tag}`}
      style={{ borderColor: randomColor }}
    >
      {tag}
    </span>
  );
}

export default function Tags({ tags }) {
  return (
    <span className="tags">
      {tags.map((tag, index) => (
        <Tag key={`${tag}-${index}`} tag={tag} />
      ))}
    </span>
  );
}
