"use client"

export function Book3DModel() {
  return (
    <div
      className="relative w-full aspect-[4/5] min-h-[240px] sm:min-h-[280px] md:min-h-[320px] rounded-lg overflow-hidden bg-transparent"
    >
      <iframe
        src="/book-viewer.html"
        title="Merry Rains - Livro 3D"
        className="absolute inset-0 w-full h-full border-0 bg-transparent"
      />
    </div>
  )
}
