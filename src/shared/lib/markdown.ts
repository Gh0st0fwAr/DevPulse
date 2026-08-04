import { marked } from 'marked'

export function renderMarkdown(source: string): string {
  if (!source.trim()) return ''

  return marked.parse(source.trim(), { async: false }) as string
}
