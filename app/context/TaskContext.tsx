'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Task } from '@/dto/task.dto'

interface TaskContextType {
  isFormOpen: boolean
  openTaskForm: () => void
  closeTaskForm: () => void
  currentTask: Task | null
  setCurrentTask: (task: Task | null) => void

  isConfirmModalOpen: boolean
  openConfirmModal: () => void
  closeConfirmModal: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const openTaskForm = () => setIsFormOpen(true)
  const closeTaskForm = () => setIsFormOpen(false)

  const openConfirmModal = () => setIsConfirmModalOpen(true)
  const closeConfirmModal = () => setIsConfirmModalOpen(false)

  return (
    <TaskContext.Provider
      value={{
        isFormOpen,
        openTaskForm,
        closeTaskForm,
        currentTask,
        setCurrentTask,
        isConfirmModalOpen,
        openConfirmModal,
        closeConfirmModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within TaskContextProvider')
  }
  return context
}
