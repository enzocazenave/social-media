import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from '../../styles/social_media/components/Navbar.module.css';
//https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg
const defaultImage = 'https://avatars.githubusercontent.com/u/102680110?v=4';

export const Navbar = () => {

    const { user } = useAuthContext();
    const [focused, setFocused] = useState(false);

    return (
        <div className={ styles.container }>
            <h1 className={ styles.brand }>HistoryTime</h1>

            <div className={ styles.searchBar }>
                { (!focused) && <i className="fas fa-magnifying-glass"></i> }

                <input
                    className={ styles.input }
                    type="text"
                    placeholder="Buscar"
                    onFocus={ () => setFocused(true) }
                    onBlur={ () => setFocused(false) }
                />
            </div>

            <div className={ styles.menu }>
                <Link className={ styles.menuItem } to="/" >
                    <i className='fas fa-home'></i>
                </Link>
                <button className={ styles.menuItem }>
                    <i className='far fa-plus-square'></i>
                </button>
                <Link className={ styles.menuItem } to="/explore" >
                    <i className='far fa-compass'></i>
                </Link>
                <button className={ styles.menuItem }>
                    <i className='far fa-heart'></i>
                </button>
                <button className={ styles.menuItem }>
                    <img className={ styles.profileImage } src={ user.image || defaultImage } />
                </button>
            </div>
        </div>
    );
}