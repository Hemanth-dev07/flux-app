import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = ({ className = '' }) => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            type='button'
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative inline-flex h-11 w-11 items-center justify-center 
        rounded-full border-white/50 bg-white/70 text-slate-700 shadow-lg 
        shadow-indigo-950/10 backdrop-blur-md transition-all duration-300 
        hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-200 
        dark:shadow-cyan-500/10 dark:hover:bg-slate-900 ${className} cursor-pointer`}
        >
            <Sun className='absolute size-5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0' />
            <Moon className='size-5 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90' />

        </button>
    )
}

export default ThemeToggle
