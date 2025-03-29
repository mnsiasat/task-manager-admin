'use server'

import { Task, Status, UpdateTaskDto, CreateTaskDto } from '@/dto/task.dto'
import { revalidatePath } from 'next/cache'
import { removeEmptyProperties, stringToEnum } from '@/utils'

export interface CountPerStatus {
  count: number
  taskStatus: Status
}

export const getSummary = async (): Promise<CountPerStatus[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'GET',
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  let summary: CountPerStatus[] = []

  if (Array.isArray(data)) {
    summary = data.map((item) => ({
      taskStatus: item.status,
      count: item._count.status,
    }))
  } else {
    console.error('Response is not an array')
  }
  return summary
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'GET',
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export const deleteTask = async (id: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  revalidatePath('/')
}

async function executePut(input: UpdateTaskDto) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input.id}`, {
    method: 'PUT',
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
}

async function executePost(input: CreateTaskDto) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'POST',
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
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
      const { errors } = await response.json()
      console.error(errors)
      return
    }
  } catch (error) {
    console.error(error)
  }

  revalidatePath('/')
}
