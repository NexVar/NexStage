# extensions.gnome.org submission brief

## Package

```sh
make pack      # produces nexstage@nexvar.shell-extension.zip
```

Verify the zip contains: `metadata.json`, `extension.js`, `prefs.js`, `LICENSE`, `README.md`, `schemas/org.gnome.shell.extensions.nexstage.gschema.xml`.

## Upload form

### Name

NexStage — Stage Manager for GNOME

### Tagline (short)

macOS-style Stage Manager for GNOME. Sidebar of live window thumbnails — arc or vertical, multi-monitor, smooth animations.

### Description (long — paste into e.g.o form)

NexStage brings the macOS Stage Manager experience to your GNOME desktop. A sidebar of live window thumbnails sits at the screen edge, showing your open apps with real-time content previews. Click to focus, scroll to navigate, drag to reorder, right-click for options.

**Layouts**
- **Arc carousel** — beautiful curved arrangement (signature look)
- **Vertical list** — clean stacked layout

**Behavior modes**
- **Raise-only** — bring app forward without minimizing others
- **Minimize-others** — single-window stage, classic Stage Manager feel

**Live thumbnails**
- Real-time window content (not just app icons)
- Active app highlighted with a subtle accent
- Inactive apps lean for depth perception
- Optional badges showing window count per app

**Layout & position**
- Left, right, or bottom of screen
- Multi-monitor: per-monitor or follow-focus
- Reserve screen space (maximized windows avoid the sidebar)
- Persistent or auto-hide on idle, configurable hide delay

**Customization (4-tab Adw preferences)**
1. **Layout** — Arc/vertical mode, position, thumbnail size, spacing, label/close-button/badge/tooltip toggles
2. **Behavior** — raise-only/minimize-others, persistence, hide delay, max groups, multi-monitor mode
3. **Animation** — Speed, inactive card tilt angle, inactive card scale
4. **Shortcuts** — Toggle, navigate, activate, close — all remappable

**Compositor support**
Wayland and X11 both supported, single or multi-monitor.

**Lightweight**
- Pure GJS / Clutter — no external dependencies, no Electron, no npm
- Animations run on GPU via Clutter transitions
- Modules cleanly stop when disabled — no background polling

**Network calls:** none.

### Screenshot suggestions

Take these with the extension installed, at 1× display scale:

1. **Arc layout** with 4–5 apps in the sidebar, one focused
2. **Vertical layout** as alternative
3. **Sidebar with badge** showing multi-window app
4. **Right-click context menu** on a thumbnail
5. **Preferences → Layout page**
6. **Preferences → Animation page** (tilt/scale sliders)
7. **Multi-monitor** showing per-monitor sidebars
8. **Auto-hide** state — sidebar pulled in

### License

GPL-3.0-or-later (see `LICENSE`).

### Reviewer notes

- No network calls. No external commands spawned.
- All settings persisted via `Gio.Settings` from the bundled schema.
- Window tracking uses `global.display` and `Shell.WindowTracker` — standard GNOME Shell APIs, no GIRepository tricks.
- Cleanup on `disable()` is exhaustive — every signal/timeout connection is tracked and disconnected.
- Animations are pure Clutter — no `setTimeout`/`setInterval`, just GLib timeouts that are killed on disable.
