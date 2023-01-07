import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePosts } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import styles from '../../styles/social_media/pages/FullscreenPost.module.css';
import { Comment } from '../components/';

const defaultImage = 'https://fondosmil.com/fondo/17010.jpg';
const initialForm = { comment: '' };

export const FullscreenPost = () => {

    const { postId } = useParams();
    const { comment, onInputChange } = useForm(initialForm);
    const [post, setPost] = useState({});
    const { getPostById } = usePosts();

    useEffect(() => {
        getPostById(postId).then(post => setPost(post));
    }, []);

    return (
        <div className="container">
            <div className={ styles.container }>
                <img src={ post.image } className={ styles.leftContainer } />

                <div className={ styles.rightContainer }>
                    <div className={ styles.rightContainerHeader }>
                        <div className={ styles.rightContainerHeaderLeft }>
                            <img src={ defaultImage } className={ styles.profileImage } />
                            <div>
                                <Link to={ `/${ post.username }` } className={ styles.profileUsername }>{ post.username }</Link>
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
                        <Comment />
                        <Comment />
                    </div>

                    <div className={ styles.footer }>
                        <div className={ styles.footerButtons }>
                            <div className={ styles.footerButtonsLeft }>
                                <button className={ styles.footerButton }>
                                    <i className='far fa-heart'></i>
                                </button>
                                <button className={ styles.footerButton }>
                                    <i className='far fa-comment'></i>
                                </button>
                                <button className={ styles.footerButton }>
                                    <i className='far fa-paper-plane'></i>
                                </button>
                            </div>
                            <button className={ styles.footerButton }>
                                <i className='far fa-bookmark'></i>
                            </button>
                        </div>

                        <div className={ styles.footerTextContainer }>
                            <p className={ styles.footerText }>
                                Le gusta a
                                <span className={ styles.footerTextSpan }>
                                    &nbsp;boriscazenave y 238 personas más.
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
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}