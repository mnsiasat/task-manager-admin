'use client'

import TaskForm from '@/components/TaskForm'
import { useTaskContext } from '@/app/context/TaskContext'

export default function NewTaskSection() {
  const { isFormOpen, openTaskForm, setCurrentTask } = useTaskContext()

  const onClickHandler = () => {
    setCurrentTask(null)
    openTaskForm()
  }

  return (
    <>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          onClick={onClickHandler}
        >
          + Add New Task
        </button>
      </div>
      {isFormOpen && <TaskForm />}
    </>
  )
}
