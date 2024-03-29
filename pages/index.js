import Carousel from "../components/Carousel/Carousel";
import Gallery from "../components/Gallery/Gallery";
import dynamic from "next/dynamic";
import Profile from "../components/Profile/Profile";
import { useState, useEffect } from "react";
// Import both to avoid eslint exhaustive dept useEffect dependency
import Router, { useRouter } from "next/router";

// Disable SSR since we need access window object inside Layout component
const NoSSR = dynamic(() => import("../components/Layout/Layout"), {
  ssr: false,
});

export default function Home({ images, gallery }) {
  const router = useRouter();
  const queryLang = router.query?.lang;
  // Set default selectedLang state if queryLang sent is not valid
  const [selectedLang, setSelectedLang] = useState(
    queryLang === "eng" || queryLang === "idn" || queryLang === "jpn"
      ? queryLang
      : "eng"
  );

  const [isMobile, setIsMobile] = useState(false);

  const handleChangeLang = (lang) => {
    setSelectedLang(lang);
  };

  useEffect(() => {
    // Using Router to avoid eslint exhaustive dept useEffect dependency
    if (
      selectedLang !== "eng" &&
      selectedLang !== "jpn" &&
      selectedLang !== "idn"
    ) {
      Router.push("/?lang=eng");
    } else {
      Router.push(`/?lang=${selectedLang}`);
    }
  }, [selectedLang]);
  return (
    <>
      <NoSSR selectedLang={selectedLang} handleChangeLang={handleChangeLang} handleIsMobile={setIsMobile}>
        {/* Carousel */}
        <div id={"carousel-container"}>
          <Carousel
            images={images && images.slice(0, 6)}
            selectedLang={selectedLang}
          />
        </div>
        {/* Profile */}
        <div id={"contacts-container"}>
          <Profile selectedLang={selectedLang} isMobile={isMobile}/>
        </div>
        {/* Gallery */}
        <div id={"gallery-container"}>
          <Gallery images={gallery} selectedLang={selectedLang} isMobile={isMobile} />
        </div>
      </NoSSR>
    </>
  );
}

//---ACCESS SERVER RESOURCE---\\

import fs from "fs";
import path from "path";

function listFilesCarousel() {
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
            detail: {
              eng: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata",
              },
              jpn: {
                name: "日本語で何か",
                character: "ヨルハ２号Ｂ型",
                fandom: "ニーア オートマタ",
              },
              idn: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata",
              },
            },
          };
        })
      );
    });
  });
}

async function listFilesGallery() {
  const filePath = path.join(process.cwd(), "/public/gallery");
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
            filePath: `/gallery/${f}`,
            detail: {
              eng: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata",
              },
              jpn: {
                name: "日本語で何か",
                character: "ヨルハ２号Ｂ型",
                fandom: "ニーア オートマタ",
              },
              idn: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata",
              },
            },
          };
        })
      );
    });
  });
}

export async function getServerSideProps() {
  const promises = [listFilesCarousel(), listFilesGallery()]
  const resultPromises = await Promise.all(promises);
  const images = resultPromises[0];
  const gallery = resultPromises[1]
  return {
    props: {
      images,
      gallery
    },
  };
}
