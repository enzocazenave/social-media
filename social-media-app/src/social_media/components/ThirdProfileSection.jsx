import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/social_media/components/ThirdProfileSection.module.css';
import { Link } from 'react-router-dom';
import { Post } from './Post';

export const ThirdProfileSection = ({ isMine = false }) => {

    const { user } = useContext(AuthContext);

    return (
        <div className={ styles.container }>
            <hr className={ styles.line } />

            <div className={ styles.buttonContainer }>
                {(isMine) && (
                    <Link to={ `/${ user.username }/saved` } className={ styles.button }>
                        <i className="far fa-bookmark"></i>
                        Ver publicaciones guardadas
                    </Link>
                )}
            </div>


            <div className={ styles.postsContainer }>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}