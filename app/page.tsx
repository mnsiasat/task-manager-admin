import './globals.css'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import NewTaskSection from '@/components/NewTaskSection'
import TaskList from '@/components/TaskList'
import SummaryCards from '@/components/SummaryCards'
import AuthButtons from '@/components/AuthButtons'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Task Manager Admin</h1>
      <SummaryCards />
      <NewTaskSection />
      <TaskList />
      <AuthButtons />
    </div>
  )
}