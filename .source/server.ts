// @ts-nocheck
import * as __fd_glob_21 from "../content/docs/user-guides/production-checklist.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/user-guides/integration-patterns.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/sdk/typescript.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/sdk/billing.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/protocol/wire-format.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/protocol/specifications.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/protocol/guarantees.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/philosophy/governance.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/philosophy/design-principles.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/overview/concepts.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/overview/architecture.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/getting-started/quickstart.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/getting-started/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/api/rest.mdx?collection=docs"
import { default as __fd_glob_7 } from "../content/docs/user-guides/_meta.json?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/sdk/_meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/protocol/_meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/philosophy/_meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/overview/_meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/getting-started/_meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/api/_meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/_meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"_meta.json": __fd_glob_0, "api/_meta.json": __fd_glob_1, "getting-started/_meta.json": __fd_glob_2, "overview/_meta.json": __fd_glob_3, "philosophy/_meta.json": __fd_glob_4, "protocol/_meta.json": __fd_glob_5, "sdk/_meta.json": __fd_glob_6, "user-guides/_meta.json": __fd_glob_7, }, {"api/rest.mdx": __fd_glob_8, "getting-started/index.mdx": __fd_glob_9, "getting-started/quickstart.mdx": __fd_glob_10, "overview/architecture.mdx": __fd_glob_11, "overview/concepts.mdx": __fd_glob_12, "philosophy/design-principles.mdx": __fd_glob_13, "philosophy/governance.mdx": __fd_glob_14, "protocol/guarantees.mdx": __fd_glob_15, "protocol/specifications.mdx": __fd_glob_16, "protocol/wire-format.mdx": __fd_glob_17, "sdk/billing.mdx": __fd_glob_18, "sdk/typescript.mdx": __fd_glob_19, "user-guides/integration-patterns.mdx": __fd_glob_20, "user-guides/production-checklist.mdx": __fd_glob_21, });