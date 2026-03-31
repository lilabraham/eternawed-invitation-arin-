// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blink } from "../blink/client"; // Assuming blink client is in src/blink/client.ts

const PUBLIC_USER_ID = "public_invitation";

// --- Gift Registries ---

export const useGiftRegistries = () => {
  return useQuery({
    queryKey: ["giftRegistries"],
    queryFn: () => blink.db.giftRegistries.list(),
  });
};

export const useCreateGiftRegistry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registryData: Omit<Parameters<typeof blink.db.giftRegistries.create>[0], "userId">) =>
      blink.db.giftRegistries.create({ ...registryData, userId: PUBLIC_USER_ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftRegistries"] });
    },
  });
};

export const useUpdateGiftRegistry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registryData: { id: string } & Partial<Omit<Parameters<typeof blink.db.giftRegistries.update>[1], "userId">>) =>
      blink.db.giftRegistries.update(registryData.id, { ...registryData, userId: PUBLIC_USER_ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftRegistries"] });
    },
  });
};

export const useDeleteGiftRegistry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blink.db.giftRegistries.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftRegistries"] });
    },
  });
};