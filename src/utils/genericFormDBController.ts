import { UserTypes } from '../constants/loginProps';
import { GenericFormProps } from '../constants/genericFormProps';
import { db } from './firebaseClient';

export const GenericFormDBService = () => {

  // create form 
  const createForm = async(formObject: GenericFormProps): Promise<GenericFormProps|undefined> => {

    const timestamp = new Date();
    const formRecord: GenericFormProps = {
      username: formObject.username,
      dateCreated: timestamp,
      reportContent: formObject.reportContent,
      approvalStatus: formObject.approvalStatus
    }
    try{
      await db
      .collection('genericforms')
      .add(formRecord)
      return formRecord;
    } catch (e){
      console.error(e);
      return e;
    }
  }

  // get form by id
  const getForm = async (formObject: GenericFormProps): Promise<GenericFormProps|undefined>=>{
    try {
      const formQuery = await db
      .collection('genericforms')
      .doc(formObject.id)
      .get()

      if(formQuery.exists){
        const data = formQuery.data();
        const formDetails: GenericFormProps = {
          id: formObject.id,
          username: data?.username,
          dateCreated: new Date(
            data?.dateCreated.seconds * 1000 + data?.dateCreated.nanoseconds / 1000000,
          ),
          approvalStatus: data?.approvalStatus,
          reportContent: data?.reportContent,
          dateModified: data?.dateModified? new Date(
            data?.dateModified.seconds * 1000 + data?.dateModified.nanoseconds / 1000000,
          ): undefined,
        }
        return formDetails;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error(e);
      return e;
    }

  }

  // get all forms 
  const getAllForms = async(type: string) => {
    try {
      
      const genericFormsResults: GenericFormProps[] = [];
      // let query; 
      if(type === UserTypes.NORMAL ){
        const query = await db
        .collection('genericforms')
        .where("approvalStatus", "==", true) 
        .orderBy('dateCreated', 'desc')
        .limit(15)
        .get()
        query.docs.map((doc)=>{
          const item = doc.data();
          const id = doc.id;
          let mappedItem: GenericFormProps = {
            id: id,
            username: item.username,
            reportContent: item.reportContent,
            approvalStatus: item.approvalStatus,
            dateCreated: new Date(
              item.dateCreated.seconds * 1000 + item.dateCreated.nanoseconds / 1000000,
            ),
            dateModified: item.dateModified?  new Date(
              item.dateModified.seconds * 1000 + item.dateModified.nanoseconds / 1000000,
            ): undefined ,   
          }
          genericFormsResults.push(mappedItem);
        });
      } else {
        const query = await db
        .collection('genericforms')
        .orderBy('dateCreated', 'desc')
        .limit(15)
        .get()
        query.docs.map((doc)=>{
          const item = doc.data();
          const id = doc.id;
          let mappedItem: GenericFormProps = {
            id: id,
            username: item.username,
            reportContent: item.reportContent,
            approvalStatus: item.approvalStatus,
            dateCreated: new Date(
              item.dateCreated.seconds * 1000 + item.dateCreated.nanoseconds / 1000000,
            ),
            dateModified: item.dateModified?  new Date(
              item.dateModified.seconds * 1000 + item.dateModified.nanoseconds / 1000000,
            ): undefined ,   
          }
          genericFormsResults.push(mappedItem);
        });
      }
  
      if(genericFormsResults.length === 0) {
        return null;
      }
      return genericFormsResults;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  const updateForm = async(formObject: GenericFormProps) =>{
    const timestamp = new Date();
    try {
      const updateRef = await db
      .collection('genericforms')
      .doc(formObject.id);
      
      updateRef.update({
        username: formObject.username,
        dateModified: timestamp,
        reportContent: formObject.reportContent,
        approvalStatus: formObject.approvalStatus,
      })
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  const deleteForm = async (formObject: GenericFormProps) => {
    try{
      await db
      .collection('genericforms')
      .doc(formObject.id)
      .delete()
    } catch (e){
      console.error(e);
    }
  }


  return {
    getAllForms,
    createForm,
    getForm,
    updateForm,
    deleteForm
  }  
}
