import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UiContext } from '../../context/UiContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from '../../styles/social_media/components/Navbar.module.css';
const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const Navbar = () => {

    const { user } = useAuthContext();
    const { setCreatePostModalIsOpen } = useContext(UiContext)

    return (
        <div className={ styles.container }>
            <h1 className={ styles.brand }>HistoryTime</h1>

            <div className={ styles.searchBar }>
                <i className="fas fa-magnifying-glass"></i>

                <input
                    className={ styles.input }
                    type="text"
                    placeholder="Buscar"
                />
            </div>

            <div className={ styles.menu }>
                <NavLink className={ ({ isActive }) => isActive ? styles.menuItemSelected : styles.menuItem } to="/" >
                    <i className='fas fa-home'></i>
                </NavLink>
                <button 
                    className={ styles.menuItem }
                    onClick={ () => setCreatePostModalIsOpen(true) }
                >
                    <i className='far fa-plus-square'></i>
                </button>
                <NavLink className={ ({ isActive }) => isActive ? styles.menuItemSelected : styles.menuItem } to="/explore" >
                    <i className='far fa-compass'></i>
                </NavLink>
                {/*<button className={ ({ isActive }) => isActive ? styles.menuItemSelected : styles.menuItem }>
                    <i className='far fa-heart'></i>
                </button>*/}
                <NavLink className={ ({ isActive }) => isActive ? styles.menuItemSelected : styles.menuItem } to={ `/${ user.username }` }>
                    <img className={ styles.profileImage } src={ user.image || defaultImage } />
                </NavLink>
            </div>
        </div>
    );
}