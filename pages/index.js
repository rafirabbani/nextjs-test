import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import Carousel from '../components/Carousel/Carousel'

export default function Home({images, size}) {
  // to do design landing page
  return (
    <Layout size={size}>
      {/* Carousel */}
        <Carousel images={images.files && images.files.slice(0,6)}/>
      {/* Profile */} 
      <div className={styles.profileContainer}>
        <div>
            MIDDLE
        </div>
      </div>
      {/* Gallery */}
        {images.files && images.files.map((data, index) => {
          return (
            <div key={index} className={styles.imageContainer}>
              <Image src={`https://storage.googleapis.com/${data.bucketName}/${data.fileName}`} alt={data.fileName} 
                  className={styles.image} fill
              />
            </div>  
          );  
        })}
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


