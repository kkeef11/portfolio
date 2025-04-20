import { useEffect, useRef, useState } from "react";

export default function useResponsiveSize(shouldMeasure: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 400 });

  useEffect(() => {
    if (!shouldMeasure || !ref.current) return;

    const measure = () => {
      const { width } = ref.current!.getBoundingClientRect();
      if (width > 0) {
        setSize({ width, height: 400 }); // hardcoded height
      }
    };

    measure();

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [shouldMeasure]);

  return [ref, size] as const;
}
