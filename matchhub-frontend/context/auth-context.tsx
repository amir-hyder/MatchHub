'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signIn: (options: { email: string; password: string }) => Promise<any>
    signUp: (options: { email: string; password: string, options: any }) => Promise<any>
    signOut: () => Promise<void>
    resetPasswordForEmail: any
    updateUserPassword: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const init = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession()

            if (session?.user) setUser(session.user)
            setSession(session ?? null)
            setLoading(false)

            // Listen for changes
            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null)
                setSession(session ?? null)
            })

            return () => {
                subscription.unsubscribe()
            }
        }

        init()
    }, [])

    const signIn = async ({ email, password }: { email: string; password: string }) => {
        return supabase.auth.signInWithPassword({ email, password })
    }

    const signUp = async ({ email, password, options }: { email: string; password: string; options?: any }) => {
        return supabase.auth.signUp({ email, password, options })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
    }

    const resetPasswordForEmail = async ({ email, options }: { email: string; options: any }) => {
        return await supabase.auth.resetPasswordForEmail(email, options);
    }

    const updateUserPassword = async (password: string) => {
        return await supabase.auth.updateUser({ password })
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, resetPasswordForEmail, updateUserPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
