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
  inverted = false 
}: ShapeDividerProps) {
  const notchDepth = 60;
  const notchWidth = 450;
  const radius = 40;
  const bottomRadius = 20; // Radius for smooth bottom corners

  // Calculate x position based on alignment
  const getXPosition = () => {
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

  const xPos = getXPosition();
  const leftX = xPos - notchWidth / 2;
  const rightX = xPos + notchWidth / 2;

  // Mobile version - always centered with same width as desktop
  const mobileNotchWidth = 450; // Same as desktop for consistency
  const mobileXPos = 600; // Center
  const mobileLeftX = mobileXPos - mobileNotchWidth / 2;
  const mobileRightX = mobileXPos + mobileNotchWidth / 2;

  // Create the path for the notch cutout
  const createPath = (isMobile: boolean) => {
    const lX = isMobile ? mobileLeftX : leftX;
    const rX = isMobile ? mobileRightX : rightX;
    
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

  // Create inverted path - only the notch area in the specified color
  const createInvertedPath = (isMobile: boolean) => {
    const lX = isMobile ? mobileLeftX : leftX;
    const rX = isMobile ? mobileRightX : rightX;
    
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

  return (
    <div
      className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden leading-none pointer-events-none`}
      style={{ 
        height: `${notchDepth}px`,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      } as React.CSSProperties}
    >
      {/* Mobile Version - Hidden on md and up */}
      <svg
        className="absolute bottom-0 w-full md:hidden"
        style={{ 
          height: `${notchDepth + 2}px`,
          transform: inverted ? 'rotate(180deg) translateZ(0)' : 'translateZ(0)',
          marginBottom: position === "bottom" ? '-1px' : '0',
          marginTop: position === "top" ? '-1px' : '0',
          display: 'block',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        } as React.CSSProperties}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d={inverted ? createInvertedPath(true) : createPath(true)}
          fill={color}
        />
      </svg>
      
      {/* Tablet+ Version - Hidden below md */}
      <svg
        className="absolute bottom-0 w-full hidden md:block"
        style={{ 
          height: `${notchDepth + 2}px`,
          transform: inverted ? 'rotate(180deg) translateZ(0)' : 'translateZ(0)',
          marginBottom: position === "bottom" ? '-1px' : '0',
          marginTop: position === "top" ? '-1px' : '0',
          display: 'block',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        } as React.CSSProperties}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d={inverted ? createInvertedPath(false) : createPath(false)}
          fill={color}
        />
      </svg>
    </div>
  );
}