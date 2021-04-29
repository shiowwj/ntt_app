import { UserProps } from '../constants/loginProps';
import { db } from './firebaseClient';

export const UserDBService = () => {


  // create user 
  const createUserRecord = async (userObject: UserProps): Promise<UserProps | undefined> =>{
    const timeStamp = new Date();
    const userRecord = {
      email: userObject.email,
      username: userObject.username,
      type: userObject.type,
      dateCreated: timeStamp
    }
    try {
      await db
      .collection('users')
      .doc(userObject.id)
      .set(userRecord)

      return userObject;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
  // get user 
  const getUser = async (userObject: UserProps): Promise<UserProps | undefined> => {
    try {
      const userQuery = await db
        .collection('users')
        .doc(userObject.id)
        .get();

      if (userQuery.exists) {

        const data = userQuery.data();
        const userDetails: UserProps = {
          id: userObject.id,
          username: data?.username,
          email: data?.email,
          type: data?.type,
          dateCreated: data?.dateCreated,
        }
        return userDetails;
      } else {
        return undefined;
      }

    } catch (e) {
      console.error(e);
      return e;
    }
  }

  return {
    getUser,
    createUserRecord
  };
};
