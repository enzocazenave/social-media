import { Link } from 'react-router-dom';
import styles from '../../styles/social_media/components/Post.module.css';

export const Post = ({ postId, image, likes, comments }) => {
    return (
        <Link 
            to={ `/post/${ postId }` } 
            className={ styles.post }
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${ image })`
            }}
        >
            <span>
                <i className="fas fa-heart"></i>
                { likes }
            </span>
            <span>
                <i className="fas fa-comment"></i>
                { comments }
            </span>
        </Link>
    )
}
