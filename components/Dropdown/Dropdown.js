import styles from "./Dropdown.module.css";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";

export default function DropDown({ itemList, background, disableArrow }) {
  const [lang, setLang] = useState("ENG");
  const searchInput = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    setLang(e.target.value);
  };

  const handleClose = () => {
    searchInput.current.previousSibling.hidden = true;
    for (const child of Array.from(searchInput.current.children)) {
      const classList = Array.from(child?.classList);
      if (
        classList.filter((d) => d === "MuiOutlinedInput-notchedOutline")
          ?.length > 0
      ) {
        child.hidden = true;
      }
    }
  };

  const handleOpen = () => {
    searchInput.current.previousSibling.hidden = false;
    for (const child of Array.from(searchInput.current.children)) {
      const classList = Array.from(child?.classList);
      if (
        classList.filter((d) => d === "MuiOutlinedInput-notchedOutline")
          ?.length > 0
      ) {
        child.hidden = false;
      }
    }
  };

  useEffect(() => {
    searchInput.current.previousSibling.hidden = true;
  });

  return (
    <StyledFormControl
      fullWidth
      disablearrow={disableArrow ? "true" : undefined}
    >
      <InputLabel id="demo-simple-select-label">
        <Background background={background} />
      </InputLabel>
      <Select
        ref={searchInput}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        label={background.type === "string" ? `${background.name}` : ""}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        MenuProps={{
          sx: {
            ".MuiPaper-root": { backgroundColor: "black", color: "red"},
            ".MuiMenuItem-root": {paddingTop: "8px", paddingBottom: "8px",},
            "&& .Mui-selected": { backgroundColor: "red",  color: "white"},
            "& .MuiMenuItem-root:hover": { backgroundColor: "white", color: "black"}
          },
        }}
      >
        {itemList.map((item, index) => (
          <MenuItem value={item.name} key={index}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
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

const StyledFormControl = styled(FormControl)(({ ...props }) => {
  const { disablearrow } = props;
  return {
    "&.MuiFormControl-root": {
      minWidth: "120px",
      ".MuiFormLabel-root": {
        color: "red",
      },
      ".MuiInputBase-root": {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "red",
        },
        color: "red",
        ".MuiSvgIcon-root": {
          color: "red",
          ...(disablearrow && { display: "none" }),
          right: "1px",
        },
        ".MuiSelect-select": {
          ...(disablearrow && { textAlign: "center" }),
        },
      },
    },
  };
});

// const StyledSelect= styled(Select)(()=>({
//   ".MuiPaper-root": {
//     backgroundColor: "black",
//   },
// }))
