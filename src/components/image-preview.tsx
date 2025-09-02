/** biome-ignore-all lint/a11y/useAltText: <explanation> img */
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

export const imagePreviewVariants = tv({
  base: `
    rounded-lg overflow-hidden
  `,
});

export const imagePreviewImageVariants = tv({
  base: `
    "w-full h-full object-cover"
  `,
});

interface ImageFilePreviewProps extends ComponentProps<"img"> {
  imageClassName?: string;
}

export default function ImagePreview({
  className,
  imageClassName,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imagePreviewVariants({ className })}>
      <img
        className={imagePreviewImageVariants({ className: imageClassName })}
        {...props}
      />
    </div>
  );
}
