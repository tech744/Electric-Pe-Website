import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/blog/posts";
import { getBlogBody, getBlogToc } from "@/content/blog/bodies";
import { TableOfContents } from "@/components/blog/table-of-contents";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      title: p.title,
      description: p.dek,
      type: "article",
      url: absoluteUrl(`/blogs/${slug}`),
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      authors: [p.author.name],
      images: [{ url: absoluteUrl(p.coverImage) }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) notFound();

  const body = getBlogBody(slug);
  const toc = getBlogToc(slug);
  const related = getRelatedPosts(slug);

  const article = articleSchema({
    headline: p.title,
    description: p.dek,
    image: p.coverImage,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    authorName: p.author.name,
    url: `/blogs/${slug}`,
  });

  return (
    <>
      <JsonLd
        data={[
          article,
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blogs", href: "/blogs" },
            { name: p.title, href: `/blogs/${slug}` },
          ]),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container size="lg">
          <Breadcrumb items={[{ label: "Blogs", href: "/blogs" }, { label: p.title }]} />
        </Container>
      </div>

      <article>
        <header className="pt-6 pb-10 md:pt-10 md:pb-14 bg-[var(--color-surface-muted)]">
          {/* Same grid as the body below, so the title lines up with the article
              column rather than sitting over the contents rail. */}
          <Container size="lg" className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            <div className="hidden lg:block" aria-hidden />
            <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.categories.map((c) => (
                <Badge key={c} variant="brand">
                  {c}
                </Badge>
              ))}
            </div>
            <h1 className="text-display-lg">{p.title}</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              {p.dek}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-brand)] text-white inline-flex items-center justify-center font-semibold">
                {p.author.name
                  .split(" ")
                  .map((x) => x[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{p.author.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {p.author.role} · {formatDate(p.publishedAt)} · {p.readMinutes} min read
                </p>
              </div>
            </div>
            </div>
          </Container>
        </header>

        <Section className="pt-10 md:pt-12">
          <Container size="lg">
            <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
              {/* Contents rail: stays put while the article scrolls past it. */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents items={toc} />
                </div>
              </aside>

              <div className="min-w-0">
                {/* Cover art is capped to the column so a small source image is
                    never blown up across the full viewport. */}
                <div className="relative aspect-[16/9] mb-10 rounded-2xl overflow-hidden bg-[var(--color-surface-muted)]">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>

                {/* Small-screen contents live inline, above the article. */}
                {toc.length > 1 && (
                  <details className="lg:hidden mb-8 rounded-xl border border-[var(--color-border)] p-4">
                    <summary className="text-sm font-semibold cursor-pointer">
                      On this page
                    </summary>
                    <div className="mt-3">
                      <TableOfContents items={toc} />
                    </div>
                  </details>
                )}

                {body ? (
                  <div
                    className="blog-body max-w-none text-[var(--color-text)] leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                ) : (
                  <div className="blog-body max-w-none text-[var(--color-text)] leading-relaxed text-lg">
                    <p>{p.dek}</p>
                  </div>
                )}

                <aside className="mt-12 rounded-2xl bg-[var(--color-brand-soft)] border border-[var(--color-brand-border)] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-eyebrow mb-1">Still reading?</p>
                    <p className="font-display text-lg font-bold">
                      See a scooter in person.
                    </p>
                  </div>
                  <Button asChild trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                    <Link href="/book-test-ride">Book Free Test Ride</Link>
                  </Button>
                </aside>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-[var(--color-surface-muted)]">
          <Container size="md">
            <h2 className="text-h2 mb-6">Related reads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blogs/${r.slug}`} className="group">
                  <Card interactive className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[16/10] bg-white">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold group-hover:text-[var(--color-brand)]">
                        {r.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        {formatDate(r.publishedAt)} · {r.readMinutes} min
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
