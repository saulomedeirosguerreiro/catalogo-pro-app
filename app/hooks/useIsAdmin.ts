import { useKeycloak } from "@react-keycloak/web";
import { API_CLIENT_ID, ROLE_ADMIN } from "~/lib/keycloak";

export function useIsAdmin() {
  const { keycloak } = useKeycloak();
  return keycloak.hasResourceRole(ROLE_ADMIN, API_CLIENT_ID);
}
