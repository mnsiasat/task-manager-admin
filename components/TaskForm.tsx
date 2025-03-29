'use client'

import { saveTask } from '@/service/actions'
import { useFormStatus } from 'react-dom'
import { useTaskContext } from '@/app/context/TaskContext'
import { Status } from '@/dto/task.dto'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
      disabled={pending}
    >
      {pending ? 'Submitting ... ' : 'Submit'}
    </button>
  )
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>, closeModal: () => void) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  saveTask(formData)
  closeModal()
}

export default function TaskForm() {
  const { isFormOpen, closeTaskForm, currentTask } = useTaskContext()

  if (!isFormOpen) return null

  const statusOptions = Object.values(Status)

  return (
    <div className="fixed inset-0 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <form onSubmit={(e) => handleSubmit(e, closeTaskForm)}>
          <label className="block mb-2">
            ID:
            <input
              type="string"
              name="id"
              value={currentTask?.id ?? undefined}
              className="w-full p-2 border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed rounded-lg overflow-x-auto"
              readOnly
            />
          </label>
          <label className="block mb-2">
            Title:
            <input
              type="string"
              name="title"
              defaultValue={currentTask?.title ?? undefined}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Description:
            <input
              type="string"
              name="description"
              defaultValue={currentTask?.description ?? undefined}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          {currentTask?.id && (
            <label className="block mb-2">
              Status:
              <div className="relative w-full max-w-sm">
                <select
                  name="status"
                  defaultValue={currentTask?.status ?? undefined}
                  className="w-full appearance-none border border-gray-300 bg-white rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a status...
                  </option>
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">⌄</div>
              </div>
            </label>
          )}
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={closeTaskForm}
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
