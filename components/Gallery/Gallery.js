import styles from "./Gallery.module.css";
import { useState, useEffect, useRef } from "react";
import ImageGalleryInfoContainer from "./ImageGalleryInfo";
import ImageGalleryContainer from "./ImageGallery";

export default function Gallery({ images, ...props }) {
  const [imageList, setImageList] = useState([]);
  const [detailImageLang, setDetailImagelang] = useState([]);
  const selectedLang = props?.selectedLang;
  const isMobile = props?.isMobile;
  const handleSetDetailImagelang = (selectedLang) => {
    if (selectedLang === "eng") {
      setDetailImagelang(["name", "character", "fandom"]);
    } else if (selectedLang === "jpn") {
      setDetailImagelang(["名前", "キャラクター", "ファンダム"]);
    } else setDetailImagelang(["nama", "karakter", "fandom"]);
  };

  const _useRef = useRef(null)

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
            ref={_useRef}
          >
              <ImageGalleryContainer imageData={data} isMobile={isMobile}/>
              <ImageGalleryInfoContainer detailImage={detailImageLang} image={data} lang={selectedLang} indexImage={index} isMobile={isMobile}/>
          </div>
        );
      })}
    </>
  );
}