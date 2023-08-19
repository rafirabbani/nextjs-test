import Image from "next/image";
import styles from "../styles/Home.module.css";
import Carousel from "../components/Carousel/Carousel";
import dynamic from "next/dynamic";


// Disable SSR since we need access window object inside Layout component
const NoSSR = dynamic(() => import("../components/Layout/Layout"), {
  ssr: false,
});

export default function Home({ images }) {
  return (
    <>
      <NoSSR>
        {/* Carousel */}
        <Carousel images={images && images.slice(0, 6)} />
        {/* Profile */}
        <div className={styles.profileContainer}>
          <div>MIDDLE</div>
        </div>
        {/* Gallery */}
        {images &&
          images.map((data, index) => {
            return (
              <div key={index} className={styles.imageContainer}>
                <Image
                  src={`${data.filePath}`}
                  alt={data.fileName}
                  className={styles.image}
                  fill
                />
              </div>
            );
          })}
      </NoSSR>
    </>
  );
}

//---ACCESS SERVER RESOURCE---\\

import fs from "fs";
import path from "path";

async function listFiles() {
  const filePath = path.join(process.cwd(), "/public/carousel");
  return new Promise((resolve, reject) => {
    return fs.readdir(filePath, (err, files) => {
      if (err) {
        console.log("err read file", err);
        return reject(err);
      }
      return resolve(
        files.map((f) => {
          return {
            fileName: f,
            filePath: `/carousel/${f}`,
          };
        })
      );
    });
  });
}

export async function getServerSideProps() {
  const res = await listFiles();
  return {
    props: {
      images: res,
    },
  };
}
