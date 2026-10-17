# 🚀 ChattyApps Studio — Официальный сайт-портфолио

Минималистичный высокопроизводительный сайт-портфолио студии разработки **ChattyApps**.

Сайт разработан в строгом типографическом стиле (Apple / Vercel): чистая архитектура, темная и светлая темы, мгновенный отклик, выделенные персональные лендинги для каждого проекта и прямая интеграция с Telegram.

---

## 📁 Структура сайта

```text
chattyapps-site/
├── index.html            # Главная страница портфолио и витрина проектов
├── secondsyear.html      # Персональный лендинг SecondsYear (Android)
├── yttvaf.html           # Персональный лендинг YouTube TV Mod (Android TV)
├── antigravitytg.html    # Персональный лендинг AntigravityTG (CLI & Telegram)
├── chattywidgets.html    # Персональный лендинг ChattyWidgets (Windows Desktop .NET 8)
├── checkrename.html      # Персональный лендинг CheckRename (Windows Desktop OCR)
├── vozduh.html           # Персональный лендинг VOZDUH Glamping (MiniApp & Bot)
├── beautybot.html        # Персональный лендинг BeautyBot (CRM & Запись)
├── chattyapps.html       # Персональный лендинг ChattyApps Studio Bot & API
├── styles.css            # Минималистичная дизайн-система и адаптивные стили
├── script.js             # Контроллер тем, динамических счетчиков и аккордеонов
├── projects-data.js      # Структурированные метаданные 8 проектов
└── assets/               # Векторный логотип, иконки и скриншоты проектов
```

---

## 🌟 Представленные проекты в портфолио

В портфолио представлены все 8 ключевых разработок с выделенными лендингами:

1. **SecondsYear** (`Android & Мобильные`)
   - Нативное приложение на **Kotlin / Jetpack Compose** + **CameraX** + **Media3** для ежедневной съемки видеохроник (1s–60s) и кинематографичного аппаратного монтажа годовых роликов без водяных знаков.
   - *Страница в RuStore*: [RuStore (com.chatty.secondsyear)](https://www.rustore.ru/catalog/app/com.chatty.secondsyear).
   - *Лендинг*: `secondsyear.html` (кнопка «Открыть» → RuStore).

2. **YouTube TV Mod (com.chatty.yttvaf)** (`Android & TV`)
   - Модифицированный клиент YouTube для Android TV / Smart TV на движке Chromium/Cobalt со встроенным локальным SOCKS5-петлевым туннелем (Local loopback), Web-интерфейсом управления (`:8888`), нативным меню для пульта, **SponsorBlock** (8 категорий) и **AdBlock**.
   - *Репозиторий на GitHub*: [github.com/chattytoaster/yttvaf](https://github.com/chattytoaster/yttvaf).
   - *Лендинг*: `yttvaf.html` (кнопка «Открыть» → GitHub, кнопка «Скачать APK»).

3. **AntigravityTG** (`Telegram & Системные утилиты`)
   - Серверная система мониторинга и удаленного администрирования рабочего ПК через Telegram: Win32 IPC-мост, терминал, многоэкранные скриншоты, управление электропитанием и безопасность по whitelist Telegram ID.
   - *Репозиторий на GitHub*: [github.com/chattytoaster/AntigravityTG](https://github.com/chattytoaster/AntigravityTG).
   - *Лендинг*: `antigravitytg.html` (кнопка «Открыть» → GitHub).

4. **ChattyWidgets** (`Windows Desktop & .NET 8`)
   - Высокопроизводительный движок виджетов для рабочего стола Windows на **C# / .NET 8** с аппаратным ускорением **DirectX/WPF**, интеграцией со слоем обоев **WorkerW / Progman** (0% CPU в фоне, не сворачивается при `Win + D`), защищенным форматом пакетов `.chw` с цифровой подписью **RSA-4096**, пресетами рабочих пространств `.chwp`, сквозным кликом (`WS_EX_TRANSPARENT`) и каталогом из 12 нативных виджетов.
   - *Репозиторий на GitHub*: [github.com/chattytoaster/ChattyWidgets](https://github.com/chattytoaster/ChattyWidgets).
   - *Лендинг*: `chattywidgets.html` (кнопка «Открыть» → GitHub).

5. **CheckRename (docrename)** (`Desktop Windows & Автоматизация`)
   - Автономная Windows-утилита на **PyQt6** с двухслойным распознаванием (PDF/PyMuPDF + **Tesseract OCR**) для автоматического пакетного переименования счетов и актов без отправки файлов в интернет.
   - *Репозиторий на GitHub*: [github.com/chattytoaster/checkrename](https://github.com/chattytoaster/checkrename).
   - *Лендинг*: `checkrename.html` (кнопка «Открыть» → GitHub).

6. **VOZDUH** (`Telegram MiniApp & Бронирование`)
   - Цифровая экосистема онлайн-бронирования глэмпинга: пошаговый FSM-бот на Aiogram 3, веб-интерфейс **Telegram MiniApp**, двусторонняя синхронизация с **Google Sheets & Calendar** в реальном времени, предотвращающая овербукинг.
   - *Сайт проекта*: [vozduh.net](https://vozduh.net)
   - *Telegram-бот*: [@vozduhglampingbot](https://t.me/vozduhglampingbot)
   - *Лендинг*: `vozduh.html` (кнопка «Открыть» → Telegram-бот, кнопка «Сайт»).

7. **BeautyBot** (`CRM & Онлайн-запись`)
   - Автоматизированный бот для салонов красоты и частных мастеров с интерактивным календарем свободных слотов, расчетом времени процедур и напоминаниями для снижения неявок.
   - *Статус*: Сейчас недоступен (кнопка деактивирована).
   - *Лендинг*: `beautybot.html` (кнопка «Открыть» неактивна с подписью «сейчас недоступно»).

8. **ChattyApps Studio Bot & License Server** (`Экосистема & REST API`)
   - Флагманский бот-витрина студии с калькулятором брифа и встроенным **HTTP REST API сервером** для генерации и верификации лицензий мобильного приложения SecondsYear.
   - *Telegram-бот*: [@chattyappsbot](https://t.me/chattyappsbot)
   - *Лендинг*: `chattyapps.html` (кнопка «Открыть» → Telegram-бот).

---

## ⚡ Быстрый запуск

### Вариант 1. Без установки сервера
Просто откройте файл `index.html` в любом современном браузере.

### Вариант 2. Локальный сервер на Python
Выполните в папке проекта:
```bash
python -m http.server 8000
```
Затем откройте в браузере: [http://localhost:8000](http://localhost:8000)

---

## 🚀 Деплой на GitHub Pages

Репозиторий опубликован по адресу:
👉 **[https://github.com/chattytoaster/chattyapps-site](https://github.com/chattytoaster/chattyapps-site)**

Чтобы включить бесплатный хостинг:
1. Перейдите в **Settings** репозитория → раздел **Pages**.
2. В **Build and deployment** выберите Source: **Deploy from a branch**.
3. Выберите ветку **main** и папку `/ (root)`. Нажмите **Save**.
4. Сайт станет доступен по адресу:
   ```text
   https://chattytoaster.github.io/chattyapps-site/
   ```

---

## 🛠 Контакты студии

- Telegram: [@chtoaster](https://t.me/chtoaster)
- Официальный бот студии: [@chattyappsbot](https://t.me/chattyappsbot)
