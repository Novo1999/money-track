import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    ;(deferredPrompt as any).prompt()
    const { outcome } = await (deferredPrompt as any).userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install')
    } else {
      console.log('User dismissed the install')
    }
    setDeferredPrompt(null)
    setCanInstall(false)
  }

  if (!canInstall) return null

  return (
    <button onClick={handleInstallClick} className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded">
      Install App
    </button>
  )
}
