import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  // @ts-ignore: Vite menangani import.meta.env saat runtime
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID,
  // @ts-ignore: Vite menangani import.meta.env saat runtime
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
})