// Páginas do livro - usadas na prévia e no leitor da biblioteca
export const BOOK_PAGE_IMAGES = [
  "/book-pages/Livro%201.png",
  "/book-pages/LIvro%202.png",
  "/book-pages/Livro%203.png",
  "/book-pages/Livro%204.png",
  "/book-pages/Livro%205.png",
  "/book-pages/Livro%206.png",
  "/book-pages/Livro%207.png",
  "/book-pages/Livro%208.png",
  ...Array.from({ length: 30 }, (_, i) => `/book-pages/${i + 9}.png`),
] as const

export const TOTAL_BOOK_PAGES = BOOK_PAGE_IMAGES.length
