import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext, usePosts } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import styles from '../../styles/social_media/pages/FullscreenPost.module.css';
import { Comment } from '../components/';
import { LoaderPage } from './';

const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const initialForm = { comment: '' };

export const FullscreenPost = () => {

    const { postId } = useParams();

    const [post, setPost] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likesCounter, setLikesCounter] = useState(0);
    const [likeTimeout, setLikeTimeout] = useState(false);
    const [comments, setComments] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [saveTimeout, setSaveTimeout] = useState(false);
    const [isReadyToShow, setIsReadyToShow] = useState(false);

    const { user } = useAuthContext();
    const { comment, onInputChange, onResetForm } = useForm(initialForm);
    const { getPostById, likePostById, commentPostById, savePostById } = usePosts();
    
    useEffect(() => {
        getPostById(postId).then(post => {
            setPost(post);
            setIsLiked(post.likes.some(like => like == user.username));
            setIsSaved(post.usersThatSave.some(username => username == user.username));
            setLikesCounter(post.likes.length);
            setComments(post.comments);
            setIsReadyToShow(true);
        });
    }, []);

    useEffect(() => {
        if (likeTimeout) {
            setTimeout(() => {
                setLikeTimeout(false);
            }, 2000);
        }

        if (saveTimeout) {
            setTimeout(() => {
                setSaveTimeout(false);
            }, 2000)
        }
    }, [likeTimeout, saveTimeout]);

    const handleLike = () => {
        if (!likeTimeout) {
            setLikeTimeout(true);
            likePostById(postId);

            if (isLiked) { 
                setLikesCounter((likesCounter) => likesCounter - 1);
            } else {
                setLikesCounter((likesCounter) => likesCounter + 1);
            }

            setIsLiked(!isLiked);
        }
    };

    const handleComment = () => {
        commentPostById(postId, comment).then(res => {
            if (res.ok) {
                delete res.ok;
                setComments((comments) => [...comments, res]);
                onResetForm();
                return;
            }

            console.log(res);
        });
    }

    const handleSave = () => {
        if (!saveTimeout) {
            setSaveTimeout(true);
            savePostById(postId);
            setIsSaved(!isSaved);
        }
    }

    return (

        <div className="container">
            <>
                {
                    isReadyToShow 
                    ? (
                        <div className={ styles.container }>
                            <img src={ post.image } className={ styles.leftContainer } />

                            <div className={ styles.rightContainer }>
                                <div className={ styles.rightContainerHeader }>
                                    <div className={ styles.rightContainerHeaderLeft }>
                                        <img src={ post.user?.image || defaultImage } className={ styles.profileImage } />
                                        <div>
                                            <Link to={ `/${ post.user?.username }` } className={ styles.profileUsername }>{ post.user?.username }</Link>
                                            <p style={{
                                                fontSize: '.8em',
                                                marginTop: '.3rem'
                                            }}>
                                                { post.title }
                                            </p>
                                        </div>
                                        
                                    </div>
                                        
                                    <button className={ styles.options }>
                                        <i className='fas fa-stream	'></i>
                                    </button>
                                </div>
                                        
                                <div className={ styles.comments }>
                                    {
                                        comments.map(commentData => (
                                            <Comment key={ commentData.id } comment={ commentData.comment } user={ commentData.user } />
                                        ))
                                    }
                                </div>
                                
                                <div className={ styles.footer }>
                                    <div className={ styles.footerButtons }>
                                        <div className={ styles.footerButtonsLeft }>
                                            <button 
                                                className={ `${styles.footerButton} ${isLiked && styles.footerButtonLiked}` }
                                                onClick={ handleLike }
                                            >
                                                { 
                                                    isLiked 
                                                        ? <i className='fas fa-heart'></i> 
                                                        : <i className='far fa-heart'></i>  
                                                }
                                            </button>
                                            <button className={ styles.footerButton }>
                                                <i className='far fa-paper-plane'></i>
                                            </button>
                                        </div>
                                        <button 
                                            className={ styles.footerButton }
                                            onClick={ handleSave }
                                        >
                                            {
                                                isSaved
                                                    ? <i className='fas fa-bookmark'></i>
                                                    : <i className='far fa-bookmark'></i>
                                            }
                                        </button>
                                    </div>
                                        
                                    <div className={ styles.footerTextContainer }>
                                        <p className={ styles.footerText }>
                                            Le gusta a
                                            <span className={ styles.footerTextSpan }>
                                                &nbsp;{ likesCounter } 
                                                { (likesCounter === 1) ? ' persona' : ' personas' }
                                            </span>
                                        </p>
                                        
                                        <p className={ styles.footerTextDate }>
                                            SEPTIEMBRE 3, 2023
                                        </p>
                                    </div>
                                        
                                        
                                    <div className={ styles.footerPostComment }>
                                        <input 
                                            className={ styles.footerPostCommentInput } 
                                            type="text" 
                                            placeholder='Agrega un comentario...'
                                            name="comment"
                                            value={ comment }
                                            onChange={ onInputChange }
                                        />

                                        <button 
                                            className={` 
                                                ${ styles.footerPostCommentButton }
                                                ${ (comment.length === 0) ? styles.footerPostCommentButtonDisabled : null }
                                            `}
                                            onClick={ handleComment }
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )   
                    : <LoaderPage />
                }
            </>
        </div>
    );
}