import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/social_media/components/ThirdProfileSection.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Post } from './';
import { usePosts } from '../../hooks';

export const ThirdProfileSection = ({ isMine = false }) => {

    const { getAllPostsByUsername } = usePosts();
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getAllPostsByUsername(location.pathname.split('/')[1]).then(res => setPosts(res));
    }, []);

    return (
        <div className={ styles.container }>
            <hr className={ styles.line } />

            <div className={ styles.buttonContainer }>
                {(isMine) && (
                    <Link to={ `/${ useContext(AuthContext).user.username }/saved` } className={ styles.button }>
                        <i className="far fa-bookmark"></i>
                        Ver publicaciones guardadas
                    </Link>
                )}
            </div>


            <div className={ styles.postsContainer }>
                {posts.map(post => (
                    <Post 
                        key={ post._id } 
                        postId={ post._id }
                        image={ post.image }
                    />
                ))}

                { posts.length === 0 && <h1>No hay publicaciones</h1> }
            </div>
        </div>
    );
}