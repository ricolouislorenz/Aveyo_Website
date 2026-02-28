interface ShapeDividerProps {
  position?: "top" | "bottom";
  color?: string;
  alignment?: "center" | "left" | "right";
  inverted?: boolean;
}

export function ShapeDivider({
  position = "bottom",
  color = "#ffffff",
  alignment = "center",
  inverted = false,
}: ShapeDividerProps) {
  const notchDepth = 60;
  const notchWidth = 450; // Desktop/Tablet width
  const radius = 40;
  const bottomRadius = 20;

  // Desktop / Tablet: alignment is allowed here
  const getDesktopXPosition = () => {
    switch (alignment) {
      case "left":
        return 350;
      case "right":
        return 850;
      case "center":
      default:
        return 600;
    }
  };

  const desktopXPos = getDesktopXPosition();
  const desktopLeftX = desktopXPos - notchWidth / 2;
  const desktopRightX = desktopXPos + notchWidth / 2;

  // Mobile: always centered, wider notch like in the first script
  const mobileNotchWidth = 1080; // 90% of 1200 viewBox
  const mobileXPos = 600; // always centered
  const mobileLeftX = mobileXPos - mobileNotchWidth / 2;
  const mobileRightX = mobileXPos + mobileNotchWidth / 2;

  const createPath = (isMobile: boolean) => {
    const lX = isMobile ? mobileLeftX : desktopLeftX;
    const rX = isMobile ? mobileRightX : desktopRightX;

    return `
      M 0,0
      L ${lX - radius},0
      Q ${lX},0 ${lX},${radius}
      L ${lX},${notchDepth - bottomRadius}
      Q ${lX},${notchDepth} ${lX + bottomRadius},${notchDepth}
      L ${rX - bottomRadius},${notchDepth}
      Q ${rX},${notchDepth} ${rX},${notchDepth - bottomRadius}
      L ${rX},${radius}
      Q ${rX},0 ${rX + radius},0
      L 1200,0
      L 1200,${notchDepth}
      L 0,${notchDepth}
      Z
    `;
  };

  const createInvertedPath = (isMobile: boolean) => {
    const lX = isMobile ? mobileLeftX : desktopLeftX;
    const rX = isMobile ? mobileRightX : desktopRightX;

    return `
      M ${lX - radius},0
      Q ${lX},0 ${lX},${radius}
      L ${lX},${notchDepth - bottomRadius}
      Q ${lX},${notchDepth} ${lX + bottomRadius},${notchDepth}
      L ${rX - bottomRadius},${notchDepth}
      Q ${rX},${notchDepth} ${rX},${notchDepth - bottomRadius}
      L ${rX},${radius}
      Q ${rX},0 ${rX + radius},0
      Z
    `;
  };

  const svgTransform = inverted ? "rotate(180deg) translateZ(0)" : "translateZ(0)";

  return (
    <div
      className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none pointer-events-none`}
      style={{
        height: `${notchDepth}px`,
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Mobile only: centered notch, wider notch */}
      <svg
        className="absolute bottom-0 block w-full md:hidden"
        style={{
          height: `${notchDepth + 2}px`,
          transform: svgTransform,
          marginBottom: position === "bottom" ? "-1px" : "0",
          marginTop: position === "top" ? "-1px" : "0",
          display: "block",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d={inverted ? createInvertedPath(true) : createPath(true)} fill={color} />
      </svg>

      {/* Tablet/Desktop only: alignment works here */}
      <svg
        className="absolute bottom-0 hidden w-full md:block"
        style={{
          height: `${notchDepth + 2}px`,
          transform: svgTransform,
          marginBottom: position === "bottom" ? "-1px" : "0",
          marginTop: position === "top" ? "-1px" : "0",
          display: "block",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d={inverted ? createInvertedPath(false) : createPath(false)} fill={color} />
      </svg>
    </div>
  );
}