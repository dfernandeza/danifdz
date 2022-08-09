import React from "react";

import "./card.css";

export default function Card({ title, text }) {
  return (
    <article className="card">
      <header className="card-header">{title}</header>
      <p className="card-text">{text}</p>
    </article>
  );
}
