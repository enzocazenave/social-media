import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from '../../styles/auth/pages/AuthPage.module.css/';
import { Eslogan } from '../components/';

const initialForm = {
    user: '',
    password: ''
}

export const LoginPage = () => {

    const { user, password, onInputChange } = useForm(initialForm);
    const disableButton = user.length === 0 || password.length === 0;  
    const { errorMessage, login } = useAuthContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ user, password });
    } 

    return (
        <div className={ styles.container }>
            <Eslogan />
            <form className={ styles.form } onSubmit={ handleSubmit }>
                <h2 className={ styles.title }>Iniciá sesión</h2>

                <input 
                    className={ styles.input } 
                    type="text" 
                    placeholder="Correo electrónico o nombre de usuario"
                    name="user"
                    value={ user }
                    onChange={ onInputChange }
                />  
                <input 
                    className={ styles.input } 
                    type="password" 
                    placeholder="Contraseña"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />

                <button 
                    className={ `${ styles.button } ${ styles.buttonOrange } ${ (disableButton) && styles.buttonDisabled }` } 
                    type="submit"
                >
                    Iniciar sesión
                </button>

                { (errorMessage.length !== 0) && <p className={ styles.text } style={{ color: 'red' }}>{ errorMessage }</p> }

                <p className={ styles.text }>¿Has olvidado la contraseña?</p>

                <Link className={ `${ styles.button } ${ styles.buttonGreen }` } to="/auth/register">
                    Crear cuenta nueva
                </Link>
            </form>            
        </div>
    );
}