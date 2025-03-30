'use server'

import { Task, Status, UpdateTaskDto, CreateTaskDto } from '@/dto/task.dto'
import { revalidatePath } from 'next/cache'
import { removeEmptyProperties, stringToEnum } from '@/utils'

export interface CountPerStatus {
  count: number
  taskStatus: Status
}

const headers = {
  'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache', // Ensures that the browser does not use a cached response
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'GET',
    headers,
  })
  return res.json()
}

export const deleteTask = async (id: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    method: 'DELETE',
    headers,
  })
  revalidatePath('/')
}

async function executePut(input: UpdateTaskDto) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(input),
  })
}

async function executePost(input: CreateTaskDto) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'POST',
    headers,
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

export const getSummary = async (): Promise<CountPerStatus[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'GET',
    headers
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
