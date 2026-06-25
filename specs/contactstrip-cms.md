# Spec — Make ContactStrip CMS-editable

**Pipeline item:** 1 of the homepage CMS-coverage gaps.
**Component:** `ContactStrip` in `src/components/home/Sections.tsx` (mounted on the homepage as Beat 5 → footer approach, via `src/pages/Index.tsx`).
**Pattern to follow:** `src/components/home/GulfSection.tsx` (already migrated) — `t("key")` static fallback wrapped in `<Editable id="section_fields:<section>:<field>">`, overlaid by published `section_fields` rows.

---

## Objective
A logged-in manager must be able to click any text in the ContactStrip — the section
kicker/title plus each of the four contact entries (Phone, Email, Hours, Address) and
their values, in both English and Arabic — and edit it in place, publish, and see it
live. Today the entire section renders from a hardcoded `CONTACT_STRIP_CONTENT` dict and
is completely uneditable.

Before that can happen, a **source-of-truth conflict** must be resolved: the component's
hardcoded dict and the existing `contactStrip` block in `src/locales/{en,ar}.json`
DISAGREE (different address, different phone formatting, different label set). The locale
files are the canonical CMS fallback layer used by every migrated section. The component
must be rewired to consume the locale keys via `t()`, not its private dict.

## Requirements
1. **Reconcile content sources.** Delete the component-local `CONTACT_STRIP_CONTENT`
   dict. Render the section from `t("contactStrip.*")` locale keys instead, matching how
   GulfSection uses `t()`.
2. **Reconcile the data shape.** The component currently renders 4 rows of
   `{label, value}`. The locale block already provides:
   `kicker, title, phone, phoneValue, email, emailValue, hours, hoursValue, address,
   addressValue`. Keep the existing 4-column visual layout (label above value). The
   `kicker` and `title` keys exist in the locale block but are NOT currently shown —
   decide with the user whether to surface them; default to NOT adding new visible UI in
   this pass (scope = make existing visible text editable). If they are surfaced, they
   must also be wrapped.
3. **Audit locale parity before wiring.** Confirm `ar.json` has every key `en.json` has
   under `contactStrip`. The AR phone/hours values currently use Western digits
   (`+965 2227 5000`, `8:00 ص`) while project convention is Eastern Arabic numerals in AR.
   Flag this to the user; do not silently convert (numerals convention is an open
   decision). If approved, the editor's `toEasternArabic` helper already handles input —
   only the seed values in `ar.json` need updating.
4. **Wrap each visible string in `<Editable>`** with id `section_fields:contactStrip:<field>`,
   using these exact field keys (match locale keys so DB overlay and t() align):
   - `section_fields:contactStrip:phone` / `:phoneValue`
   - `section_fields:contactStrip:email` / `:emailValue`
   - `section_fields:contactStrip:hours` / `:hoursValue`
   - `section_fields:contactStrip:address` / `:addressValue`
   (and `:kicker` / `:title` only if surfaced per req 2).
5. **Seed `section_fields` rows** for each field, `section_key='contactStrip'`,
   `status='draft'` (NOT published — manager publishes intentionally), `field_type='short'`
   for all (values are single-line), `value_en`/`value_ar` copied from the reconciled
   locale values, `sort_order` ascending in display order.
6. **Guard against duplicate rows.** `section_fields` has NO unique constraint. Before
   inserting, SELECT existing rows for `section_key='contactStrip'` and only insert keys
   that are missing. Never blind-insert. (Use `query_database` direct SQL only — no
   `send_message`/`enable_database`.)
7. **Bilingual + RTL integrity.** The section already switches via `useI18n`; confirm RTL
   layout (column order, text alignment) is correct when `lang==="ar"`. Email value stays
   LTR even in AR (it's a latin email address).
8. **No visual regression.** The rendered output in non-edit mode must be
   byte-equivalent to today (same layout, fonts, spacing), per the EditMode safety model
   (`<Editable>` is passthrough when edit mode is off).

## Edge cases
- Edit mode OFF → section renders identically to current (passthrough wrapper).
- A `section_fields` row exists but is `draft` → site shows the locale/`t()` fallback,
  not the draft. Verify.
- Missing AR value → `pick()` falls back to EN; ensure no blank cells.
- Mobile (<768px) → confirm the 4-column grid collapses gracefully as it does now.
- Network/Supabase failure → static `t()` content still renders (overlay is additive).

## Definition of done
- [ ] `CONTACT_STRIP_CONTENT` dict removed; component renders from `t("contactStrip.*")`.
- [ ] en/ar locale parity confirmed; numerals-convention question raised with user.
- [ ] All four label+value pairs wrapped in `<Editable>` with the exact ids above.
- [ ] `section_fields` rows seeded (draft) for every wrapped field, no duplicates
      (existing-row check performed and shown).
- [ ] Logged in + edit mode on: clicking each field opens the popover, loads current
      EN/AR, saves draft, and Publish makes it live after reload.
- [ ] Edit mode off: section is visually unchanged from current production.
- [ ] RTL correct in Arabic; email stays LTR.
- [ ] `npx tsc --noEmit` passes; `npm run build` passes.
- [ ] No push to GitHub and no DB writes beyond the seeded rows without explicit approval.

## Review rubric additions (for /review)
- Source-of-truth: is there exactly ONE content source now (locale + DB overlay), or did
  a parallel dict survive? Fail if any hardcoded contact text remains in the component.
- ID discipline: every `<Editable>` id matches `section_fields:contactStrip:<localeKey>`.
- Duplicate-row guard actually ran (show the pre-insert SELECT result).
