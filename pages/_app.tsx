import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ContentstackLivePreview.init({
        enable: true,
        clientUrlParams: {
          host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST!,
        },
      })
    }
  }, [])

  return <Component {...pageProps} />
}
