import styles from '../../styles/social_media/components/Comment.module.css';

const defaultImage = 'https://fondosmil.com/fondo/17010.jpg';

export const Comment = () => {

    const postUser = { 
        username: 'chikicazenave_' 
    }

    return (
        <div className={ styles.comment }>
            <img className={ styles.profileImage } src={ defaultImage } />
            <div className={ styles.commentInfo }>
                <h3 className={ styles.commentTitle }>{ postUser.username }</h3>
                <p className={ styles.commentText }>Enim ut consequat voluptate ex quis enim eiusmod cillum magna.</p>
                <span className={ styles.commentDate }>17 sem</span>
            </div>
        </div>
    )
}