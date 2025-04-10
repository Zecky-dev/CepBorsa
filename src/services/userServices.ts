import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { BASE_URL } from '../constants';


export const uploadPhoto = async (base64Image: string, uniqueEmail: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/uploadPhoto`, {
      image: base64Image,
      imageName: uniqueEmail,
    });

    if (response.data?.success) {
      const photoUrl = response.data.url;

      await firestore().collection('users').doc(uniqueEmail).update({
        photo: photoUrl,
      });

      return {
        success: true,
        url: photoUrl,
      };
    }
  } catch (error: any) {
    console.log('UPLOAD_PHOTO_ERROR', error);
    throw error;
  }
};

export const deletePhoto = async (stockName: string) => {};
