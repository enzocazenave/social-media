import { useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import { UiContext } from '../../context/UiContext';
import { uploadImage } from '../../helpers';
import { useForm, usePosts } from '../../hooks';
import styles from '../../styles/social_media/components/CreatePostModal.module.css';
import { Loader } from './';

Modal.setAppElement('#root');

const initialForm = { title: '' };

export const CreatePostModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { createPostModalIsOpen, setCreatePostModalIsOpen } = useContext(UiContext);
    const [isImageInMemory, setIsImageInMemory] = useState(false);
    const { title, onInputChange, onResetForm } = useForm(initialForm);
    const { uploadPost } = usePosts();
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef();

    const resetStatesHooks = () => {
        setIsImageInMemory(false);
        setSelectedImage(null);
        setCreatePostModalIsOpen(false);
        onResetForm();
    }

    const onPublishPost = () => {
        setIsLoading(true);

        uploadImage(selectedImage).then(({ ok, url = undefined }) => {
            if (!ok) return resetStatesHooks();
        
            uploadPost({ url, title });
            resetStatesHooks();
            setIsLoading(false);
        });
    };

    return (
        <Modal
            isOpen={ createPostModalIsOpen }
            className={ styles.modal }
            overlayClassName={ styles.modalBackground }
            closeTimeoutMS={ 200 }
        >
            {(isLoading)
                ? <Loader />
                : <>
                    <input
                        type="file"
                        ref={ fileInputRef }
                        hidden
                        onChange={ (e) => {
                            setSelectedImage(e.target.files[0]);
                            setIsImageInMemory(true);
                        }}
                    />

                    <nav className={ styles.modalNav }>
                        <h2 className={ styles.modalTitle }>Crea una publicación</h2>

                        <button 
                            className={ styles.modalClose }
                            onClick={ () => { 
                                setCreatePostModalIsOpen(false);

                                setTimeout(() => {
                                    setSelectedImage(null);
                                    setIsImageInMemory(false);
                                }, 500);    
                            }}
                        >
                            <i className='fas fa-close'></i>
                        </button>
                    </nav>
                    
                    {(!isImageInMemory) 
                        ? (
                            <div className={ styles.selectImageContainer }>
                                <i className='fas fa-images'></i>
                                <h3 className={ styles.selectImageTitle }>Selecciona las fotos aquí</h3>
                                <button 
                                    className={ styles.selectImage }
                                    onClick={ () => fileInputRef.current.click() }
                                >
                                    Seleccionar de la computadora
                                </button>
                            </div>    
                        )
                        : (
                            <div className={ styles.createPostContainer }>
                                <div className={ styles.createPostContainerGrid }>
                                    <img 
                                        className={ styles.previewImage }
                                        src={ URL.createObjectURL(selectedImage) } 
                                    />

                                    <div className={ styles.postInfo }>
                                        <input 
                                            type="text" 
                                            className={ styles.postTitleInput } 
                                            placeholder="Agrega un pie de foto..."
                                            name="title"
                                            value={ title }
                                            onChange={ onInputChange }
                                        />
                                    </div>
                                </div>
                                <button
                                    className={ styles.postButton }
                                    onClick={ onPublishPost }
                                >
                                    Publicar
                                </button>
                            </div>
                        )
                    }       
                </>
            }
        </Modal>
    )
}