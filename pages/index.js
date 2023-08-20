import Carousel from "../components/Carousel/Carousel";
import Gallery from "../components/Gallery/Gallery"
import dynamic from "next/dynamic";
import Profile from "../components/Profile/Profile";
import { useState, useEffect } from "react";


// Disable SSR since we need access window object inside Layout component
const NoSSR = dynamic(() => import("../components/Layout/Layout"), {
  ssr: false,
});

export default function Home({ images }) {
  const [selectedLang, setSelectedLang] = useState("eng");
  const handleChangeLang = (lang) => {
    setSelectedLang(lang)
  }
  useEffect(() => {
    handleChangeLang(selectedLang);
  }, [selectedLang]);
  return (
    <>
      <NoSSR selectedLang={selectedLang} handleChangeLang={handleChangeLang}>
        {/* Carousel */}
        <Carousel images={images && images.slice(0, 6)}  selectedLang={selectedLang}/>
        {/* Profile */}
        <Profile selectedLang={selectedLang}/>
        {/* Gallery */}
        <Gallery images={images} selectedLang={selectedLang}/>
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
            detail: {
              eng: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata"
              },
              jpn: {
                name: "日本語で何か",
                character: "ヨルハ２号Ｂ型",
                fandom: "ニーア オートマタ"
              },
              idn: {
                name: "something in japanese",
                character: "2B",
                fandom: "NieR:Automata"
              }
            }
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
