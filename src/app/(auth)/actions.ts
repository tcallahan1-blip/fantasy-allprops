'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type AuthState = {
  error?: string
  message?: string
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      return { error: 'An account with that email already exists.' }
    }
    if (error.message.toLowerCase().includes('duplicate') || error.message.toLowerCase().includes('unique')) {
      return { error: 'That username is already taken. Try another.' }
    }
    return { error: error.message }
  }

  // Email confirmation required — no session yet
  if (data.user && !data.session) {
    return { message: 'Check your email to confirm your account, then sign in.' }
  }

  redirect('/dashboard')
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.toLowerCase().includes('invalid')) {
      return { error: 'Incorrect email or password.' }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
