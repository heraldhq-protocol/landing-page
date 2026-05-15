// @ts-nocheck
import * as __fd_glob_27 from "../content/docs/overview/concepts.mdx?collection=docs"
import * as __fd_glob_26 from "../content/docs/overview/architecture.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/specifications/wire-format.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/specifications/specifications.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/specifications/guarantees.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/sdk/typescript.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/sdk/billing.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/quickstart/quickstart.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/quickstart/index.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/privacy-model/governance.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/privacy-model/design-principles.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/guides/troubleshooting.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/guides/production-checklist.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/guides/integration-patterns.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/guides/examples.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/guides/ai-agent-mcp.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/api/rest.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/webhooks.mdx?collection=docs"
import { default as __fd_glob_9 } from "../content/docs/specifications/_meta.json?collection=docs"
import { default as __fd_glob_8 } from "../content/docs/sdk/_meta.json?collection=docs"
import { default as __fd_glob_7 } from "../content/docs/quickstart/_meta.json?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/privacy-model/_meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/overview/_meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/guides/_meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/api/_meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/_meta.json?collection=docs"
import * as __fd_glob_1 from "../content/changelog/v1-release.mdx?collection=changelog"
import * as __fd_glob_0 from "../content/blog/why-defi-privacy.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.docs("blog", "content/blog", {}, {"why-defi-privacy.mdx": __fd_glob_0, });

export const changelog = await create.docs("changelog", "content/changelog", {}, {"v1-release.mdx": __fd_glob_1, });

export const docs = await create.docs("docs", "content/docs", {"_meta.json": __fd_glob_2, "api/_meta.json": __fd_glob_3, "guides/_meta.json": __fd_glob_4, "overview/_meta.json": __fd_glob_5, "privacy-model/_meta.json": __fd_glob_6, "quickstart/_meta.json": __fd_glob_7, "sdk/_meta.json": __fd_glob_8, "specifications/_meta.json": __fd_glob_9, }, {"webhooks.mdx": __fd_glob_10, "api/rest.mdx": __fd_glob_11, "guides/ai-agent-mcp.mdx": __fd_glob_12, "guides/examples.mdx": __fd_glob_13, "guides/integration-patterns.mdx": __fd_glob_14, "guides/production-checklist.mdx": __fd_glob_15, "guides/troubleshooting.mdx": __fd_glob_16, "privacy-model/design-principles.mdx": __fd_glob_17, "privacy-model/governance.mdx": __fd_glob_18, "quickstart/index.mdx": __fd_glob_19, "quickstart/quickstart.mdx": __fd_glob_20, "sdk/billing.mdx": __fd_glob_21, "sdk/typescript.mdx": __fd_glob_22, "specifications/guarantees.mdx": __fd_glob_23, "specifications/specifications.mdx": __fd_glob_24, "specifications/wire-format.mdx": __fd_glob_25, "overview/architecture.mdx": __fd_glob_26, "overview/concepts.mdx": __fd_glob_27, });