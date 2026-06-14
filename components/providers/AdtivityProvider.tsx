'use client'

import { useEffect } from 'react'
import { init, initClickTracking, initPageTracking, initLocationTracking } from '@adtivity/adtivity-sdk'

declare global {
  interface Window {
    __ADTIVITY_BOOTSTRAPPED__?: boolean;
  }
}

export function AdtivityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.__ADTIVITY_BOOTSTRAPPED__) return
    window.__ADTIVITY_BOOTSTRAPPED__ = true

    // Monkey-patch window.fetch to inject origin property into Adtivity SDK payloads
    const originalFetch = window.fetch
    window.fetch = async function (input, initOptions) {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : ''
      if (url.includes('/sdk/event') && initOptions && initOptions.body) {
        try {
          const body = JSON.parse(initOptions.body as string)
          if (Array.isArray(body)) {
            const enrichedBody = body.map((event: any) => {
              if (!event.properties) {
                event.properties = {}
              }
              event.properties.origin = 'landing-page'
              return event
            })
            initOptions.body = JSON.stringify(enrichedBody)
          }
        } catch (e) {
          console.warn('Failed to enrich Adtivity payload:', e)
        }
      }
      return originalFetch.apply(this, [input, initOptions])
    }

    const API_KEY = process.env.NEXT_PUBLIC_ADTIVITY_API_KEY
    if (!API_KEY) {
      return
    }

    try {
      init({
        apiKey: API_KEY,
        debug: false,
      })

      initPageTracking()
      initClickTracking()
      initLocationTracking()
    } catch (err) {
      console.warn('Adtivity SDK failed to initialize:', err)
    }
  }, [])

  return <>{children}</>
}
