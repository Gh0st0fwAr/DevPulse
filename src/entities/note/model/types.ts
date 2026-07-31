/**
 * TODO (раздел 3 ТЗ): спроектируй интерфейс Note.
 *
 * По требованиям:
 * - id
 * - заголовок
 * - текстовое содержимое (Markdown)
 * - тег
 * - дата последнего обновления
 */
export interface Note {
  id: string,
  title: string,
  content: string,
  tag: string,
  lastUpdated: string
}
