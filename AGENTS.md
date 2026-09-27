# Project Architecture Rules

- Visible bilingual page copy must use the existing Content Studio primitives (`usePageContent` plus `Editable`/`EditableRow`) with matching stable page keys, because saved English and Arabic values must render through the same field identifiers used for editing.
- Fallback objects passed to `usePageContent` must have stable references, using module constants or `useMemo`, because fresh objects can reset saved content overlays during rendering.
