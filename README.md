# NexStage — Stage Manager for GNOME

[![GNOME Shell 46–50](https://img.shields.io/badge/GNOME%20Shell-46%E2%80%9350-4A86CF?logo=gnome&logoColor=white)](https://www.gnome.org/)
[![License: GPL-3.0+](https://img.shields.io/badge/License-GPL--3.0%2B-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Built by NexVar](https://img.shields.io/badge/built%20by-NexVar-0a0a0a?labelColor=000)](https://nexvar.io)
[![Wayland Ready](https://img.shields.io/badge/Wayland-ready-success)](#)
[![X11 Compatible](https://img.shields.io/badge/X11-compatible-success)](#)

**Bring macOS Stage Manager to your GNOME desktop — with personality.**

NexStage is a window organizer for GNOME Shell that puts your open apps in a beautiful side carousel of live thumbnails. Click to focus, scroll to navigate, drag to reorder, right-click for options. Two layouts (arc-curve or vertical), two behavior modes (raise-only or minimize-others), full multi-monitor support, smooth animations, badges, tilt-on-inactive depth — and a 4-tab preferences window so every detail is yours.

> Built at **[NexVar](https://nexvar.io)** by **[Mert Ali Dalkır](https://mertdlkr.com)** — focused workspace tooling for the GNOME desktop.

---

## Why NexStage?

GNOME has Activities Overview. macOS has Stage Manager. NexStage gives you both at once — an always-available sidebar of live window thumbnails that doesn't interrupt your flow. Switch apps without leaving your task. Keep your most-used windows one glance away. Arrange them how you like.

- **Live thumbnails** — see actual window content, not just icons
- **Arc carousel layout** — beautiful curved arrangement (or vertical if you prefer)
- **Smooth animations** — 60 fps Clutter transitions, no jank
- **Multi-monitor** — sidebar can follow focus or be per-display
- **Persistent or auto-hide** — your call
- **Wayland & X11** — both work end-to-end

---

## Features

| Feature | Detail |
|---|---|
| **Layouts** | Arc carousel or vertical list |
| **Position** | Left, right, or bottom of screen |
| **Modes** | Raise-only (focus without minimizing) or minimize-others (single-window stage) |
| **Live thumbnails** | Actual window content, updates in real time |
| **Highlight** | Active app gets a subtle accent; inactive lean for depth |
| **Multi-monitor** | Per-monitor or follow-focus |
| **Reserve space** | Maximized windows avoid the sidebar |
| **Persistent panel** | Always visible, or auto-hide on idle |
| **Hide delay** | Configurable timing |
| **Max groups** | Limit visible app count |
| **Drag reorder** | Rearrange your stage |
| **Badges** | Window count per app |
| **Tooltips** | Hover for window title |
| **Close button** | Optional per-thumbnail |
| **Custom shortcuts** | Toggle, navigate, activate, close |

---

## Install

### Option A — extensions.gnome.org (recommended, once approved)

```sh
# Search "NexStage" on extensions.gnome.org and click Install
# Or via CLI:
gnome-extensions install --enable nexstage@nexvar
```

> ⚠️ Pending review by GNOME extension reviewers. Until approved, use Option B.

### Option B — Manual install from source

```sh
git clone https://github.com/NexVar/NexStage.git
cd NexStage
make install
# Log out → log in (Wayland needs a session restart)
gnome-extensions enable nexstage@nexvar
gnome-extensions prefs nexstage@nexvar
```

### Option C — Pack a zip yourself

```sh
make pack       # produces nexstage@nexvar.shell-extension.zip
```

Then upload via [extensions.gnome.org/upload](https://extensions.gnome.org/upload/) for review, or install locally with `gnome-extensions install ./nexstage@nexvar.shell-extension.zip`.

---

## Controls

| Input | Action |
|---|---|
| **Click** | Bring app to front |
| **Middle click** | Close window |
| **Right click** | Context menu |
| **Scroll** | Navigate groups |
| **Drag** | Reorder thumbnails |
| **Hover** | Show window title |

All keyboard shortcuts are remappable from the **Shortcuts** page in preferences.

---

## Preferences (4 pages)

1. **Layout** — Arc or vertical mode, panel position (left / right / bottom), thumbnail size, margin, spacing, and toggles for labels, close button, badge, tooltip, highlight.
2. **Behavior** — Raise-only or minimize-others mode, persistent panel, reserve screen space (maximized windows avoid the sidebar), hide delay, max groups, multi-monitor mode.
3. **Animation** — Speed, inactive card tilt, inactive card scale.
4. **Shortcuts** — Toggle, navigate, activate, close.

---

## Architecture

```
nexstage@nexvar/
├── metadata.json    # shell-version: 46, 47, 48, 49, 50
├── extension.js     # enable/disable; sidebar mount, window tracking,
│                    # WindowGroup management, monitor changes
├── prefs.js         # Adw 4-page preferences window
├── schemas/
│   └── org.gnome.shell.extensions.nexstage.gschema.xml
├── LICENSE          # GPL-3.0+
└── README.md
```

---

## Requirements

**Required:**
- GNOME Shell 46, 47, 48, 49, or 50
- GLib, GTK 4, Adwaita (already required by shell)

**Compositor compatibility:** Wayland and X11 both supported.

---

## Contributing

PRs welcome. NexStage follows a small, opinionated style:

- Pure ES modules, no build step (GNOME loads `.js` directly)
- Settings keys live in `schemas/*.gschema.xml`, accessed via `Gio.Settings`
- All animation goes through Clutter transitions — no external libs
- No npm, no node_modules, no transpiler — keeps the install zip tiny

Run `make logs` to tail GNOME Shell logs while developing.

---

## Built By

### [NexVar](https://nexvar.io)

AI-first software studio shipping production tooling, AI platforms, and developer infrastructure. NexStage is part of our GNOME desktop suite — focused workspace tools for people who live in their terminals and IDEs.

[![Website](https://img.shields.io/badge/nexvar.io-000?style=flat&logo=safari&logoColor=white)](https://nexvar.io)
[![GitHub](https://img.shields.io/badge/NexVar-181717?style=flat&logo=github&logoColor=white)](https://github.com/NexVar)

### [Mert Ali Dalkır](https://mertdlkr.com)

Creator and maintainer. Co-founder of NexVar. Builder of useful, well-engineered desktop tooling for Linux.

[![Website](https://img.shields.io/badge/mertdlkr.com-000?style=flat&logo=safari&logoColor=white)](https://mertdlkr.com)
[![X](https://img.shields.io/badge/@mertdlkr-000?style=flat&logo=x&logoColor=white)](https://x.com/mertdlkr)
[![LinkedIn](https://img.shields.io/badge/mertdlkr-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mertdlkr/)
[![GitHub](https://img.shields.io/badge/mertdlkr-181717?style=flat&logo=github&logoColor=white)](https://github.com/mertdlkr)

---

## See Also

- **[NexNotch](https://github.com/NexVar/NexNotch)** — Dynamic Island for GNOME (top-bar hover hub: system, calendar, weather, pomodoro, notes, shelf)
- **[NexGSD](https://github.com/NexVar/NexGSD)** — AI agent framework for autonomous project execution

---

## License

GPL-3.0-or-later © [NexVar](https://nexvar.io) and [Mert Ali Dalkır](https://mertdlkr.com)

See [LICENSE](LICENSE) for the full text.

---

**If NexStage makes your GNOME workflow better, give it a star.** It helps others find it.

Built with conviction at [nexvar.io](https://nexvar.io) and [mertdlkr.com](https://mertdlkr.com).

<!--
Discoverability keywords (for GitHub search and AI indexing):
gnome extension, gnome shell extension, gnome 46, gnome 47, gnome 48, gnome 49, gnome 50,
stage manager linux, stage manager gnome, macos stage manager, mac stage manager,
window switcher, window organizer, window manager, application switcher,
linux desktop customization, linux productivity, gnome customize, gnome theming,
ricing linux, linux ui, gnome ui, wayland extension, x11 extension,
adwaita, libadwaita, gjs, st widget, clutter, animation,
sidebar, dock alternative, gnome dock, app launcher, taskbar, taskbar alternative,
multi-monitor, fedora extension, ubuntu extension, arch linux extension, hyprland alternative,
nexstage, nexvar, mertdlkr
-->
