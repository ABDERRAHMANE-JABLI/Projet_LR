import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API,
    api_secret : process.env.CLOUDINARY_SECRET
});

export async function cloudinaryUploadImage(file){
    try {
        const data = await cloudinary.uploader.upload(file,{
            resource_type : 'auto',
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function cloudinaryRemoveImage(file){
    try {
        const result = await cloudinary.uploader.destroy(file);
        return result;
    } catch (error) {
        console.log(error);
    }
}
