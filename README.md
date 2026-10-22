# zag tooltip: first hover lost after `disabled` goes true → false

Minimal reproduction for `@zag-js/tooltip` 1.46.0 with `@zag-js/react` 1.46.0 (no Ark UI).

Run it with `npm install && npm run dev`, or open it in StackBlitz.

## Steps

Press <kbd>D</kbd> anywhere to toggle `disabled`. A keyboard toggle lets `disabled` change while the pointer stays on the trigger.

1. Hover "Hover me" until the tooltip opens.
2. Keep the pointer on the button and press <kbd>D</kbd>. The tooltip closes (`disabled: true`).
3. Move the pointer off the button.
4. Press <kbd>D</kbd> again (`disabled: false`).
5. Hover the button. **Nothing opens.** The panel shows that `context.hasPointerMoveOpened` is still set.
6. Move off and hover again. Now the tooltip opens.

The same happens if <kbd>Escape</kbd> closes the tooltip in step 2 before you press <kbd>D</kbd>.

**Reset example** remounts the tooltip.

## Expected

In step 5 the tooltip opens, the same as for a tooltip that was never disabled.
