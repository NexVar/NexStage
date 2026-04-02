# Mert Stage Manager

Window organizer for GNOME Shell. Switch between apps from a sidebar with live thumbnails, smooth animations, and a right-click menu.

Built from scratch for GNOME 46–49.

## What it does

A sidebar appears at the screen edge showing your open apps as live thumbnails. Click one to bring it forward. Right-click for options. Hover to see the window title. The active app gets a subtle highlight, inactive ones lean slightly for depth.

Works on Wayland and X11. Single or multi-monitor.

## Install

```bash
git clone https://github.com/mertdlkr/mertstagemanager.git
cd mertstagemanager
mkdir -p ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr
cp extension.js prefs.js metadata.json ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/
cp -r schemas ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/
glib-compile-schemas ~/.local/share/gnome-shell/extensions/mertstagemanager@mertdlkr/schemas/
```

Log out, log back in, then:

```bash
gnome-extensions enable mertstagemanager@mertdlkr
```

## Settings

Open from the Extensions app. Four tabs:

**Layout** — Arc or vertical mode, panel position (left/right/bottom), thumbnail size, margin, spacing, and toggles for labels, close button, badge, tooltip, highlight.

**Behavior** — Raise-only or minimize-others mode, persistent panel, reserve screen space (maximized windows avoid the sidebar), hide delay, max groups, multi-monitor mode.

**Animation** — Speed, inactive card tilt, inactive card scale.

**Shortcuts** — Toggle, navigate, activate, close.

## Controls

| Input | Action |
|-------|--------|
| Click | Bring app to front |
| Middle click | Close window |
| Right click | Context menu |
| Scroll | Navigate groups |
| Drag | Reorder |

## Requirements

GNOME Shell 46, 47, 48, or 49.

## License

GPL-3.0
