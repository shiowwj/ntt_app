import { UserProps, UserTypes } from '../constants/loginProps';
import { db } from './firebaseClient';

export const UserDBService = () => {


  // create user 
  const createUserRecord = async (userObject: UserProps): Promise<UserProps | undefined> =>{
    console.log('user create object', userObject);
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
  //   const objectToCreate = {
  //     cityId: result.cityId,
  //     city: result.city,
  //     country: result.country,
  //     date_of_request: result.date_of_request,
  //   };
  //   try {
  //     await db
  //       .collection('searchHistory')
  //       .add(objectToCreate);
  //     return objectToCreate;
  //   } catch (err) {
  //     console.log(err);
  //   }

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

  // /**
  //  * * Creates a user record in firebase firestore (db)
  //  * */
  // const createSearchResultHistoryItem = async (
  //   result: SearchResultItemProps
  // ) => {
  //   const objectToCreate = {
  //     cityId: result.cityId,
  //     city: result.city,
  //     country: result.country,
  //     date_of_request: result.date_of_request,
  //   };
  //   try {
  //     await db
  //       .collection('searchHistory')
  //       .add(objectToCreate);
  //     return objectToCreate;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // /**
  //  * * Gets all search results (limited to lastest 15 records)
  //  */
  // const getAllSearchResults = async () => {
  //   try {
  //     const query = await db
  //       .collection('searchHistory')
  //       .orderBy('date_of_request', 'desc')
  //       .limit(15)
  //       .get();

  //     const searchHistoryResults: SearchResultItemProps[] = [];

  //     query.docs.map((doc) => {
  //       const item = doc.data();
  //       const id = doc.id;
  //       let typedItem: SearchResultItemProps = {
  //         id: id,
  //         cityId: item.cityId,
  //         city: item.city,
  //         country: item.country,
  //         date_of_request: new Date(
  //           item.date_of_request.seconds * 1000 +
  //             item.date_of_request.nanoseconds / 1000000
  //         ),
  //       };
  //       searchHistoryResults.push(typedItem);
  //     });
  //     if (searchHistoryResults.length === 0) {
  //       return null;
  //     }
  //     return searchHistoryResults;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // /**
  //  * * Updates item's date_of_request by document id
  //  * @param item : Search Result Item
  //  */
  // const updateSearchResult = async (
  //   item: SearchResultItemProps
  // ) => {
  //   try {
  //     const updateRef = await db
  //       .collection('searchHistory')
  //       .doc(item.id);
  //     updateRef.update({
  //       date_of_request: item.date_of_request,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // /**
  //  * * Deletes item by document id
  //  * @param item : Search Result Item
  //  */

  // const deleteSearchResult = async (
  //   item: SearchResultItemProps
  // ) => {
  //   try {
  //     await db
  //       .collection('searchHistory')
  //       .doc(item.id)
  //       .delete();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return {
    getUser,
    createUserRecord
  };
};
