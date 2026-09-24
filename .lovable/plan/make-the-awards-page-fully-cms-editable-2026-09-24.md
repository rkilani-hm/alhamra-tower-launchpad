# Make the Awards page fully CMS-editable

## Page content
- Connect the complete Awards page content model to the existing CMS overlay instead of reading directly from fixed constants.
- Make all headings, descriptions, statistics, engineering facts, press entries, award details, labels, and captions editable in both English and Arabic.
- Keep the current wording and visual design as the initial fallback content.

## Images
- Keep every displayed photograph and trophy connected to an editable media slot.
- Give each engineering image and each award image its own stable slot so changing one does not unintentionally replace another.
- Allow awards currently shown as certificate graphics to receive uploaded images through the CMS as well.

## Repeated content
- Connect award records to the existing `awards` CMS table and editing controls.
- Preserve filtering, timeline behavior, and detail popups while ensuring edits appear consistently in every view.
- Connect press items and engineering facts through editable page fields without changing their layout or links.

## Verification
- Check the page in admin edit mode and confirm every visible content group exposes editing controls.
- Confirm image replacement controls appear for all page images.
- Verify the page builds and the public non-editing view remains unchanged.
