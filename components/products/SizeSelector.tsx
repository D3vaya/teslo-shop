import { Box, Button } from "@mui/material";
import { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  sizes: ISize[];
  selectedSize?: ISize;
  onSelectedSize: (s: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  sizes,
  selectedSize,
  onSelectedSize,
}) => {
  return (
    <Box sx={{}}>
      {sizes.map((size) => (
        <Button
          onClick={() => onSelectedSize(size)}
          key={size}
          size="small"
          color={selectedSize === size ? "secondary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
