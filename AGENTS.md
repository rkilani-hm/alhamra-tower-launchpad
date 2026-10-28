# Project Architecture Rules

- Visible bilingual page copy must use the existing Content Studio primitives (`usePageContent` plus `Editable`/`EditableRow`) with matching stable page keys, because saved English and Arabic values must render through the same field identifiers used for editing.
- Fallback objects passed to `usePageContent` must have stable references, using module constants or `useMemo`, because fresh objects can reset saved content overlays during rendering.
- Website search uses a public-page text capture plus fresh published-only CMS reads; keep its canonical destinations limited to discoverable public pages, exclude staff/hidden pages, and refresh the capture when changing static page content so results match the website.
