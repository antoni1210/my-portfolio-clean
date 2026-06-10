import HomeCanvas from "@/components/HomeCanvas";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <HomeCanvas key="home-canvas" />

      <div className="fixed top-6 left-6 z-50">
        <a
          href="/gallery"
          className="
            transition-all duration-500
            text-[#FAB617]/70
            hover:text-[#FAB617]
            hover:[text-shadow:0_0_6px_rgba(250,182,23,0.4),0_0_12px_rgba(250,182,23,0.2)]
            text-[42px]
            leading-none
            uppercase
            font-semibold
          "
          style={{
            letterSpacing: "0.15em",
          }}
        >
          Gallery
        </a>
      </div>
    </main>
  );
}