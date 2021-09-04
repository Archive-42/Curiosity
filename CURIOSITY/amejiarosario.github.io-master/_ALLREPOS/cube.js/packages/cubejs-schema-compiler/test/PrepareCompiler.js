const PrepareCompiler = require('../compiler/PrepareCompiler');

exports.prepareCompiler = (content, options) => PrepareCompiler.prepareCompiler({
  dataSchemaFiles: () => Promise.resolve([
    { fileName: "main.js", content }
  ])
}, { adapter: 'postgres', ...options });
