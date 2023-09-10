'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./Gallery.module.css";
import UseIsInViewport from "../Utils/ViewPortUtil";
import UseDelayUnmount from "../Utils/UseDelayUnmountUtil";

export default function ImageGalleryContainer({ ...props }) {

  return <_ImageGalleryContainer {...props}/>
}

function _ImageGalleryContainer({ ...props }) {
  
  const imageData = props?.imageData;
  const isMobile = props?.isMobile
  // const [isLoading, setIsLoading] = useState(true);
  const _ref = useRef(null);
  const isIntersecting = UseIsInViewport({ ref: _ref, options: { threshold: [0.85] }});
  const isIntersecting2 = UseIsInViewport({ref: _ref, options: { threshold: [0.01] }});

  // const showLoader = UseDelayUnmount(isLoading, 100);

  useEffect(() => {
    if (isIntersecting) {
      // setIsLoading(false);
      _ref.current.classList.add(styles.animationTrigger)
    } 
    
    if (!isIntersecting2) {
      _ref.current.classList.remove(styles.animationTrigger)
    }
  }, [isIntersecting, isIntersecting2]);

  return (
    <div
      className={`${styles.imagePlaceholder} ${isMobile && styles.mobile}`}
      ref={_ref}
    >
      <div>
          <Image
            src={`${imageData.filePath}`}
            alt={imageData.fileName}
            className={`${styles.image} ${isMobile && styles.mobile}`}
            fill
          />
        </div>
    </div>
  );
}
