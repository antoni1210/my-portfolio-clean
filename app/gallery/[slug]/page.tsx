export const dynamic = "force-dynamic";


import Link from "next/link";
import { client } from "@/lib/sanity";
import GalleryGrid from "@/components/GalleryGrid";
import { redirect } from "next/navigation";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "65-24") {
    const firstProject = await client.fetch(`
    *[
      _type == "project" &&
      parentGallery->slug.current == "65-24"
    ] | order(order asc)[0]{
      slug
    }
  `);

    if (firstProject?.slug?.current) {
      redirect(
        `/gallery/65-24/${firstProject.slug.current}`
      );
    }
  }


  // Fetch all galleries for nav
  const galleries = await client.fetch(`
    *[_type == "gallery"] | order(order asc) {
      _id,
      title,
      slug
    }
  `);

  // Fetch current gallery
  const currentGallery = await client.fetch(
    `
    *[_type == "gallery" && slug.current == $slug][0]{
      title,
      images[]{
        asset->{
          _id,
          url
        }
      }
    }
  `,
    { slug }
  );

  const projects = await client.fetch(
    `
  *[
    _type == "project" &&
    parentGallery->slug.current == $slug
  ] | order(order asc) {
    _id,
    title,
    slug,
    images[]{
      asset->{
        _id,
        url
      }
    }
  }
`,
    { slug }
  );

  const images =
    slug === "65-24" && projects.length > 0
      ? projects[0].images || []
      : currentGallery?.images || [];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-[1700px] mx-auto">
        <div className="mb-16">
          <a
            href="/"
            className="text-sm tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors"
          >
            Home
          </a>
        </div>
        {/* Gallery nav */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 mb-20">
          {galleries.map(
            (
              gallery: {
                _id: string;
                title: string;
                slug: {
                  current: string;
                };
              },
              index: number
            ) => {
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
                   ${active ? "text-[#FAB617] [text-shadow:0_0_8px_rgba(250,182,23,0.5),0_0_16px_rgba(250,182,23,0.3)]" : ""}
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
        {slug === "65-24" && projects.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-4 mb-16">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="
          text-[#FAB617]/70
          uppercase
          text-[18px]
          font-semibold
          cursor-pointer
        "
                style={{
                  letterSpacing: "0.15em",
                }}
              >
                {project.title}
              </div>
            ))}
          </div>
        )}

        {slug === "65-24" ? (
          <GalleryGrid
            images={images}
            layout="grid"
          />
        ) : (
          <GalleryGrid
            images={images}
            layout="column"
          />
        )}
      </div>
    </main>
  );
}