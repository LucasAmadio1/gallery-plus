import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";
import { useQueryState, createSerializer, parseAsString } from "nuqs";

export default function usePhotos() {
  const [albumId, setAlbumId] = useQueryState("albumId");
  const [search, setSearch] = useQueryState("search");

  const toSearchParams = createSerializer({
    albumId: parseAsString,
    q: parseAsString,
  });

  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ["photos", albumId, search],
    queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q: search })}`),
  });

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
    filters: {
      albumId,
      setAlbumId,
      search,
      setSearch,
    },
  };
}
