# Decimal Phase Calculation

Calculate the next decimal phase number for urgent insertions.

## Calculating Next Decimal Phase

```bash
# Get next decimal phase after a given phase number
AFTER_PHASE="6"
PADDED=$(printf "%02d" "$AFTER_PHASE")

# Find existing decimal phases
EXISTING=$(ls -d .planning/phases/${PADDED}.* 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | sort -t. -k2 -n)

if [ -z "$EXISTING" ]; then
  DECIMAL_PHASE="${PADDED}.1"
else
  LAST_DECIMAL=$(echo "$EXISTING" | tail -1 | cut -d. -f2)
  NEXT_DECIMAL=$((LAST_DECIMAL + 1))
  DECIMAL_PHASE="${PADDED}.${NEXT_DECIMAL}"
fi
echo "Next decimal phase: $DECIMAL_PHASE"
```

## Extract Values

```bash
PADDED=$(printf "%02d" "${AFTER_PHASE}")
EXISTING=$(ls -d .planning/phases/${PADDED}.* 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | sort -t. -k2 -n)
if [ -z "$EXISTING" ]; then
  DECIMAL_PHASE="${PADDED}.1"
else
  LAST_DECIMAL=$(echo "$EXISTING" | tail -1 | cut -d. -f2)
  DECIMAL_PHASE="${PADDED}.$((LAST_DECIMAL + 1))"
fi
BASE_PHASE="$PADDED"
```

## Examples

| Existing Phases | Next Phase |
|-----------------|------------|
| 06 only | 06.1 |
| 06, 06.1 | 06.2 |
| 06, 06.1, 06.2 | 06.3 |
| 06, 06.1, 06.3 (gap) | 06.4 |

## Directory Naming

Decimal phase directories use the full decimal number:

```bash
SLUG=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//' | cut -c1-30)
PHASE_DIR=".planning/phases/${DECIMAL_PHASE}-${SLUG}"
mkdir -p "$PHASE_DIR"
```

Example: `.planning/phases/06.1-fix-critical-auth-bug/`
