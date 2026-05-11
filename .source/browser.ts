// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"why-defi-privacy.mdx": () => import("../content/blog/why-defi-privacy.mdx?collection=blog"), }),
  changelog: create.doc("changelog", {"v1-release.mdx": () => import("../content/changelog/v1-release.mdx?collection=changelog"), }),
  docs: create.doc("docs", {"webhooks.mdx": () => import("../content/docs/webhooks.mdx?collection=docs"), "api/rest.mdx": () => import("../content/docs/api/rest.mdx?collection=docs"), "guides/ai-agent-mcp.mdx": () => import("../content/docs/guides/ai-agent-mcp.mdx?collection=docs"), "guides/examples.mdx": () => import("../content/docs/guides/examples.mdx?collection=docs"), "guides/integration-patterns.mdx": () => import("../content/docs/guides/integration-patterns.mdx?collection=docs"), "guides/production-checklist.mdx": () => import("../content/docs/guides/production-checklist.mdx?collection=docs"), "guides/troubleshooting.mdx": () => import("../content/docs/guides/troubleshooting.mdx?collection=docs"), "overview/architecture.mdx": () => import("../content/docs/overview/architecture.mdx?collection=docs"), "overview/concepts.mdx": () => import("../content/docs/overview/concepts.mdx?collection=docs"), "privacy-model/design-principles.mdx": () => import("../content/docs/privacy-model/design-principles.mdx?collection=docs"), "privacy-model/governance.mdx": () => import("../content/docs/privacy-model/governance.mdx?collection=docs"), "quickstart/index.mdx": () => import("../content/docs/quickstart/index.mdx?collection=docs"), "quickstart/quickstart.mdx": () => import("../content/docs/quickstart/quickstart.mdx?collection=docs"), "specifications/guarantees.mdx": () => import("../content/docs/specifications/guarantees.mdx?collection=docs"), "specifications/specifications.mdx": () => import("../content/docs/specifications/specifications.mdx?collection=docs"), "specifications/wire-format.mdx": () => import("../content/docs/specifications/wire-format.mdx?collection=docs"), "sdk/billing.mdx": () => import("../content/docs/sdk/billing.mdx?collection=docs"), "sdk/typescript.mdx": () => import("../content/docs/sdk/typescript.mdx?collection=docs"), }),
};
export default browserCollections;