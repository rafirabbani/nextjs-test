// to do: create carousel component
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image';
import styles from './Carousel.module.css';

export default function CarouselComponent({images}) {
    // console.log(images);
    return (   
        <Carousel>
            {
                images && images.map((data, key) => {
                    return (
                        <Carousel.Item key={key}>
                            <div className={styles.imageContainer}>
                                <Image src={`https://storage.googleapis.com/${data.bucketName}/${data.fileName}`}
                                    alt={data.fileName} className={styles.image} fill
                                />
                            </div>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}