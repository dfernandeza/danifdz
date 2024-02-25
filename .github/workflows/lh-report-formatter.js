// @ts-check
// const ghCore = require("@actions/core");
const { evalEmojiUnit } = require("./emoji.js");
const fs = require("fs");

const metrics = [
  "largest-contentful-paint",
  "max-potential-fid",
  "cumulative-layout-shift",
  "interactive",
  "total-blocking-time",
  "speed-index"
];

/**
 * Reads Lighthouse JSON report and posts the main metrics
 * to GitHub comments
 * @param {string} reportFilename The path to the JSON report file
 * @param {string|undefined} type Optional type mobile/desktop
 */
function createComment(reportFilename, type) {
  const title = "Lighthouse Performance";
  const results = JSON.parse(fs.readFileSync(reportFilename, "utf8"));
  const rows = [];

  metrics.forEach((key) => {
    const audit = results.audits[key];
    // be safe and always push strings
    rows.push([
      audit.title,
      String(audit.displayValue),
      evalEmojiUnit(audit.score)
    ]);
  });

  // add the final performance score
  const performanceAudit = results.categories.performance;
  const performance = Math.round(performanceAudit.score * 100);
  const performanceSymbol = evalEmojiUnit(performanceAudit.score);
  rows.push([performanceAudit.title, String(performance), performanceSymbol]);

  console.table(rows);

  const comment = `## Lighthouse report - ${type}

  We ran Lighthouse against the changes, here's the summary:
  
  | Metric | Time | Eval |
  | ------ | ---- | ---- |
  ${rows
    .map(([metric, time, eval]) => {
      return `| ${metric} | ${time} | ${eval} |`;
    })
    .join()}
  `;

  return comment;
}

module.exports = { createComment };
