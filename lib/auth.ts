import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SignUpData {
  email: string
  password: string
  full_name: string
  username: string
  role: 'reader' | 'author' | 'admin'
}

export interface SignInData {
  email: string
  password: string
}

export async function signUp(data: SignUpData) {
  try {
    // Create user in auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Failed to create user')

    // Create user profile
    const { error: profileError } = await supabase.from('user_profiles').insert({
      id: authData.user.id,
      email: data.email,
      username: data.username,
      full_name: data.full_name,
      role: data.role,
      is_verified: false,
    })

    if (profileError) throw profileError

    return { success: true, user: authData.user }
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}

export async function signIn(data: SignInData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error
    return { success: true, user: authData.user, session: authData.session }
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Get user profile error:', error)
    return null
  }
}
