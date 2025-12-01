import { getTodos } from '@/app/actions/get-todos'
import TodoList from './components/todo-list'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const todos = await getTodos()
  return <TodoList todos={todos} />
}
