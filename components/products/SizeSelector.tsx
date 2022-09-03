import { Box, Button } from "@mui/material";
import { FC } from "react";
import { ISize } from "../../interfaces";
interface Props {
  sizes: ISize[];
  selectedSize?: ISize;
}
export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box sx={{}}>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
