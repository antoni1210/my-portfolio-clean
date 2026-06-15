export const dynamic = "force-dynamic";

import Link from "next/link";
import { client } from "@/lib/sanity";
import GalleryGrid from "@/components/GalleryGrid";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{
        slug: string;
        project: string;
    }>;
}) {
    const { slug, project } = await params;

    const galleries = await client.fetch(`
    *[_type == "gallery"] | order(order asc){
      _id,
      title,
      slug
    }
  `);

    const projects = await client.fetch(
        `
    *[
      _type == "project" &&
      parentGallery->slug.current == $slug
    ] | order(order asc){
      _id,
      title,
      slug,
     images[]{
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  }
}
    }
  `,
        { slug }
    );

    const activeProject =
        projects.find(
            (p: any) =>
                p.slug?.current === project
        ) || projects[0];

    const images =
        activeProject?.images || [];

    return (
        <main className="min-h-screen bg-black text-white px-6 py-10">
            <div className="max-w-[1700px] mx-auto">

                <div className="mb-16">
                    <a
                        href="/"
                        className="
    transition-all duration-500
    text-[#FAB617]/70
    hover:text-[#FAB617]
    hover:[text-shadow:0_0_6px_rgba(250,182,23,0.4),0_0_12px_rgba(250,182,23,0.2)]
    uppercase
    font-semibold
    text-[16px]
  "
                        style={{
                            letterSpacing: "0.15em",
                        }}
                    >
                        HOME
                    </a>
                </div>

                {/* Main gallery nav */}
                <div className="flex flex-wrap gap-x-16 gap-y-6 mb-8">
                    {galleries.map(
                        (gallery: any, index: number) => {
                            const active =
                                gallery.slug.current === slug;

                            return (
                                <Link
                                    key={gallery._id}
                                    href={`/gallery/${gallery.slug.current}`}
                                    className={`
                    transition-all duration-500
                    text-[#FAB617]/70
                    hover:text-[#FAB617]
                    hover:[text-shadow:0_0_6px_rgba(250,182,23,0.4),0_0_12px_rgba(250,182,23,0.2)]
                    ${active
                                            ? "text-[#FAB617] [text-shadow:0_0_8px_rgba(250,182,23,0.5),0_0_16px_rgba(250,182,23,0.3)]"
                                            : ""
                                        }
                  `}
                                >
                                    <h2
                                        className="text-[42px] leading-none uppercase font-semibold"
                                        style={{
                                            letterSpacing: "0.15em",
                                        }}
                                    >
                                        {gallery.title}
                                    </h2>
                                </Link>
                            );
                        }
                    )}
                </div>

                {/* Project nav */}
                {/* Project nav */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16">
                    {projects.map((p: any) => {
                        const active =
                            p.slug.current === project;

                        return (
                            <Link
                                key={p._id}
                                href={`/gallery/${slug}/${p.slug.current}`}
                                className={`
          transition-all duration-500
          uppercase font-semibold text-[18px]
          ${active
                                        ? "text-[#FAB617] [text-shadow:0_0_8px_rgba(250,182,23,0.5),0_0_16px_rgba(250,182,23,0.3)]"
                                        : "text-[#FAB617]/60 hover:text-[#FAB617] hover:[text-shadow:0_0_6px_rgba(250,182,23,0.4),0_0_12px_rgba(250,182,23,0.2)]"
                                    }
        `}
                                style={{
                                    letterSpacing: "0.15em",
                                }}
                            >
                                {p.title}
                            </Link>
                        );
                    })}
                </div>
                
                <GalleryGrid
                    images={images}
                    layout="grid"
                />
            </div>
        </main>
    );
}