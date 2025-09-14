import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";

export default function usePhotoAlbums() {
  const queryClient = useQueryClient();

  async function mangePhotoOnAlbum(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, {
        albumsIds,
      });

      queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Álbum atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerenciar albums da foto");
      throw error;
    }
  }

  return {
    mangePhotoOnAlbum,
  };
}
