import Container from "../components/container";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  return (
    <Container>
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
