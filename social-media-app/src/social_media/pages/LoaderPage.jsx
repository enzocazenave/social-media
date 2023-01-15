import styles from '../../styles/social_media/components/Loader.module.css';
import { Loader } from '../components';

export const LoaderPage = () => {
    return (
        <div className={ styles.container }>
            <Loader />
        </div>
    )
}
