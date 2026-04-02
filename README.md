# Mert Stage Manager

A macOS-inspired Stage Manager for GNOME Shell. Organize your windows with a sleek sidebar that shows live thumbnails of your running apps.

## Features

- **Arc & Vertical layouts** — choose between a curved carousel or a clean vertical stack
- **Live thumbnails** — real-time window previews in the sidebar
- **macOS-style animations** — cascade entrance, bounce transitions, smooth group switching
- **Inactive card tilt** — non-active groups lean slightly for visual depth
- **Close button** — hover to reveal, configurable position (left/right)
- **App name labels** — crisp, counter-scaled text that stays sharp at any zoom
- **Window count badge** — shows how many windows a group has
- **Window title tooltip** — hover to see the focused window's title
- **Right-click context menu** — Minimize/Unminimize, Always on Top, Close, Close All, Minimize All, Ungroup
- **Active app highlight** — subtle blue border on the focused app
- **Reserve screen space** — maximized windows won't overlap the sidebar (macOS-style)
- **Persistent mode** — panel stays visible when the edge area is clear
- **Multi-monitor** — single panel for all monitors (default) or separate per display
- **Keyboard shortcuts** — toggle, navigate, activate, close
- **Drag to reorder** — rearrange groups by dragging
- **Drag to merge** — drag a group onto the active window to merge them
- **Performance optimized** — idle-priority polling, fast-path skips when hidden

## Installation

```bash
git clone https://github.com/mertdlkr/mertstagemanager.git
cd mertstagemanager
mkdir -p ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr
cp extension.js prefs.js metadata.json ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/
cp -r schemas ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/
glib-compile-schemas ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/schemas/
```

Log out and log back in, then enable:

```bash
gnome-extensions enable mertstagemanager@mertdlkr
```

## Configuration

Open the extension preferences from GNOME Extensions app. Settings are organized into 4 pages:

### Layout
| Setting | Description |
|---------|-------------|
| Layout Mode | Arc carousel or vertical stack |
| Panel Position | Left, right, or bottom edge |
| Thumbnail Size | 60%–150% of base size |
| Panel Margin | Distance from screen edge |
| Angle Between Items | Arc mode spacing |
| Vertical Spacing | Gap between thumbnails in vertical mode |

### Behavior
| Setting | Description |
|---------|-------------|
| Activate Mode | Raise only (keep others) or Focus (minimize others) |
| Persistent Mode | Keep panel visible when edge is clear |
| Reserve Screen Space | Maximized windows avoid the sidebar |
| Hide Delay | How long before panel hides (100–2000ms) |
| Max Recent Groups | Limit sidebar groups (3–12) |
| Multi-Monitor Mode | Single panel or separate per display |

### Animation
| Setting | Description |
|---------|-------------|
| Animation Speed | 50% (fast) to 200% (slow) |
| Inactive Card Tilt | 0–15 degrees of lean |
| Inactive Card Scale | 70%–100% size |

### Shortcuts
Configurable keyboard shortcuts for toggle, navigate, activate, and close.

## Mouse Controls

| Action | Effect |
|--------|--------|
| Left click | Activate the app group |
| Middle click | Close the front window |
| Right click | Context menu |
| Scroll | Navigate between groups |
| Drag | Reorder groups |
| Drag to desktop | Merge with active window |

## Requirements

- GNOME Shell 46, 47, 48, or 49
- Wayland or X11

## License

GPL-3.0
