import { TOTAL_BOOK_PAGES } from "./book-pages"

export interface Chapter {
  id: number
  title: string
  startPage: number // 0-based
  endPage: number   // 0-based, inclusive
}

// Capítulo 6 - único capítulo no momento
export const CHAPTERS: Chapter[] = [
  { id: 6, title: "Capítulo 6", startPage: 0, endPage: TOTAL_BOOK_PAGES - 1 },
]

export function getChapterByIndex(index: number): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.id === index)
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
