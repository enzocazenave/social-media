import { useAuthContext } from "../../hooks/useAuthContext";

export const HomePage = () => {
    const { logout } = useAuthContext();

    return (
        <div className="container">
            <button 
                onClick={ () => logout() }
                style={{
                    marginTop: '6rem'
                }}
            >
                Cerrar sesion
            </button>
        </div>
    );
}