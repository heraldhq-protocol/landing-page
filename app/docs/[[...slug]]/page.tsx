import { source } from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultComponents from "fumadocs-ui/mdx";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return {};

  const baseUrl = "https://useherald.xyz";
  const path = page.url;
  const ogUrl = new URL(`${baseUrl}/og${path}`);

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `${baseUrl}${path}`,
      type: "article",
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogUrl.toString()],
    },
  };
}
