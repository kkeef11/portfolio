"use client";

import { useEffect } from "react";
import { useRenderStore } from "../store/useRenderStore";

export default function SyncSSRCacheFlag({
  wasCached,
}: {
  wasCached: boolean;
}) {
  const setSsrCacheHit = useRenderStore((s) => s.setSsrCacheHit);

  useEffect(() => {
    setSsrCacheHit(wasCached);
  }, [wasCached, setSsrCacheHit]);

  return null;
}
