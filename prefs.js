import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import GLib from 'gi://GLib';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class StageArcPreferences extends ExtensionPreferences {

    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        this._settings = settings;
        this._window   = window;

        window.set_default_size(620, 780);

        this._buildLayoutPage(window, settings);
        this._buildBehaviorPage(window, settings);
        this._buildAnimationPage(window, settings);
        this._buildShortcutsPage(window, settings);
    }

    // ── Page: Layout ─────────────────────────────────────────────────────────

    _buildLayoutPage(window, settings) {
        const page = new Adw.PreferencesPage({
            title: 'Layout',
            icon_name: 'view-grid-symbolic',
        });
        window.add(page);

        // ── Appearance ──
        const appearGroup = new Adw.PreferencesGroup({
            title: 'Appearance',
            description: 'Panel layout and positioning',
        });
        page.add(appearGroup);

        // Layout mode
        const modeRow = new Adw.ComboRow({
            title: 'Layout Mode',
            subtitle: 'Arc carousel or vertical stack',
            model: new Gtk.StringList({ strings: ['Arc', 'Vertical'] }),
        });
        const modeValues = ['arc', 'vertical'];
        modeRow.selected = modeValues.indexOf(settings.get_string('layout-mode'));
        modeRow.connect('notify::selected', () =>
            settings.set_string('layout-mode', modeValues[modeRow.selected])
        );
        appearGroup.add(modeRow);

        // Position
        const posRow = new Adw.ComboRow({
            title: 'Panel Position',
            subtitle: 'Which screen edge the panel slides in from',
            model: new Gtk.StringList({ strings: ['Left', 'Right', 'Bottom'] }),
        });
        const posValues = ['left', 'right', 'bottom'];
        posRow.selected = posValues.indexOf(settings.get_string('panel-position'));
        posRow.connect('notify::selected', () =>
            settings.set_string('panel-position', posValues[posRow.selected])
        );
        appearGroup.add(posRow);

        // Thumbnail size
        appearGroup.add(this._spinRow(settings, 'thumbnail-size',
            'Thumbnail Size', 'Percentage of base size (100 = default)',
            60, 150, 5));

        // Panel margin
        appearGroup.add(this._spinRow(settings, 'panel-margin',
            'Panel Margin', 'Distance from screen edge in pixels',
            0, 24, 2));

        // Angle (arc only)
        appearGroup.add(this._spinRow(settings, 'angle-step',
            'Angle Between Items', 'Arc mode — smaller values show more items',
            8, 30, 1));

        // Vertical spacing
        appearGroup.add(this._spinRow(settings, 'vert-spacing',
            'Vertical Spacing', 'Pixels between thumbnails in vertical mode',
            0, 40, 2));

        // ── Visual Elements ──
        const visualGroup = new Adw.PreferencesGroup({
            title: 'Visual Elements',
            description: 'Toggle visual features on or off',
        });
        page.add(visualGroup);

        visualGroup.add(this._switchRow(settings, 'show-panel-background',
            'Panel Background', 'Semi-transparent dark background behind the panel'));

        visualGroup.add(this._switchRow(settings, 'show-app-label',
            'App Name Labels', 'Show application name below each thumbnail'));

        visualGroup.add(this._switchRow(settings, 'highlight-active',
            'Highlight Active App', 'Blue border on the currently focused app'));

        visualGroup.add(this._switchRow(settings, 'show-window-count',
            'Window Count Badge', 'Show count on groups with multiple windows'));

        visualGroup.add(this._switchRow(settings, 'show-tooltip',
            'Window Title Tooltip', 'Show window title on hover'));

        // ── Close Button ──
        const closeGroup = new Adw.PreferencesGroup({
            title: 'Close Button',
        });
        page.add(closeGroup);

        closeGroup.add(this._switchRow(settings, 'show-close-button',
            'Show Close Button', 'Hover to reveal close button on cards'));

        const closePosRow = new Adw.ComboRow({
            title: 'Button Position',
            subtitle: 'Which corner the close button appears in',
            model: new Gtk.StringList({ strings: ['Right', 'Left'] }),
        });
        const closePosValues = ['right', 'left'];
        closePosRow.selected = closePosValues.indexOf(settings.get_string('close-button-position'));
        closePosRow.connect('notify::selected', () =>
            settings.set_string('close-button-position', closePosValues[closePosRow.selected])
        );
        closeGroup.add(closePosRow);
    }

    // ── Page: Behavior ───────────────────────────────────────────────────────

    _buildBehaviorPage(window, settings) {
        const page = new Adw.PreferencesPage({
            title: 'Behavior',
            icon_name: 'preferences-system-symbolic',
        });
        window.add(page);

        // ── Window Switching ──
        const switchGroup = new Adw.PreferencesGroup({
            title: 'Window Switching',
            description: 'How apps behave when selected from the panel',
        });
        page.add(switchGroup);

        const activateRow = new Adw.ComboRow({
            title: 'Activate Mode',
            subtitle: 'What happens when you click a thumbnail',
            model: new Gtk.StringList({ strings: [
                'Raise Only — bring to front, keep others visible',
                'Focus — bring to front and minimize others',
            ]}),
        });
        const activateValues = ['raise', 'focus'];
        activateRow.selected = activateValues.indexOf(settings.get_string('activate-mode'));
        activateRow.connect('notify::selected', () =>
            settings.set_string('activate-mode', activateValues[activateRow.selected])
        );
        switchGroup.add(activateRow);

        // ── Panel Behavior ──
        const panelGroup = new Adw.PreferencesGroup({
            title: 'Panel Behavior',
        });
        page.add(panelGroup);

        panelGroup.add(this._switchRow(settings, 'persistent-mode',
            'Persistent Mode', 'Keep panel visible when edge area is clear of windows'));

        panelGroup.add(this._spinRow(settings, 'hide-delay',
            'Hide Delay', 'Milliseconds before the panel hides after mouse leaves',
            100, 2000, 50));

        panelGroup.add(this._spinRow(settings, 'scroll-speed',
            'Scroll Speed', '1 = slowest, 20 = fastest',
            1, 20, 1));

        panelGroup.add(this._spinRow(settings, 'max-recent-groups',
            'Max Recent Groups', 'Maximum number of app groups shown in sidebar',
            3, 12, 1));

        // ── Multi-Monitor ──
        const monitorGroup = new Adw.PreferencesGroup({
            title: 'Multi-Monitor',
            description: 'How Stage Manager works with multiple displays',
        });
        page.add(monitorGroup);

        const multiMonRow = new Adw.ComboRow({
            title: 'Monitor Mode',
            subtitle: 'Single panel for all monitors or separate per display',
            model: new Gtk.StringList({ strings: [
                'Single — one panel controls all monitors',
                'Separate — each monitor has its own panel',
            ]}),
        });
        const multiMonValues = ['single', 'separate'];
        multiMonRow.selected = multiMonValues.indexOf(settings.get_string('multi-monitor-mode'));
        multiMonRow.connect('notify::selected', () =>
            settings.set_string('multi-monitor-mode', multiMonValues[multiMonRow.selected])
        );
        monitorGroup.add(multiMonRow);
    }

    // ── Page: Animation ──────────────────────────────────────────────────────

    _buildAnimationPage(window, settings) {
        const page = new Adw.PreferencesPage({
            title: 'Animation',
            icon_name: 'media-playback-start-symbolic',
        });
        window.add(page);

        const animGroup = new Adw.PreferencesGroup({
            title: 'Animation Settings',
            description: 'Control animation speed and card appearance',
        });
        page.add(animGroup);

        animGroup.add(this._spinRow(settings, 'animation-speed',
            'Animation Speed', '50 = fast, 100 = normal, 200 = slow',
            50, 200, 10));

        animGroup.add(this._spinRow(settings, 'inactive-tilt',
            'Inactive Card Tilt', 'Perspective tilt angle for inactive cards (0 = flat)',
            0, 15, 1));

        animGroup.add(this._spinRow(settings, 'inactive-scale',
            'Inactive Card Scale', 'Size percentage for inactive cards (100 = same as active)',
            70, 100, 1));
    }

    // ── Page: Shortcuts ──────────────────────────────────────────────────────

    _buildShortcutsPage(window, settings) {
        const page = new Adw.PreferencesPage({
            title: 'Shortcuts',
            icon_name: 'input-keyboard-symbolic',
        });
        window.add(page);

        const keysGroup = new Adw.PreferencesGroup({
            title: 'Keyboard Shortcuts',
            description: 'Click Set to record a shortcut, or Clear to disable it.',
        });
        page.add(keysGroup);

        [
            { key: 'keybinding-toggle',   title: 'Toggle Panel',           subtitle: 'Open or close the carousel' },
            { key: 'keybinding-next',      title: 'Navigate Next',          subtitle: 'Scroll carousel forward' },
            { key: 'keybinding-prev',      title: 'Navigate Previous',      subtitle: 'Scroll carousel backward' },
            { key: 'keybinding-activate',  title: 'Activate Centered Item', subtitle: 'Switch to the app in the center' },
            { key: 'keybinding-close',     title: 'Close Focused Window',   subtitle: 'Close the first window of the centered app' },
        ].forEach(({ key, title, subtitle }) =>
            keysGroup.add(this._makeKeybindingRow(key, title, subtitle))
        );
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    _switchRow(settings, key, title, subtitle) {
        const row = new Adw.SwitchRow({ title, subtitle });
        row.active = settings.get_boolean(key);
        row.connect('notify::active', () => settings.set_boolean(key, row.active));
        return row;
    }

    _spinRow(settings, key, title, subtitle, lower, upper, step) {
        const row = new Adw.SpinRow({
            title, subtitle,
            adjustment: new Gtk.Adjustment({
                lower, upper, step_increment: step,
                value: settings.get_int(key),
            }),
        });
        row.connect('notify::value', () => settings.set_int(key, row.value));
        return row;
    }

    _makeKeybindingRow(settingKey, title, subtitle) {
        const row = new Adw.ActionRow({ title, subtitle });

        const accelLabel = new Gtk.ShortcutLabel({
            valign: Gtk.Align.CENTER,
            disabled_text: 'Disabled',
        });
        const current = this._settings.get_strv(settingKey)[0] ?? '';
        accelLabel.set_accelerator(current);

        const setBtn = new Gtk.Button({
            label: 'Set',
            valign: Gtk.Align.CENTER,
            css_classes: ['flat'],
        });

        const clearBtn = new Gtk.Button({
            label: 'Clear',
            valign: Gtk.Align.CENTER,
            css_classes: ['flat', 'destructive-action'],
        });

        this._settings.connect(`changed::${settingKey}`, () => {
            const val = this._settings.get_strv(settingKey)[0] ?? '';
            accelLabel.set_accelerator(val);
        });

        clearBtn.connect('clicked', () => {
            this._settings.set_strv(settingKey, ['']);
            accelLabel.set_accelerator('');
        });

        setBtn.connect('clicked', () => this._captureKeybinding(settingKey, accelLabel));

        row.add_suffix(accelLabel);
        row.add_suffix(setBtn);
        row.add_suffix(clearBtn);

        return row;
    }

    _captureKeybinding(settingKey, accelLabel) {
        const dialog = new Adw.MessageDialog({
            heading: 'Set Shortcut',
            body: 'Press the key combination you want to use.\nPress Escape to cancel.',
            transient_for: this._window,
            modal: true,
        });
        dialog.add_response('cancel', 'Cancel');

        const hint = new Gtk.Label({
            label: '<span size="large">Waiting for key\u2026</span>',
            use_markup: true,
            margin_top: 8, margin_bottom: 4,
        });
        dialog.set_extra_child(hint);

        const controller = new Gtk.EventControllerKey();
        dialog.add_controller(controller);

        controller.connect('key-pressed', (_ctrl, keyval, _keycode, state) => {
            if (keyval === Gdk.KEY_Escape) {
                dialog.close();
                return Gdk.EVENT_STOP;
            }

            const modOnly = [
                Gdk.KEY_Control_L, Gdk.KEY_Control_R,
                Gdk.KEY_Shift_L,   Gdk.KEY_Shift_R,
                Gdk.KEY_Alt_L,     Gdk.KEY_Alt_R,
                Gdk.KEY_Super_L,   Gdk.KEY_Super_R,
                Gdk.KEY_Meta_L,    Gdk.KEY_Meta_R,
                Gdk.KEY_Hyper_L,   Gdk.KEY_Hyper_R,
            ];
            if (modOnly.includes(keyval)) return Gdk.EVENT_PROPAGATE;

            const mask  = state & Gtk.accelerator_get_default_mod_mask();
            const accel = Gtk.accelerator_name(keyval, mask);

            if (accel) {
                this._settings.set_strv(settingKey, [accel]);
                accelLabel.set_accelerator(accel);
                hint.set_label(`<span size="large"><b>${accel}</b></span>`);
            }

            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 400, () => {
                dialog.close();
                return GLib.SOURCE_REMOVE;
            });

            return Gdk.EVENT_STOP;
        });

        dialog.present();
    }
}
