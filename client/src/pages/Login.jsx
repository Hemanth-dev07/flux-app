import React from 'react'
import { SignIn } from '@clerk/react'
import { Star } from 'lucide-react'
import { assets } from '../assets/assets'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'

const Login = () => {
    const { isDark } = useTheme()

    return (
        <div className='relative isolate flex min-h-screen flex-col overflow-hidden md:flex-row'>
            {/* Background Image */}
            <img
                src={isDark ? assets.bgImageDark : assets.bgImage}
                alt='Background Image'
                className='absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-500'
            />

            <div className='absolute inset-0 -z-10 bg-white/10 transition-colors duration-500 dark:bg-slate-950/30' />

            <div className='absolute right-5 top-5 z-20'>
                <ThemeToggle />
            </div>

            {/* Left side: branding */}
            <div className='flex flex-1 flex-col items-start justify-between p-6 md:p-10 lg:pl-40'>
                <img
                    src={isDark ? assets.logo_dark : assets.logo}
                    alt='Flux logo'
                    className='h-12 object-contain'
                />

                <div>
                    <div className='mb-4 flex items-center gap-3 max-md:mt-10'>
                        <img src={assets.group_users} alt='' className='h-8 md:h-10' />

                        <div>
                            <div className='flex'>
                                {Array(5).fill(0).map((_, i) => (
                                    <Star
                                        key={i}
                                        className='size-4 fill-amber-500 text-transparent md:size-4.5'
                                    />
                                ))}
                            </div>

                            <p className='text-sm text-slate-700 dark:text-slate-300'>
                                Used by 12k+ developers
                            </p>
                        </div>
                    </div>

                    <h1 className='bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-3xl font-bold text-transparent transition-colors duration-300 dark:from-white dark:via-cyan-100 dark:to-violet-200 md:pb-2 md:text-6xl'>
                        Stay in the flow of what matters
                    </h1>

                    <p className='max-w-72 text-xl text-indigo-900 transition-colors duration-300 dark:text-indigo-100/90 md:max-w-md md:text-3xl'>
                        Connect with people, share your thoughts, and discover stories from your world on Flux.
                    </p>
                </div>

                <span className='md:h-10'></span>
            </div>

            {/* Right side: login form */}
            <div className='flex flex-1 items-center justify-center p-6 sm:p-10'>
                <div className='rounded-3xl bg-white/35 p-2 shadow-2xl shadow-indigo-950/10 backdrop-blur-md transition-colors duration-300 dark:bg-slate-950/40 dark:shadow-cyan-500/10'>
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default Login