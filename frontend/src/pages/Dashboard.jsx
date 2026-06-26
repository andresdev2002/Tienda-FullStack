import { useEffect, useState, useContext } from "react";

import {
  Grid,
  Typography,
  Box
} from "@mui/material";

import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import Layout from "../components/layout/Layout";

import { obtenerDashboard } from "../services/dashboardService";

import { AuthContext } from "../context/AuthContext";

import KpiCard from "../components/dashboard/KpiCard";
import TopProductos from "../components/dashboard/TopProductos";
import UltimasVentas from "../components/dashboard/UltimasVentas";
import VentasPorDia from "../components/dashboard/VentasPorDia";

function Dashboard() {

  const { token } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const data = await obtenerDashboard(token);
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {

    return (
      <Layout>
        <Typography color="text.secondary">
          Cargando...
        </Typography>
      </Layout>
    );
  }

  const stockBajo = dashboard.kpis.productos_stock_bajo;

  const cards = [
    {
      titulo: "Ventas Hoy",
      valor: dashboard.kpis.ventas_hoy,
      icono: PointOfSaleRoundedIcon,
      color: "primary"
    },
    {
      titulo: "Ingresos Hoy",
      valor: dashboard.kpis.ingresos_hoy,
      icono: AttachMoneyRoundedIcon,
      color: "success"
    },
    {
      titulo: "Productos",
      valor: dashboard.resumen.total_productos,
      icono: Inventory2RoundedIcon,
      color: "neutral"
    },
    {
      titulo: "Clientes",
      valor: dashboard.resumen.total_clientes,
      icono: PeopleAltRoundedIcon,
      color: "neutral"
    },
    {
      titulo: "Proveedores",
      valor: dashboard.resumen.total_proveedores,
      icono: LocalShippingRoundedIcon,
      color: "neutral"
    },
    {
      titulo: "Stock Bajo",
      valor: stockBajo,
      icono: WarningAmberRoundedIcon,
      color: stockBajo > 0 ? "warning" : "neutral"
    }
  ];

  return (
    <Layout
      notificationCount={stockBajo}
      notificationLabel={
        `${stockBajo} producto(s) con stock bajo`
      }
    >

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}
        >
          Dashboard
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Resumen general de tu inventario y ventas
        </Typography>

      </Box>

      <Grid container spacing={2.5}>

        {cards.map((card) => (

          <Grid xs={12} sm={6} md={4} key={card.titulo}>

            <KpiCard
              titulo={card.titulo}
              valor={card.valor}
              icono={card.icono}
              color={card.color}
            />

          </Grid>

        ))}

      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 2.5 }}>

        <Grid xs={12} md={6}>
          <TopProductos
            productos={dashboard.top_productos}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <VentasPorDia
            ventas={dashboard.ventas_por_dia}
          />
        </Grid>

        <Grid xs={12}>
          <UltimasVentas
            ventas={dashboard.ultimas_ventas}
          />
        </Grid>

      </Grid>

    </Layout>
  );
}

export default Dashboard;
