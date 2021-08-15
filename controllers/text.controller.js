const fetch = require("node-fetch");
const httpStatus = require("http-status");

module.exports.fetchController = {
  spellCheckText: async (req, res) => {
    const params = {
      q: req.body.q,
      hl: "en",
      gl: "us",
      api_key:
        "b39788412ea1ef8de5fe1aae41c2c9ac5fb1f31095fbb3b86e216c737faaa124",
    };
    try {
      const response = await fetch(
        `https://serpapi.com/search.json?q=${params.q}&hl=${params.hl}&gl=${params.gl}&api_key=${params.api_key}`
      );
      const json = await response.json();
      res.json({
        success: "Сorrect text validation",
        text: json.search_information.spelling_fix,
      });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
};
