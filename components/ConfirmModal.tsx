'use client'

import { useTaskContext } from '@/app/context/TaskContext'

const handleSubmit = (submitAction: () => void, closeConfirmModal: () => void) => {
  submitAction()
  closeConfirmModal()
}

export default function ConfirmModal({
  message,
  submitAction,
}: {
  message: string
  submitAction: () => void
}) {
  const { isConfirmModalOpen, closeConfirmModal } = useTaskContext()

  if (!isConfirmModalOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <form>
          <label className="block mb-2">{message}</label>
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={closeConfirmModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSubmit(submitAction, closeConfirmModal)}
            >
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
