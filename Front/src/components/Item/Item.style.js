import { Card } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const StyledCard = styled(Card)({
  maxWidth: 345
});

export const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none"
});
