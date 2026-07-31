# DevPulse

Персональный дашборд продуктивности (учебный MVP по ТЗ).

## Запуск локально

```bash
npm install
npm run dev
```

Открой: http://127.0.0.1:5173/

## GitHub Pages

Production-сборка настроена на базовый путь:

https://gh0st0fwar.github.io/devpulse/dist/

```bash
npm run build
```

Содержимое папки `dist/` нужно опубликовать в репозитории `devpulse` (например, закоммитить в ветку или папку, откуда GitHub Pages отдаёт статику).

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — TypeScript + сборка для GitHub Pages
- `npm run preview` — предпросмотр production-сборки
- `npm run lint` — Biome
