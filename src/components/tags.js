import React from "react";

const tagged = ([tagClass], tagExp) => `${tagClass}${tagExp.replace(" ", "-")}`;

export default function Tags({ tags }) {
  return (
    <span className="tags">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className={tagged`tags__tag tags__tag--${tag}`}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}
