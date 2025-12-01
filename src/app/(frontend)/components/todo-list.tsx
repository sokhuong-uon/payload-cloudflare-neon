import { Todo } from '@/payload-types'

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.length > 0 ? (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h1>{todo.name}</h1>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No todos found</div>
      )}
    </>
  )
}
