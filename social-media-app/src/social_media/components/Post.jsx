import styles from '../../styles/social_media/components/Post.module.css';

export const Post = () => {
    return (
        <div className={ styles.post }>
            <span>
                <i className="fas fa-heart"></i>
                302
            </span>
            <span>
                <i className="fas fa-comment"></i>
                39
            </span>
        </div>
    )
}
