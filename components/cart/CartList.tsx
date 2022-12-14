import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { initialData } from "../../database/products";
import NextLink from "next/link";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}
export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((p) => (
        <Grid container spacing={2} key={p.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${p.images[0]}`}
                    component="img"
                    sx={{ borderRadius: 5 }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{p.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${p.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
