import { useState, useEffect, useMemo, isValidElement } from "react";

export default function useIsInViewport({ ref, options, styles }) {
  // console.log('fire');
  const [isIntersecting, setIsIntersecting] = useState(false);
  // const root = options?.root;


  const observer = useMemo(() => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // console.log('fire', entry);
            if (entry.isIntersecting) {
              entry.target.classList.add(styles)
              // setIsIntersecting(true)
            }
            if (!entry.isIntersecting) {
              entry.target.classList.remove(styles)
              // setIsIntersecting(false)
            }
          })
        },
        { threshold: options?.threshold }
      )
  }, [options, styles]);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

}
