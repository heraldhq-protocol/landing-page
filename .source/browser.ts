// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"api/rest.mdx": () => import("../content/docs/api/rest.mdx?collection=docs"), "getting-started/index.mdx": () => import("../content/docs/getting-started/index.mdx?collection=docs"), "getting-started/quickstart.mdx": () => import("../content/docs/getting-started/quickstart.mdx?collection=docs"), "overview/architecture.mdx": () => import("../content/docs/overview/architecture.mdx?collection=docs"), "overview/concepts.mdx": () => import("../content/docs/overview/concepts.mdx?collection=docs"), "philosophy/design-principles.mdx": () => import("../content/docs/philosophy/design-principles.mdx?collection=docs"), "philosophy/governance.mdx": () => import("../content/docs/philosophy/governance.mdx?collection=docs"), "protocol/guarantees.mdx": () => import("../content/docs/protocol/guarantees.mdx?collection=docs"), "protocol/specifications.mdx": () => import("../content/docs/protocol/specifications.mdx?collection=docs"), "protocol/wire-format.mdx": () => import("../content/docs/protocol/wire-format.mdx?collection=docs"), "sdk/billing.mdx": () => import("../content/docs/sdk/billing.mdx?collection=docs"), "sdk/typescript.mdx": () => import("../content/docs/sdk/typescript.mdx?collection=docs"), "user-guides/integration-patterns.mdx": () => import("../content/docs/user-guides/integration-patterns.mdx?collection=docs"), "user-guides/production-checklist.mdx": () => import("../content/docs/user-guides/production-checklist.mdx?collection=docs"), }),
};
export default browserCollections;