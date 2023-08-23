import Image from "next/image";
import styles from "./Gallery.module.css";
import { useState, useEffect, useRef } from "react";
import useIsInViewport from "../Utils/ViewPortUtils";

export default function Gallery({ images, ...props }) {
  const [imageList, setImageList] = useState([]);
  const [detailImageLang, setDetailImagelang] = useState([]);
  const selectedLang = props?.selectedLang;
  const handleSetDetailImagelang = (selectedLang) => {
    if (selectedLang === "eng") {
      setDetailImagelang(["name", "character", "fandom"]);
    } else if (selectedLang === "jpn") {
      setDetailImagelang(["名前", "キャラクター", "ファンダム"]);
    } else setDetailImagelang(["nama", "karakter", "fandom"]);
  };

  useEffect(() => {
    setImageList([...images]);
    handleSetDetailImagelang(selectedLang);
  }, [images, selectedLang]);

  return (
    <>
      {imageList.map((data, index) => {
        return (
          <div
            key={index}
            className={styles.imageContainer}
            style={index === 0 ? { marginTop: "0" } : null}
          >
            <div className={styles.imagePlaceholder}>
              <Image
                src={`${data.filePath}`}
                alt={data.fileName}
                className={styles.image}
                fill
              />
            </div>
              <ImageGalleryInfoContainer detailImage={detailImageLang} image={data} lang={selectedLang} indexImage={index}/>
          </div>
        );
      })}
    </>
  );
}

function ImageGalleryInfoContainer({ detailImage, image, lang, indexImage }) {

  const refGalleryInfo = useRef(null);

  const isVisible = useIsInViewport({ref: refGalleryInfo, threshold: 0.5});

  useEffect(() => {
    const infoContainer = document.getElementById(`infoContainer_${indexImage}`);
    if (isVisible) {
      infoContainer.classList.add(styles.animationTrigger);
      // infoContainer.current.classList.add(styles.animationTrigger)
    }
    else {
      infoContainer.classList.remove(styles.animationTrigger);
    }

  },[isVisible, indexImage]);  

  return (
    <div className={styles.imageGalleryInfoContainer}>
      <div className={styles.imageGalleryInfo} id={`infoContainer_${indexImage}`} ref={refGalleryInfo}>  
        {detailImage.map((q, index) => {
          return (
            <h3 key={index}>
              <span >{q}</span> <span style={{ marginLeft: "0.25rem" }}>:</span>
              <span style={{ marginLeft: "1rem" }} >
                {Object.values(image?.detail[lang])[index]}
              </span>
            </h3>
          );
        })}
      </div>
    </div>
  );
}
