"use client";

import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

interface HeraldIconProps {
  icon: any; // The JSON icon data
  size?: number;
  trigger?: "hover" | "click" | "loop" | "morph";
  delay?: number;
}

export default function HeraldIcon({
  icon,
  size = 64,
  trigger = "hover",
  delay = 0,
}: HeraldIconProps) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    if (trigger === "loop") {
      playerRef.current?.playFromBeginning();
    }
  }, [trigger]);

  return (
    <div
      onMouseEnter={() =>
        trigger === "hover" && playerRef.current?.playFromBeginning()
      }
      className="flex items-center justify-center"
    >
      <Player
        ref={playerRef}
        icon={icon}
        size={size}
        onComplete={() =>
          trigger === "loop" &&
          setTimeout(() => playerRef.current?.playFromBeginning(), delay)
        }
        colorize={"#00C896"}
      />
    </div>
  );
}
