import { UserProps } from '../constants/loginProps';
import { auth } from '../utils/firebaseClient';

// const ROOT_USER: UserProps = {
//   username: 'rootuser',
//   password: '123456',
//   type: UserTypes.ADMIN,
// }

export const LoginService = () => {

  const loginUser = async ({ email, password, type }: any): Promise<UserProps | null> => {
    // login the user
    let userDetails: UserProps | null;
    
    try {
      const loginUser = await auth.signInWithEmailAndPassword(email.trim(), password);
      if (loginUser) {
        userDetails = {
          id: loginUser.user?.uid,
          email: email,
          username: loginUser.additionalUserInfo?.username ? loginUser.additionalUserInfo?.username : '',
          type: type
        }
        return userDetails;
      } else {
        userDetails = null
        return userDetails;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const createUser = async ({ email, password, username, type }: any): Promise<UserProps | null> => {
    // create user
    let userDetails: UserProps | null;
    try {
      const createUser = await auth.createUserWithEmailAndPassword(email.trim(), password);
      console.log('Create user auth', createUser);
      if (createUser) {
        userDetails = {
          id: createUser.user?.uid,
          email: email,
          username: username,
          type: type
        }
        return userDetails;
      } else {
        userDetails = null
        return userDetails;
      }
    } catch (error) {
      console.error(error);
      return error;
    }

  }

  const logoutUser = async () => {
    await auth.signOut();
  }


  return {
    loginUser,
    logoutUser,
    createUser
  }
}


// export { loginUser };