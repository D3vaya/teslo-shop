import {
  NextPage,
  //GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { dbProduct } from "../../database";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter();

  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );

  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentState) => ({
      ...currentState,
      size,
    }));
  };

  const onUpdateQuantity = (newQty: number) => {
    setTempCartProduct((currentState) => ({
      ...currentState,
      quantity: newQty,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    //TODO llamar al dispatch de add tarea
    console.log("[LOG] 🤖 ", tempCartProduct);
    addProductToCart(tempCartProduct);
    //router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>

              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />

              <SizeSelector
                onSelectedSize={selectedSize}
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
              />
            </Box>
            {/* agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="no hay disponibile"
                color="error"
                variant="outlined"
              />
            )}

            {/* descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProduct.getProductBySlug(slug);
//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { product },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProduct.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProduct.getProductBySlug(slug);
  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
