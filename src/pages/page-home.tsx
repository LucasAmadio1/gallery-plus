import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();

  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />

      <PhotosList
        photos={[
          {
            id: "123",
            title: "Hello World!",
            imageId: "square-breakfast.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "41", title: "Album 2" },
              { id: "141", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
