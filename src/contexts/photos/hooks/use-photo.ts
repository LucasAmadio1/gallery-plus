import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotoAlbums from "./use-photo-albums";
import { useNavigate } from "react-router";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const navigate = useNavigate();
  const { mangePhotoOnAlbum } = usePhotoAlbums();

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
        await mangePhotoOnAlbum(photo.id, payload.albumsIds);
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Foto criada com sucesso!");
    } catch (error) {
      toast.success("Erro ao criar foto");
      console.log(error);
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`);
    } catch (error) {
      toast.error("Erro ao excluir foto");
      throw error;
    }

    toast.success("Foto excluída com sucesso!");

    navigate("/");
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
  };
}
