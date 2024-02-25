module.exports = {
  ci: {
    collect: {
      // url: ["https://semaphoreci.com"],
      numberOfRuns: 2,

      settings: {
        // accessibility, best-practices, performance, pwa, seo
        onlyCategories: ["performance"],
        maxWaitForLoad: 10_000
      }
    },
    // assert: {},
    upload: {
      target: "filesystem",
      outputDir: "./lhci"
      // reportFilenamePattern: "lighthouse-results-.%%EXTENSION%%"
    }
  }
};
