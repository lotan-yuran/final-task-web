import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)({
  borderRadius: "4px",
  width: "100%",
  marginBottom: 20,
  minHeight: 80,
  height: "fit-content",
  backgroundColor: "#eee",
  padding: "20px 30px",
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center"
});
