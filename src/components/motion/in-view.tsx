"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Pose `data-inview="true"` quand le bloc entre dans le viewport (une fois).
 * Le CSS se charge de l'animation (ex. `.split-word`).
 */
export function InView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-inview={visible ? "true" : "false"}
    >
      {children}
    </div>
  );
}
