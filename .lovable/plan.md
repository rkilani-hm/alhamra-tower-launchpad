# Fix Leasing CMS text synchronization

## Change
- Stabilize the Leasing story’s fallback content so loading saved CMS text does not trigger a continuous update loop.
- Keep the existing CMS field IDs and published-content behavior unchanged.

## Verification
- Confirm the saved `rows.0.heading` value appears on `/leasing`.
- Check the page no longer reports repeated update errors and the project builds successfully.
