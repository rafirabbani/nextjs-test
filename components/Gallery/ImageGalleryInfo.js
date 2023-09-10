import UseIsInViewport from "../Utils/ViewPortUtil";
import { useRef, useEffect } from "react";
import styles from './Gallery.module.css';


export default function ImageGalleryInfoContainer({
  detailImage,
  image,
  lang,
  isMobile,
}) {
  const refGalleryInfo = useRef(null);

   const isIntersecting = UseIsInViewport({ref: refGalleryInfo, options: { threshold: 0.5 }});
   const isIntersecting2 = UseIsInViewport({ref: refGalleryInfo, options: { threshold: 0.1 }});

   useEffect(() => {
    if (isIntersecting) {
      refGalleryInfo.current.classList.add(styles.animationTrigger)
    } 
    
    if (!isIntersecting2) {
      refGalleryInfo.current.classList.remove(styles.animationTrigger)
    }
  }, [isIntersecting, isIntersecting2]);


  return (
    <div className={`${styles.imageGalleryInfoContainer} ${isMobile && styles.mobile}`}>
      <div
        className={`${styles.imageGalleryInfo} ${isMobile && styles.mobile}`}
        ref={refGalleryInfo}
      >
        <table className={`${styles.infoContainer} ${isMobile && styles.mobile}`}>
          <tbody>
            {detailImage.map((q, index) => {
              return (
                <tr key={index}>
                  <td>{q}:</td>
                  <td style={{paddingLeft: "1rem"}}>{Object.values(image?.detail[lang])[index]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
