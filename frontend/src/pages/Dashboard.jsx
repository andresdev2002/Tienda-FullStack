import { useEffect } from "react";
import { useState } from "react";

import { obtenerDashboard } from "../services/dashboardService";

function Dashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {

    cargarDashboard();

  }, []);

  const cargarDashboard = async () => {

    try {

      const data =
        await obtenerDashboard();

      setDashboard(data);

    } catch (error) {

      console.error(error);
    }
  };

  if (!dashboard) {

    return <h2>Cargando...</h2>;
  }

  return (

    <div>

      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(
          dashboard,
          null,
          2
        )}
      </pre>

    </div>
  );
}

export default Dashboard;