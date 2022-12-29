import { useAuthContext } from "../../hooks/useAuthContext";

export const HomePage = () => {
    const { logout } = useAuthContext();

    return (
        <div className="container">
            <button onClick={ () => logout() }>Cerrar sesion</button>
        </div>
    );
}