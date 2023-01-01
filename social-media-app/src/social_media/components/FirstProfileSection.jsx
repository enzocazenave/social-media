import styles from '../../styles/social_media/components/FirstProfileSection.module.css';
const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const FirstProfileSection = ({ user, isMine = false }) => {
    const { image, username, name, surname, bio } = user;

    return (
        <div className={ styles.container }>
            <img className={ styles.profileImage } src={ image || defaultImage } />
            
            <div className={ styles.containerData }>
                <div className={ styles.firstLine }>
                    <h3 className={ styles.username }>{ username }</h3>   
                    {(!isMine) 
                        ? (
                            (true)
                                ? <button className={ styles.firstLineButtonFollowed }>Siguiendo</button>
                                : <button className={ styles.firstLineButton }>Seguir</button>
                        )
                        : (
                            <button className={ styles.firstLineButtonFollowed }>Editar perfil</button>
                        )
                    }
                </div>
                <div className={ styles.data }>
                    <div className={ styles.dataItem }>
                        <span className={ styles.dataItemNumber }>73</span>
                        <p className={ styles.dataItemTitle }>publicaciones</p>
                    </div>
                    <div className={ styles.dataItem }>
                        <span className={ styles.dataItemNumber }>1141</span>
                        <p className={ styles.dataItemTitle }>seguidores</p>
                    </div>
                    <div className={ styles.dataItem }>
                        <span className={ styles.dataItemNumber }>959</span>
                        <p className={ styles.dataItemTitle }>seguidos</p>
                    </div>
                </div> 
                <div className={ styles.moreData }>
                    <span className={ styles.moreDataName }>{ name } { surname }</span>
                    <p className={ styles.moreDataBio }>{ bio }</p>
                </div>
            </div>
        </div>
    );
}