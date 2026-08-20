import { useKeycloak } from "@react-keycloak/web";
import { hasRole, ROLE_ADMIN } from "~/lib/keycloak";

export function useIsAdmin() {
  const { keycloak } = useKeycloak();
  return hasRole(keycloak, ROLE_ADMIN);
}
