import { Box, Typography } from "@mui/material";
import type { NextPage, GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { dbProduct } from "../../database";

import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}
const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  // const router = useRouter();
  // const { query } = router.query;

  //const { products, isLoading } = useProducts(`/products/${query}`);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <ShopLayout title={`Teslo-Shop Search`} pageDescription={`busqueda`}>
      <Typography variant="h1" component={"h1"}>
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Termino: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningun producto
          </Typography>
          <Typography variant="h2" color="secondary" sx={{ ml: 1 }}>
            {query}
          </Typography>
        </Box>
      )}

      {/* {isLoading ? <FullScreenLoading /> : <ProductList products={products} />} */}
      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProduct.getProductsByTerm(query);
  // puede que la busqueda no tenga resultados
  //TODO retornar otros productos
  const foundProducts = products.length > 0;
  if (!foundProducts) {
    products = await dbProduct.getAllProducts();
  }
  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
