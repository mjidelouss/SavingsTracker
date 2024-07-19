import { ThemeProvider } from 'next-themes'
import SavingsTracker from './components/SavingsTracker'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <ThemeToggle />
        <SavingsTracker />
      </main>
    </ThemeProvider>
  )
}