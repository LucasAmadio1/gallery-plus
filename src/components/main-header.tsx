import type { ComponentProps } from "react";
import Container from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { Link } from "react-router";
import cx from "classnames";
import Button from "./button";
import PhotoSearch from "./photo-search";
import Divider from "./divider";

interface MainHeaderProps extends ComponentProps<typeof Container> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10 mt-9", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      <PhotoSearch />

      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <Button>Nova foto</Button>
        <Button variant="secondary">Criar álbum</Button>
      </div>
    </Container>
  );
}
