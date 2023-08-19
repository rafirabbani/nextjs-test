import Dropdown from "react-bootstrap/Dropdown";
import styles from "./Dropdown.module.css"
import Image from "next/image";

export default function DropDown({ itemList, background, disableArrow }) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        bsPrefix
        className={`${styles.btn}`}
        // extend css class when on click fire
        // onClick={""}

      >
        <Background background={background} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {itemList.map((item, key) => (
          <Dropdown.Item href={item.action} key={key} id="dropdown-basic">
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function Background({ background }) {
  if (background.type === "image") {
    return (
      <Image
        src={background.src}
        alt={background.alt}
        height={background.height}
        width={background.height}
      />
    );
  } else if (background.type === "string") {
    return `${background.name}`;
  }
}
