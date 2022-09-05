import { ShopLayout } from "../../components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" variant="outlined" label="Pagada" />
      ) : (
        <Chip color="error" variant="outlined" label="No Pagada" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver orden",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      );
    },
    sortable: false,
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Fernando Herrera" },
  { id: 2, paid: false, fullname: "Melisa flores" },
  { id: 3, paid: true, fullname: "Juan Ayala" },
  { id: 4, paid: false, fullname: "Natalia Herrera" },
  { id: 5, paid: true, fullname: "Camilo Ayala" },
  { id: 6, paid: true, fullname: "Constanza" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del clinte"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
