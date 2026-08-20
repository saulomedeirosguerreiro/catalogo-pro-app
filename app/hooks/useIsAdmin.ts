import { useKeycloak } from "@react-keycloak/web";
import { ROLE_ADMIN } from "~/lib/keycloak";

export function useIsAdmin() {
  const { keycloak } = useKeycloak();
  return keycloak.hasResourceRole(ROLE_ADMIN);
}
