type IconProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Decorative SVG icon from /public/icons, rendered at its exact Figma size.
 *
 * next/image is deliberately not used: it doesn't optimise SVGs, and its dev-time size check
 * compares integer `img.width` against the attribute string, so fractional Figma sizes (e.g. 16.5)
 * trigger a false "width or height modified" warning.
 */
export function Icon({ src, width, height, className = "" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      style={{ width, height }}
      className={`block max-w-none shrink-0 ${className}`}
      decoding="async"
    />
  );
}
