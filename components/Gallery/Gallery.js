import Image from "next/image";
import styles from "./Gallery.module.css";
import { useState, useEffect } from "react";

export default function Gallery({ images, ...props }) {

  const [imageList, setImageList] = useState([]);
  const [detailImageLang, setDetailImagelang] = useState([]);
  const selectedLang = props?.selectedLang
  const handleSetDetailImagelang = (selectedLang) => {
    if (selectedLang === "eng") {
        setDetailImagelang(["name", "character", "fandom"])
    }
    else if (selectedLang === "jpn") {
        setDetailImagelang(["名前", "キャラクター", "ファンダム"])
    }
    else setDetailImagelang(["nama", "karakter", "fandom"])
  }

  useEffect(() => {
    setImageList([...images]);
    handleSetDetailImagelang(selectedLang)
  }, [images, selectedLang]);

  

  return (
    <>
      {imageList.map((data, index) => {
        return (
          <div key={index} className={styles.imageContainer} style={index === 0 ? {marginTop: "0"} : null}>
            <div className={styles.imagePlaceholder}>
              <Image
                src={`${data.filePath}`}
                alt={data.fileName}
                className={styles.image}
                fill
              />
            </div>
            <div className={styles.imageGalleryInfoContainer}>
                <div className={styles.imageGalleryInfo}>
                    {
                        detailImageLang.map((q, index) => {
                            return (
                                <h3 key={index}>
                                    <span>{q}</span> <span style={{marginLeft: "0.25rem"}}>:</span><span style={{marginLeft: "1rem"}}>{Object.values(data?.detail[selectedLang])[index]}</span>
                                </h3>
                            );
                        })
                    }
                </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
