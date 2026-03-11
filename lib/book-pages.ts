// Prévia do livro (página inicial) - Livro 1 a 39
const PREVIEW_BASE = [
  "/Livro%201.png",
  "/LIvro%202.png",
  "/Livro%203.png",
  "/Livro%204.png",
  "/Livro%205.png",
  "/Livro%206.png",
  "/Livro%207.png",
  "/Livro%208.png",
]
const PREVIEW_REST = Array.from({ length: 31 }, (_, i) => `/Livro%20${i + 9}.png`)
export const PREVIEW_PAGE_IMAGES: readonly string[] = [
  ...PREVIEW_BASE,
  ...PREVIEW_REST,
]

// Biblioteca e leitor - Capítulo 6 (70 páginas) + Capítulo 7 (104 páginas)
const C6_PAGES = Array.from({ length: 70 }, (_, i) => `/C6%20-%20${i + 1}.png`)
const C7_PAGES = Array.from({ length: 104 }, (_, i) => `/C7%20-%20${i + 1}.png`)
export const BOOK_PAGE_IMAGES: readonly string[] = [...C6_PAGES, ...C7_PAGES]

export const TOTAL_BOOK_PAGES = BOOK_PAGE_IMAGES.length
