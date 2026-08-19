import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <span className="text-lg font-semibold text-gray-900">Catálogo Pro</span>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        Sair
      </button>
    </header>
  );
}
