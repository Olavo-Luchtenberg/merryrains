export interface Chapter {
  id: number
  title: string
  startPage: number // 0-based
  endPage: number   // 0-based, inclusive
}

// Capítulo 6 (70 pág.) + Capítulo 7 (104 pág.)
export const CHAPTERS: Chapter[] = [
  { id: 6, title: "Capítulo 6", startPage: 0, endPage: 69 },
  { id: 7, title: "Capítulo 7", startPage: 70, endPage: 173 },
]

// Retorna capítulo pelo número (id) mostrado para o leitor
export function getChapterByIndex(id: number): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.id === id)
}

export function getChapterForPage(pageIndex: number): Chapter | undefined {
  return CHAPTERS.find(
    (ch) => pageIndex >= ch.startPage && pageIndex <= ch.endPage
  )
}

export function getChapterPageCount(chapter: Chapter): number {
  return chapter.endPage - chapter.startPage + 1
}

/** Calcula % de leitura do capítulo (0-100) baseado na última página lida */
export function calcChapterProgress(
  lastPageRead: number,
  chapter: Chapter
): number {
  if (lastPageRead < chapter.startPage) return 0
  const pagesRead = Math.min(lastPageRead, chapter.endPage) - chapter.startPage + 1
  const total = getChapterPageCount(chapter)
  return Math.round((pagesRead / total) * 100)
}
