// @ts-nocheck
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { blink } from '@/blink/client'

const PUBLIC_USER_ID = 'public_invitation'

export type RsvpEntry = {
  id: string
  userId: string
  guestName: string
  guestCount: string
  attendanceStatus: string
  message?: string
  createdAt: string
}

export type GiftRegistry = {
  id: string
  userId: string
  label: string
  accountName: string
  accountNumber: string
  bankName: string
  qrisImageUrl?: string
  createdAt: string
}

export function useRsvpEntries() {
  return useQuery({
    queryKey: ['rsvpEntries'],
    queryFn: async () =>
      (await blink.db.rsvpEntries.list({
        where: { userId: PUBLIC_USER_ID },
        orderBy: { createdAt: 'desc' },
        limit: 50,
      })) as RsvpEntry[],
  })
}

export function useCreateRsvpEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: Omit<RsvpEntry, 'id' | 'userId' | 'createdAt'>) =>
      blink.db.rsvpEntries.create({
        userId: PUBLIC_USER_ID,
        guestName: input.guestName,
        guestCount: input.guestCount,
        attendanceStatus: input.attendanceStatus,
        message: input.message || '',
        createdAt: new Date().toISOString(),
      }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rsvpEntries'] })
    },
  })
}

export function useGiftRegistries() {
  return useQuery({
    queryKey: ['giftRegistries'],
    queryFn: async () =>
      (await blink.db.giftRegistries.list({
        where: { userId: PUBLIC_USER_ID },
        orderBy: { createdAt: 'asc' },
        limit: 10,
      })) as GiftRegistry[],
  })
}