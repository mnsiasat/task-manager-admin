'use client'

import { PencilIcon } from '@heroicons/react/16/solid'
import { useTaskContext } from '@/app/context/TaskContext'
import { Task } from '@/dto/task.dto'

const onClickHandler = (
  task: Task,
  setCurrentTask: (task: Task) => void,
  openTaskForm: () => void,
) => {
  setCurrentTask(task)
  openTaskForm()
}

export default function EditButton({ task }: { task: Task }) {
  const { openTaskForm, setCurrentTask } = useTaskContext()

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
        onClick={() => onClickHandler(task, setCurrentTask, openTaskForm)}
      >
        <PencilIcon className="h-5 w-5" />
      </button>
    </>
  )
}
