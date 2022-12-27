import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/';
import styles from '../../styles/auth/pages/AuthPage.module.css/';
import { Eslogan } from '../components/';

const initialForm = {
    username: '',
    email: '',
    name: '',
    surname: '',
    password: ''
}

export const RegisterPage = () => {

    const { username, email, name, surname, password, onInputChange } = useForm(initialForm); 

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({ username, email, name, surname, password });
    } 

    return (
        <div className={ styles.container }>
            <Eslogan />
            <form className={ styles.form } onSubmit={ handleSubmit }>
                <h2 className={ styles.title }>Creá tu cuenta</h2>

                <input 
                    className={ styles.input } 
                    type="text" 
                    placeholder="Nombre de usuario"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                /> 
                <input 
                    className={ styles.input } 
                    type="email" 
                    placeholder="Correo electrónico"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                />
                <input 
                    className={ styles.input } 
                    type="text" 
                    placeholder="Nombre"
                    name="name"
                    value={ name }
                    onChange={ onInputChange }
                />
                <input 
                    className={ styles.input } 
                    type="text" 
                    placeholder="Apellido"
                    name="surname"
                    value={ surname }
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
                    className={ `${ styles.button } ${ styles.buttonOrange }` } 
                    type="submit"
                >
                    Crear cuenta
                </button>

                <Link className={ `${ styles.button } ${ styles.buttonGreen }` } to="/auth/login">
                    ¿Ya tienes cuenta?
                </Link>
            </form>            
        </div>
    );
}