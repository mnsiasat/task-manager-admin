import NextAuth from 'next-auth'
import Cognito from 'next-auth/providers/cognito'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: '',
      issuer: process.env.COGNITO_ISSUER!,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
      authorization: {
        params: {
          scope: 'phone openid email',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})