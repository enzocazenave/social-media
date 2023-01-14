import styles from '../../styles/social_media/components/Comment.module.css';

const defaultImage = 'https://fondosmil.com/fondo/17010.jpg';

export const Comment = ({ comment, user }) => {
    return (
        <div className={ styles.comment }>
            <img className={ styles.profileImage } src={ user.image } />
            <div className={ styles.commentInfo }>
                <h3 className={ styles.commentTitle }>{ user.username }</h3>
                <p className={ styles.commentText }>{ comment }</p>
                <span className={ styles.commentDate }>18 sem</span>
            </div>
        </div>
    )
}