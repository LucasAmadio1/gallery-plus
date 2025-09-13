import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../../schemas";
import { toast } from "sonner";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`/photos/${photo.id}/albums`, {
          albumsIds: payload.albumsIds,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Foto criada com sucesso!");
    } catch (error) {
      toast.success("Erro ao criar foto");
      console.log(error);
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
  };
}
