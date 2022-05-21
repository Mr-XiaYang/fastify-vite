import { For } from 'solid-js'
import { Link } from 'solid-app-router'

export default function Index ({ state }) {
  let input
  const [{ todoList }, { addItem }] = state
  return (
    <>
      <ul>
        <For each={todoList()}>{(item, i) =>
          <li>{item}</li>
        }</For>
      </ul>
      <div>
        <input ref={input} />
        <button onClick={() => {
          addItem(input.value)
          input.value = ''
        }}>Add</button>
      </div>
      <p>
        <Link href="/other">Go to another page</Link>
      </p>
    </>
  )
}