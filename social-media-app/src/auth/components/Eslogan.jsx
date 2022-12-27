import styles from '../../styles/auth/components/Eslogan.module.css';

export const Eslogan = () => {
    return (
        <div className={ styles.container }>
            <h1 className={ styles.title }>HistoryTime</h1>
            <p className={ styles.text }>
                HistoryTime te ayuda a comunicarte y compartir con las personas 
                que forman parte de tu vida.
            </p>
        </div>
    );
}