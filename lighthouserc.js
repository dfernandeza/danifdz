module.exports = {
  ci: {
    collect: {
      // url: ["https://semaphoreci.com"],
      numberOfRuns: 1
    },
    assert: {
      preset: "lighthouse:no-pwa"
      //   assertions: {}
    },
    upload: {
      target: "filesystem",
      outputDir: "reports"
    }
  }
};
