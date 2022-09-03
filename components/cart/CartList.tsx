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

interface Props {}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export const CartList: FC<Props> = () => {
  return (
    <>
      {productsInCart.map((p) => (
        <Grid container spacing={2} key={p.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${p.images[0]}`}
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
              <ItemCounter />
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
            <Button variant="text" color="secondary">
              Remover
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
