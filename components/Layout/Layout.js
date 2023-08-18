import styles from "./Layout.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener('resize', handleResize)}
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
          <div className={styles.rightHeader}>Right</div>
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
          <Dropdown>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Item>1</Dropdown.Item>
            <Dropdown.Item>2</Dropdown.Item>
            <Dropdown.Item>3</Dropdown.Item>
          </Dropdown>
          <div className={styles.rightHeader}>Burger Right</div>
        </div>
      </header>
      <main>{children}</main>
      <footer>Footer Here</footer>
    </div>
  );
}
