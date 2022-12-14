import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Link,
  Badge,
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UiContext } from "../../context";

export const Navbar = () => {
  const { asPath } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={asPath === "/category/men" ? "secondary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                color={asPath === "/category/women" ? "secondary" : "info"}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={asPath === "/category/kid" ? "secondary" : "info"}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
