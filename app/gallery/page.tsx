import { redirect } from "next/navigation";
import { client } from "@/lib/sanity";

export default async function GalleryIndexPage() {
  const firstGallery = await client.fetch(`
    *[_type == "gallery"] | order(order asc)[0]{
      slug
    }
  `);

  redirect(`/gallery/${firstGallery.slug.current}`);
}