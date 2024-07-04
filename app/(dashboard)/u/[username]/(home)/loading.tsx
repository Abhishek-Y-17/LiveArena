import { StreamPlayerSkeleton } from "@/components/stream-player";
import React from "react";

export default function CreatorLoading() {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
}
