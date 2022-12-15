import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import Carousel from '../components/Carousel/Carousel'

export default function Home({images, size}) {
  // to do design landing page
  return (
    <Layout size={size}>
      {/* Carousel */}
      <div className={styles.carouselContainer}>
        <Carousel images={images.files && images.files.slice(0,6)}/>
      </div>
      {/* Profile */} 
      <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.left}>Left</div>
                <div className={styles.right}>Right</div>
            </div>
      </div>
      {/* Gallery */}
      <div className={styles.gallery}>
        {images.files && images.files.map((data, index) => {
          return (
            <Image key={index} src={`https://storage.googleapis.com/${data.bucketName}/${data.fileName}`} alt={data.fileName} 
              width={100} height={150}
              className={styles.image}
            />
          );  
        })}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await fetch('http://localhost:9000/api/image/imagesList');
  const images = await res.json();
  return {
    props: {
      images
    }
  }
}


