import { useAuthContext } from "../../hooks/useAuthContext";

export const HomePage = () => {
    const { logout } = useAuthContext();

    return (
        <div>
            <h1>HomePage</h1>
            <button
                onClick={ () => logout() }
            >
                Cerrar sesión
            </button>
        </div>
    );
}