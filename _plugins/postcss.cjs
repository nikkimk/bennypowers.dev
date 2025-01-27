const { Processor } = require('postcss');
const env = require('postcss-preset-env');

const processor = new Processor([
  env({
    features: {
      "nesting-rules": true,
    }
  })
]);

/**
 * @param{import('@11ty/eleventy/src/UserConfig.js')} eleventyConfig
 * @param{*} options
 */
module.exports = function(eleventyConfig, options) {
  eleventyConfig.addTemplateFormats('css');
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile(input, from) {
      return async function({ page }) {
        try {
          const to = page.outputPath;
          const result = await processor.process(input, { from, to });
          return result.css;
        } catch(e) {
          console.error(e)
        }
      }
    }
  });
}
