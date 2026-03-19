export default function HonoredHero() {
  return (
    <div
      className="py-16 sm:py-24"
      style={{ borderBottom: "1px solid rgba(122,21,21,0.2)" }}
    >
      <div className="max-w-3xl">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#7a1515" }}
        >
          Curatorial Selection
        </p>
        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight"
          style={{ color: "#f2e4c0" }}
        >
          Honored Works
        </h1>
        <p
          className="mt-1 font-serif text-lg italic"
          style={{ color: "#6a4a30" }}
        >
          Tác Phẩm Vinh Danh
        </p>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: "#b09070" }}>
          These works have been selected by the Cultural Visions curatorial panel as
          outstanding examples of student photography that embody the spirit of Vietnamese
          culture, artistic excellence, and compelling visual storytelling. They are
          presented here as candidates for the RMIT University Vietnam VVIP gift collection.
        </p>
      </div>
    </div>
  );
}
