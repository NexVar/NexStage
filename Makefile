UUID    := nexstage@nexvar
PREFIX  := $(HOME)/.local/share/gnome-shell/extensions
DEST    := $(PREFIX)/$(UUID)
FILES   := metadata.json extension.js prefs.js schemas

.PHONY: all compile-schemas install uninstall pack reload enable disable logs clean

all: compile-schemas

compile-schemas:
	glib-compile-schemas schemas/

install: compile-schemas
	mkdir -p "$(DEST)"
	cp -r $(FILES) "$(DEST)/"

uninstall:
	rm -rf "$(DEST)"

pack:
	rm -f $(UUID).shell-extension.zip schemas/gschemas.compiled
	gnome-extensions pack \
	    --extra-source=README.md \
	    --extra-source=LICENSE \
	    --schema=schemas/org.gnome.shell.extensions.nexstage.gschema.xml \
	    --force
	@echo "Built $(UUID).shell-extension.zip"

enable:
	gnome-extensions enable $(UUID)

disable:
	gnome-extensions disable $(UUID)

reload: install
	@echo "Log out / log in (Wayland) or press Alt+F2 → r (X11) to reload GNOME Shell."

logs:
	journalctl -f -o cat /usr/bin/gnome-shell

clean:
	rm -f schemas/gschemas.compiled
	rm -f $(UUID).shell-extension.zip
