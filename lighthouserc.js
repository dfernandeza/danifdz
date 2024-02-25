module.exports = {
  ci: {
    collect: {
      // url: ["https://semaphoreci.com"],
      numberOfRuns: 2
    },
    // assert: {
    //   preset: "lighthouse:no-pwa",
    //   assertions: {
    //     "csp-xss": "off",
    //     "inspector-issues": "off",
    //     "is-crawlable": "off",
    //     "total-byte-weight": "off",
    //     "total-byte-weight": "off",
    //     "unused-javascript": "off"
    //   }
    // },
    upload: {
      target: "filesystem",
      outputDir: "./lhci"
    }
  }
};
