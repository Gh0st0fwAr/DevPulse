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

https://gh0st0fwar.github.io/DevPulse/dist/

```bash
npm run build
```

### Публикация на GitHub Pages

1. В репозитории **DevPulse** открой **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. После `git push` workflow `.github/workflows/deploy-pages.yml` соберёт проект и закоммитит папку `dist/`
5. Сайт будет доступен по адресу выше (`dist/index.html` в корне репозитория)

> Важно: base path в Vite — `/DevPulse/dist/` (регистр букв как в имени репозитория).

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — TypeScript + сборка для GitHub Pages
- `npm run preview` — предпросмотр production-сборки
- `npm run lint` — Biome
