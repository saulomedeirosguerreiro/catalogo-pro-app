import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { LoadingScreen } from "./LoadingScreen";

export default function RequireAuth() {
  const { keycloak, initialized } = useKeycloak();
  const authenticated = initialized && keycloak.authenticated;

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!authenticated) {
    return <LoadingScreen />;
  }

  return <Outlet />;
}
