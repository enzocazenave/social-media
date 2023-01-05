const cloudUrl = 'https://api.cloudinary.com/v1_1/dnf8818au/upload';

export const uploadImage = async(image) => {
    if (!image) return { ok: false };

    const formData = new FormData();
    
    formData.append('upload_preset', 'social-media');
    formData.append('file', image);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) return { ok: false };

        const responseJson = await response.json();

        return {
            ok: true,
            url: responseJson.secure_url
        };
    } catch(error) {
        return { ok: false };
    }
}