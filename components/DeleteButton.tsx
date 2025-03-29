'use client'

import { TrashIcon } from '@heroicons/react/16/solid'
import { deleteTask } from '@/service/actions'
import ConfirmModal from '@/components/ConfirmModal'
import { useTaskContext } from '@/app/context/TaskContext'
import { Task } from '@/dto/task.dto'

const onDelete = (currentTask: Task | null) => {
  if (currentTask) deleteTask(currentTask.id)
}

const onClickHandler = (
  currentTask: Task | null,
  setCurrentTask: (task: Task) => void,
  openConfirmModal: () => void,
) => {
  if (!currentTask) return

  setCurrentTask(currentTask)
  openConfirmModal()
}

export default function DeleteButton({ task }: { task: Task }) {
  const { isConfirmModalOpen, openConfirmModal, currentTask, setCurrentTask } =
    useTaskContext()

  return (
    <>
      <button
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
        onClick={() => onClickHandler(task, setCurrentTask, openConfirmModal)}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      {isConfirmModalOpen && (
        <ConfirmModal
          message={`Are you sure you want to delete data for ${currentTask?.id}?`}
          submitAction={() => onDelete(currentTask)}
        ></ConfirmModal>
      )}
    </>
  )
}
