import { useState, useEffect, useMemo } from "react";

export default function UseIsInViewport({ ref, options, styles}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const style = styles || null;

  const observer = useMemo(() => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(style)
              setIsIntersecting(true);
            }
            if (!entry.isIntersecting) {
              entry.target.classList.remove(style)
              setIsIntersecting(false);
            }
          })
        },
        { threshold: options?.threshold }
      )
  }, [options, style]);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
