// source.config.ts
import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs"
});
var blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().optional(),
      author: z.string().optional()
    })
  }
});
var changelog = defineDocs({
  dir: "content/changelog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().optional()
    })
  }
});
var source_config_default = defineConfig();
export {
  blog,
  changelog,
  source_config_default as default,
  docs
};
