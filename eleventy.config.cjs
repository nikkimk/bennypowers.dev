const YAML = require('yaml');
const anchor = require('markdown-it-anchor');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

const DecksPlugin = require('eleventy-plugin-slide-decks');
const EmbedPlugin = require('eleventy-plugin-embed-everything');
const TableOfContentsPlugin = require('eleventy-plugin-nesting-toc');
const TimeToReadPlugin = require('eleventy-plugin-time-to-read');
const EleventyPluginDirectoryOutput = require('@11ty/eleventy-plugin-directory-output');
const EleventyPluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const GlitchPlugin = require('./_plugins/glitch.cjs');
const IconsPlugin = require('./_plugins/icons.cjs');
const FiltersPlugin = require('./_plugins/filters.cjs');
const PostsPlugin = require('./_plugins/posts.cjs');
const PostCSSPlugin = require('./_plugins/postcss.cjs');

/** @param{import('@11ty/eleventy/src/UserConfig.js')} eleventyConfig */
module.exports = function(eleventyConfig) {
  eleventyConfig.ignores.add('README.md');
  eleventyConfig.setQuietMode(true);
  eleventyConfig.amendLibrary('md', md => md.use(anchor, { permalink: anchor.permalink.headerLink(), }));
  eleventyConfig.addDataExtension('yaml', x => YAML.parse(x));
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPlugin(PostsPlugin);
  eleventyConfig.addPlugin(IconsPlugin);
  eleventyConfig.addPlugin(FiltersPlugin);
  eleventyConfig.addPlugin(DecksPlugin, { assetsExtensions: ['png', 'svg']});
  eleventyConfig.addPlugin(GlitchPlugin);
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPlugin(EmbedPlugin, { lite: true });
  eleventyConfig.addPlugin(TableOfContentsPlugin);
  eleventyConfig.addPlugin(TimeToReadPlugin);
  eleventyConfig.addPlugin(EleventyPluginDirectoryOutput);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight, { init() { require('prismjs/components/index')(['regex']) } });
  return {
    templateFormats: [ 'md', 'njk', 'html', 'svg', 'css' ],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
