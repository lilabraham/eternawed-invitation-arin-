// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blink } from "../blink/client"; // Assuming blink client is in src/blink/client.ts

const PUBLIC_USER_ID = "public_invitation";

// --- RSVP Entries ---

export const useRsvpEntries = () => {
  return useQuery({
    queryKey: ["rsvpEntries"],
    queryFn: () => blink.db.rsvpEntries.list(),
  });
};

export const useCreateRsvpEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entryData: Omit<Parameters<typeof blink.db.rsvpEntries.create>[0], "userId">) =>
      blink.db.rsvpEntries.create({ ...entryData, userId: PUBLIC_USER_ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvpEntries"] });
    },
  });
};

export const useUpdateRsvpEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entryData: { id: string } & Partial<Omit<Parameters<typeof blink.db.rsvpEntries.update>[1], "userId">>) =>
      blink.db.rsvpEntries.update(entryData.id, { ...entryData, userId: PUBLIC_USER_ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvpEntries"] });
    },
  });
};

export const useDeleteRsvpEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blink.db.rsvpEntries.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvpEntries"] });
    },
  });
};