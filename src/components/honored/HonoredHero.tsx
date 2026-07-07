export default function HonoredHero() {
  return (
    <div
      className="py-16 sm:py-24"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="max-w-3xl">
        <p
          className="flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] mb-4"
          style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}
        >
          <span
            aria-hidden
            style={{
              width: "26px",
              height: "1px",
              background: "var(--line)",
              display: "inline-block",
            }}
          />
          Curatorial Selection
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
          style={{
            fontFamily: "var(--serif)",
            color: "var(--text-bright)",
            textShadow: "var(--backlit)",
          }}
        >
          Honored Works
        </h1>
        <p
          className="mt-1 text-lg italic"
          style={{ fontFamily: "var(--serif)", color: "var(--text-dim)" }}
        >
          Tác Phẩm Vinh Danh
        </p>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text)" }}>
          These works have been selected by the Cultural Visions curatorial panel as
          outstanding examples of student photography that embody the spirit of Vietnamese
          culture, artistic excellence, and compelling visual storytelling. They are
          presented here as candidates for the RMIT University Vietnam VVIP gift collection.
        </p>
      </div>
    </div>
  );
}
