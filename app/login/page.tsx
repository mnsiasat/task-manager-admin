import { redirect } from 'next/navigation'
import { auth, signIn } from '@/auth'

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        action={async () => {
          'use server'
          await signIn('cognito', { redirectTo: '/' })
        }}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Task Manager Admin</h1>
        <p className="text-gray-300 mb-6">
          Sign in with Cognito to continue.
        </p>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium hover:bg-blue-500"
        >
          Sign in
        </button>
      </form>
    </main>
  )
}