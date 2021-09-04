var memoryCache = require("memory-cache");

module.exports = { cache };

function cache(cacheDuration) {
  return (req, res, next) => {
    let cacheKey = "__express__" + req.originalUrl || req.url;
    let cacheBody = memoryCache.get(cacheKey);
    if (cacheBody) {
      res.status(200).json(cacheBody);
      return;
    } else {
      res.sendResponseBody = res.status(200).json;
      res.status(200).json = (jsonBody) => {
        memoryCache.put(cacheKey, jsonBody, cacheDuration * 1000);
        res.sendResponseBody(jsonBody);
      };
      next();
    }
  };
}
