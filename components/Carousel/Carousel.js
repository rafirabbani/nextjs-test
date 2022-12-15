// to do: create carousel component
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';
import styles from './Carousel.module.css';

export default function CarouselComponent({images}) {
    // console.log(images);
    return (   
        <Carousel showThumbs={false}>
            {
                images && images.map((data, key) => {
                    return (
                        <div key={key} className={styles.imageContainer}>
                            <img src={`https://storage.googleapis.com/${data.bucketName}/${data.fileName}`}
                                alt={data.fileName} className={styles.image}
                            />
                        </div>
                    )
                })
            }
        </Carousel>
    )
}