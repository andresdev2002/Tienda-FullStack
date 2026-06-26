import { useEffect, useState, useContext } from "react";

import {
  Grid,
  Typography
} from "@mui/material";

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
    return <h2>Cargando...</h2>;
  }

  const cards = [
    {
      titulo: "Ventas Hoy",
      valor: dashboard.kpis.ventas_hoy
    },
    {
      titulo: "Ingresos Hoy",
      valor: dashboard.kpis.ingresos_hoy
    },
    {
      titulo: "Productos",
      valor: dashboard.resumen.total_productos
    },
    {
      titulo: "Clientes",
      valor: dashboard.resumen.total_clientes
    },
    {
      titulo: "Proveedores",
      valor: dashboard.resumen.total_proveedores
    },
    {
      titulo: "Stock Bajo",
      valor: dashboard.kpis.productos_stock_bajo
    }
  ];

  return (
    <Layout>

      <Typography
        variant="h4"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        {cards.map((card) => (

          <Grid xs={12} md={4} key={card.titulo}>

            <KpiCard
              titulo={card.titulo}
              valor={card.valor}
            />

          </Grid>

        ))}

      </Grid>

      {/* =========================================
          DATOS QUE EL BACKEND YA CALCULABA Y EL
          FRONTEND NUNCA MOSTRABA
          ========================================= */}

      <Grid container spacing={3} sx={{ mt: 3 }}>

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
