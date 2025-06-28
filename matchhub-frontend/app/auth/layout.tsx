'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            router.push('/app')
        }
    }, [user, loading, router])

    if (loading || user) {
        return <div className="p-6 text-center">Loading...</div>
    }

    return <>
        {children}
    </>
}