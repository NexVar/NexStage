---
description: Set the preferred model profile in MertGSD project settings
---

# MertGSD Set Profile

Store the preferred profile in `.planning/mertgsd-config.json`.

## Steps

1. Read the current config.
2. Set or update a `model_profile` field.
3. If the user did not specify one, offer sensible options such as:
   - fast
   - balanced
   - deep
4. Keep the rest of the config untouched.

## Completion

Report the active profile and where it was saved.
