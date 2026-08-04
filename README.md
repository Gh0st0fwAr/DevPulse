# DevPulse

Персональный дашборд продуктивности: задачи, фокус-таймер и заметки в одном интерфейсе.

**Демо (GitHub Pages):** [gh0st0fwar.github.io/DevPulse/](https://gh0st0fwar.github.io/DevPulse/)

```bash
npm install
npm run dev      # http://127.0.0.1:5174
npm run build    # production-сборка в dist/
npm run preview  # предпросмотр сборки
```

---

<br>

## Документация по использованию сайта

> Руководство для пользователя интерфейса — без технических деталей реализации.

### Навигация и общий layout

| Элемент | Где находится | Что делает |
|--------|----------------|------------|
| **DevPulse** | Слева в шапке | Переход на страницу «Задачи» |
| **Задачи · Таймер · Заметки** | Справа в шапке | Переключение разделов |
| **☀️ / 🌙** | Крайний правый угол шапки | Светлая и тёмная тема (выбор сохраняется) |
| **Панель таймера** | Под шапкой на всех страницах | Запуск помодоро, пауза, сброс, привязка задачи |

Данные (задачи, заметки, тема) сохраняются в **localStorage** браузера — после перезагрузки страницы всё остаётся на месте.

---

### Задачи (`/tasks`)

Канбан-доска из трёх колонок:

| Колонка | Назначение |
|---------|------------|
| **Бэклog** | Новые и запланированные задачи |
| **В работе** | То, над чем работаете сейчас |
| **Готово** | Завершённые задачи |

**Создание задачи**

1. Нажмите **«Новая задача»**.
2. Заполните форму: заголовок (обязательно), описание, теги через запятую, дедлайн, число помодоро-сессий.
3. **«Создать»** — задача попадёт в «Бэклog». **Escape** или клик по затемнению закрывают модальное окно.

**Перетаскивание**

- Перетащите карточку в другую колонку — статус обновится автоматически.
- При переносе в **«Готово»** фиксируется дата завершения.

**Карточка задачи**

- Заголовок, описание, теги, дедлайн, счётчик сессий (`выполнено / запланировано`).
- **«Удалить»** — безвозвратное удаление задачи.

---

### Фокус-таймер (панель под шапкой)

Помодоро: **25 минут** работы → **5 минут** перерыва → цикл повторяется.

| Кнопка | Действие |
|--------|----------|
| **Старт** | Запуск отсчёта; при первом запуске браузер может запросить разрешение на уведомления |
| **Пауза** | Остановка без сброса оставшегося времени |
| **Сброс** | Возврат к полной длительности текущего режима (работа или перерыв) |

**Привязка к задаче**

1. В списке **«Задача для фокуса»** доступны только задачи из колонки **«В работе»**.
2. После успешной **рабочей** сессии у связанной задачи +1 к счётчику выполненных помодоро.
3. Если задачу убрали из «В работе» или удалили — привязка сбрасывается.

**Окончание сессии**

- Короткий звуковой сигнал и системное уведомление (если разрешено).
- Автоматический переход в следующий режим (работа ↔ перерыв) с новым отсчётом.

**Страница «Таймер»** (`/timer`) показывает текущий статус и связанную задачу; управление — в общей панели выше.

---

### Заметки (`/notes`)

Master-detail: список слева, редактор и превью справа.

**Создание**

- **«Новая заметка»** — заметка с заголовком «Без названия», сразу выбирается для редактирования.

**Редактирование**

| Поле | Описание |
|------|----------|
| **Заголовок** | Название в списке |
| **Контент (Markdown)** | Текст с разметкой Markdown |
| **Тег** | Одна метка для фильтрации |

Изменения сохраняются автоматически. Ниже полей — **живое превью** отрендеренного Markdown.

**Фильтр по тегу**

- Поле над списком: введите тег — останутся только заметки с точным совпадением.
- Очистите поле — снова видны все заметки.

**Удаление**

- Кнопка **«Удалить»** в правой панели удаляет выбранную заметку.

**Список слева**

- Заголовок, тег (или «без тега») и дата последнего изменения.
- Повторный клик по выбранной заметке снимает выделение.

---

<br>

<div align="center">

◆ ◆ ◆

**Ниже — документация для разработчиков**

◆ ◆ ◆

</div>

<br>

---

## Документация по коду

> Архитектура, стек и структура репозитория DevPulse.

### Стек

| Слой | Технология |
|------|------------|
| UI | Vue 3 (Composition API, `<script setup>`) |
| Язык | TypeScript (`strict`) |
| Состояние | Pinia + `@vueuse/core` (`useLocalStorage`) |
| Маршрутизация | Vue Router |
| Стили | Tailwind CSS + `@tailwindcss/typography` |
| Сборка | Vite 5 |
| Валидация форм | Zod |
| DnD | vuedraggable |
| Markdown | marked |
| Линтер | Biome |

### Архитектура (FSD)

Зависимости направлены **сверху вниз**:

```
pages → widgets → features → entities → shared
```

| Слой | Роль | Примеры |
|------|------|---------|
| **app** | Bootstrap, роутер, глобальные стили | `App.vue`, `router/` |
| **pages** | Страницы-маршруты | `TasksPage`, `TimerPage`, `NotesPage` |
| **widgets** | Крупные UI-блоки | `KanbanBoard`, `FocusTimerWidget`, `NotesLayout` |
| **features** | Пользовательские сценарии | `create-task`, `run-timer`, `link-timer-task` |
| **entities** | Бизнес-сущности + store | `task`, `timer`, `note` |
| **shared** | UI-kit, утилиты, конфиг | `UiButton`, `formatDate`, `renderMarkdown` |

Public API каждого слоя — через `index.ts` (импорты вида `@entities/task`, `@features/run-timer`).

### Структура `src/`

```
src/
├── app/                    # Точка входа, провайдеры, стили
├── pages/                  # tasks | timer | notes
├── widgets/
│   ├── app-header/         # Шапка + переключатель темы
│   ├── focus-timer/        # Глобальная панель помодоро
│   ├── kanban-board/       # KanbanColumn + KanbanBoard
│   └── notes-layout/       # Master-detail заметок
├── features/
│   ├── create-task/        # Zod-схема + CreateTaskModal
│   ├── create-note/        # Кнопка новой заметки
│   ├── filter-notes/       # Фильтр по тегу
│   ├── link-timer-task/    # Select привязки задачи
│   └── run-timer/          # useRunTimer, timerEngine, sync link
├── entities/
│   ├── task/model/         # Task, store, TaskCard
│   ├── timer/model/        # TimerState, tick engine, endsAt
│   └── note/model/         # Note, store, NoteListItem
└── shared/
    ├── ui/                 # UiButton, UiInput, UiTextarea, UiModal, UiEmpty
    ├── lib/                # utils, markdown, useTheme
    └── config/             # APP_NAME, ROUTES
```

### Ключевые модули

#### Задачи (`entities/task`)

- Store: `devpulse.tasks` в localStorage.
- `tasksByStatus` — computed-колонки для канбана.
- `moveTask` / `incrementCompletedSessions` — иммутабельное обновление элементов массива.
- Kanban не мутирует store через `:list` draggable — статус меняется только в `moveTask` по событию `@change`.

#### Таймер (`entities/timer` + `features/run-timer`)

- **Один** `setInterval` в timer store (не в компонентах).
- Countdown от **`endsAt`** (wall-clock) + синхронизация при `visibilitychange`.
- `WORK_SECONDS` / `BREAK_SECONDS`: 25×60 и 5×60; для отладки: `VITE_DEBUG_TIMER=1 npm run dev`.
- `useTimerTaskSync()` в `App.vue` — сброс `linkedTaskId`, если задача не `in_progress`.
- `LinkTimerTaskSelect` проверяет статус задачи; store хранит только `setLinkedTaskId`.

#### Заметки (`entities/note`)

- Store: `devpulse.notes` в localStorage.
- `renderMarkdown()` — `marked`, превью через `v-html` + классы `prose`.

#### Тема (`shared/lib/useTheme.ts`)

- `@vueuse/core` `useDark`, ключ `devpulse.theme`.
- Tailwind `darkMode: 'class'`.

### Алиасы путей

Настроены в `vite.config.ts`: `@`, `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`.

### Скрипты npm

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер (`127.0.0.1:5174`) |
| `npm run build` | `vue-tsc` + Vite → `dist/` |
| `npm run preview` | Локальный просмотр сборки |
| `npm run lint` | Проверка Biome |
| `npm run lint:fix` | Автоисправление |
| `npm run format` | Форматирование |

### GitHub Pages

- **URL:** `https://<username>.github.io/DevPulse/`
- **Base path:** `/DevPulse/` (см. `vite.config.ts`).
- **Деплой:** GitHub Actions загружает **содержимое `dist/`** как корень сайта — папка `dist/` в репозиторий не коммитится.
- **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
- **SPA / виртуальный роутинг:** при сборке в `dist/` создаются `404.html` (копия `index.html`) и `.nojekyll` — прямой заход на `/DevPulse/tasks`, `/DevPulse/notes` и F5 работают корректно.

Workflow: `.github/workflows/deploy-pages.yml` — `npm run build` → artifact → `deploy-pages`.

### Локальная разработка

```bash
git clone https://github.com/Gh0st0fwAr/DevPulse.git
cd DevPulse
npm install
npm run dev
```

TypeScript-проверка и production-сборка:

```bash
npm run build
```

---

<p align="center"><sub>DevPulse · Vue 3 + Pinia + FSD</sub></p>
