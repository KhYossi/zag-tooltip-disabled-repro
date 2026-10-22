import { normalizeProps, useMachine } from "@zag-js/react"
import * as tooltip from "@zag-js/tooltip"
import { useEffect, useId, useState } from "react"

export default function App() {
  const [disabled, setDisabled] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  // A keyboard toggle lets `disabled` change while the pointer stays on the
  // trigger, which is what a keyboard shortcut or a layout change does in an app.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.key.toLowerCase() !== "d") return
      setDisabled((value) => !value)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <main>
      <h1>
        Tooltip: first hover lost after <code>disabled</code> goes true → false
      </h1>
      <p>
        Press <kbd>D</kbd> anywhere to toggle <code>disabled</code>.
      </p>
      <ol>
        <li>Hover "Hover me" until the tooltip opens.</li>
        <li>
          Keep the pointer on the button and press <kbd>D</kbd>. The tooltip closes (<code>disabled: true</code>).
        </li>
        <li>Move the pointer off the button.</li>
        <li>
          Press <kbd>D</kbd> again (<code>disabled: false</code>).
        </li>
        <li>
          Hover the button. <strong>Nothing opens</strong>, and <code>hasPointerMoveOpened</code> is still set.
        </li>
        <li>Move off and hover again. Now the tooltip opens.</li>
      </ol>
      <p>
        Same result if <kbd>Escape</kbd> closes the tooltip in step 2 before you press <kbd>D</kbd>.
      </p>

      <TooltipDemo key={resetKey} disabled={disabled} />

      <button
        type="button"
        onClick={() => {
          setDisabled(false)
          setResetKey((value) => value + 1)
        }}
      >
        Reset example
      </button>
    </main>
  )
}

function TooltipDemo({ disabled }: { disabled: boolean }) {
  const service = useMachine(tooltip.machine, { id: useId(), disabled })
  const api = tooltip.connect(service, normalizeProps)

  return (
    <section>
      <div className="demo">
        <button {...api.getTriggerProps()}>Hover me</button>
        {api.open && (
          <div {...api.getPositionerProps()}>
            <div {...api.getContentProps()} className="tip">
              Tooltip
            </div>
          </div>
        )}
      </div>
      <dl>
        <dt>disabled</dt>
        <dd>{String(disabled)}</dd>
        <dt>state</dt>
        <dd>{service.state.get()}</dd>
        <dt>context.hasPointerMoveOpened</dt>
        <dd>{JSON.stringify(service.context.get("hasPointerMoveOpened"))}</dd>
      </dl>
    </section>
  )
}
