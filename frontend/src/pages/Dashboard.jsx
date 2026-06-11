import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import Layout from "../components/layout/Layout";

import { obtenerDashboard } from "../services/dashboardService";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const data = await obtenerDashboard();
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

          <Grid item xs={12} md={4} key={card.titulo}>

            <Card>

              <CardContent>

                <Typography
                  color="text.secondary"
                >
                  {card.titulo}
                </Typography>

                <Typography variant="h4">
                  {card.valor}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Layout>
  );
}

export default Dashboard;