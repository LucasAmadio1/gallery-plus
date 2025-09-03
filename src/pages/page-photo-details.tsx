import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const isLoadingPhoto = false;
  const photo = {
    id: "123",
    title: "Hello World!",
    imageId: "square-breakfast.png",
    albums: [
      { id: "321", title: "Album 1" },
      { id: "41", title: "Album 2" },
      { id: "141", title: "Album 3" },
    ],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoadingPhoto} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="flex flex-col gap-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/square-breakfast.png`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          <div>
            {!isLoadingPhoto ? (
              <Button variant="destructive">Excluir</Button>
            ) : (
              <Skeleton className="h-10 w-20" />
            )}
          </div>
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>

          <AlbumsListSelectable
            loading={isLoadingPhoto}
            photo={photo}
            albums={[
              { id: "321", title: "Album 1" },
              { id: "41", title: "Album 2" },
              { id: "141", title: "Album 3" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
