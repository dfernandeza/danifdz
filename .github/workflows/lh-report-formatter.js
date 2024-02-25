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
 * to GitHub job summary
 * @param {string} filename The path to the JSON report file
 * @param {string|undefined} title Optional summary title to use
 */
function postSummary(filename, title) {
  title = title || "Lighthouse Performance";
  const results = JSON.parse(fs.readFileSync(filename, "utf8"));
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

  return rows;
}

module.exports = { postSummary };
