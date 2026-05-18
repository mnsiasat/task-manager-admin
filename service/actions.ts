'use server'

import { auth } from '@/auth'
import { Task, Status, UpdateTaskDto, CreateTaskDto } from '@/dto/task.dto'
import { revalidatePath } from 'next/cache'
import { removeEmptyProperties, stringToEnum } from '@/utils'

export interface CountPerStatus {
  count: number
  taskStatus: Status
}

async function getAuthorizedInit() {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized: missing access token')
  }

  return {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store' as RequestCache,
  }
}

export const getTasks = async (): Promise<Task[]> => {
  const initObject = await getAuthorizedInit()

  const res = await fetch(`${process.env.API_URL}`, {
    ...initObject,
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return res.json()
}

export const deleteTask = async (id: string) => {
  const initObject = await getAuthorizedInit()

  const res = await fetch(`${process.env.API_URL}/${id}`, {
    ...initObject,
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete task')
  }

  revalidatePath('/')
}

async function executePut(input: UpdateTaskDto) {
  const initObject = await getAuthorizedInit()

  return fetch(`${process.env.API_URL}/${input.id}`, {
    ...initObject,
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

async function executePost(input: CreateTaskDto) {
  const initObject = await getAuthorizedInit()

  return fetch(`${process.env.API_URL}`, {
    ...initObject,
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export const saveTask = async (formData: FormData) => {
  let input = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  }

  let response: Response | null
  input = removeEmptyProperties(input)

  try {
    if (input.id) {
      const status = stringToEnum(Status, formData.get('status') as string)
      response = await executePut({
        ...input,
        status,
      })
    } else {
      response = await executePost(input)
    }

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      console.error(data)
      return
    }
  } catch (error) {
    console.error(error)
  }

  revalidatePath('/')
}

export const getSummary = async (): Promise<CountPerStatus[]> => {
  const initObject = await getAuthorizedInit()

  const res = await fetch(`${process.env.API_URL}`, {
    ...initObject,
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch summary')
  }

  const data = await res.json()
  let summary: CountPerStatus[] = []

  if (Array.isArray(data)) {
    summary = data.map((item) => ({
      taskStatus: item.status,
      count: item._count.status,
    }))
  }

  return summary
}