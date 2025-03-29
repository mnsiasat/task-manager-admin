import './globals.css'
import NewTaskSection from '@/components/NewTaskSection'
import TaskList from '@/components/TaskList'
import SummaryCards from '@/components/SummaryCards'

export default async function Home() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Task Manager Admin</h1>
      <SummaryCards />
      <NewTaskSection />
      <TaskList />
    </div>
  )
}
