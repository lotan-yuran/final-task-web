import { useState, useEffect } from "react";
import { ArrowUpward } from "@mui/icons-material";
import { StyledButtom } from "./ScrollTopButton.style";
import useScrollPosition from "../../hooks/scrollPosition";
 
export const ScrollTopButton = () => {
  const scrollPosition = useScrollPosition();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scrollPosition > 300) {
      setVisible(true);
    } else if (scrollPosition <= 300) {
      setVisible(false);
    }
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <StyledButtom onClick={scrollToTop} visible={visible}>
      <ArrowUpward fontSize="large" />
    </StyledButtom>
  );
};
