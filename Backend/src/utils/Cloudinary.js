import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.Cloud_NAME, 
    api_key: process.env.API_kEY, 
    api_secret:  process.env.API_SECRETE
});
export default cloudinary