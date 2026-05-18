import { redirect } from 'next/navigation'
import { signOut } from '@/auth'

export default function AuthButtons() {
  return (
    <form
      action={async () => {
        'use server'

        await signOut({ redirect: false })

        const logoutUrl =
          `${process.env.COGNITO_DOMAIN}/logout` +
          `?client_id=${process.env.COGNITO_CLIENT_ID}` +
          `&logout_uri=${encodeURIComponent('http://localhost:3000/login')}`

        redirect(logoutUrl)
      }}
    >
      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
      >
        Sign out
      </button>
    </form>
  )
}