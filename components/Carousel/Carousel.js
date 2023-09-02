import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import styles from "./Carousel.module.css";

export default function CarouselComponent({ images, ...props }) {
  return (
    <Carousel>
      {images &&
        images.map((data, key) => {
          return (
            <Carousel.Item key={key} interval={2500}>
              <div className={styles.imageContainer}>
                <Image
                  src={`${data.filePath}`}
                  alt={data.fileName}
                  className={styles.image}
                  fill
                />
              </div>
              <Carousel.Caption>
                <h5>{data?.detail[props?.selectedLang]?.name}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}
