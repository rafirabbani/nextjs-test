import styles from "./Layout.module.css";
import { useState, useEffect } from "react";
import Dropdown from '../Dropdown/Dropdown';

export default function Layout({ children }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (windowSize.width > 400) {
    return (
      <>
        <WebPage>{children}</WebPage>
      </>
    );
  } else
    return (
      <>
        <MobilePage>{children}</MobilePage>
      </>
    );
}

function WebPage({ children }) {
  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.leftHeader}>
            <a>Home</a>
            <a>Gallery</a>
            <a>Contacts</a>
          </div>
          <div className={styles.rightHeader}>
          <Dropdown background={{type: "string", name: "Language",}} itemList={[{name: "ENG"}, {name: "JPN"}, {name: "IDN"}]} /* disableArrow *//>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>Footer Here</footer>
    </div>
  );
}

function MobilePage({ children }) {
  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.headerContainer}>
          {/* <div className={styles.dropDown}>  */}
          <Dropdown background={{type: "image", src: "/icon/burger.ico", alt: "burger", height: "35", width: "35"}} itemList={[{name: "asd"}, {name: "das"}]} disableArrow/>
          {/* </div> */}
        </div>
      </header>
      <main>{children}</main>
      <footer>Footer Here</footer>
    </div>
  );
}
