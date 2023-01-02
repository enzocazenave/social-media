import { Link } from 'react-router-dom';
import styles from '../../styles/social_media/components/Post.module.css';

export const Post = () => {

    const username = 'chikicazenave_';
    const postId = '893242eds239vm';

    return (
        <Link to={ `/post/${ postId }` } className={ styles.post }>
            <span>
                <i className="fas fa-heart"></i>
                302
            </span>
            <span>
                <i className="fas fa-comment"></i>
                39
            </span>
        </Link>
    )
}
