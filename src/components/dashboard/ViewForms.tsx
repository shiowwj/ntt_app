import React, { useEffect, useState } from "react";
import { GenericFormProps } from '../../constants/genericFormProps';
import { GenericFormDBService } from '../../utils/genericFormDBController';
import { capitializeFirstWord, dateFormatter } from '../../utils/helperFunctions';
import {
	useCurrentSearchResult,
} from '../../hooks/userAuthentication';
import { UserProps } from "../../constants/loginProps";

const ViewFormsComponent: React.FC = () => {
	const useCurrentSearchResultContext = useCurrentSearchResult();
  const [formsList, setFormsList] = useState<GenericFormProps[] | null>(null);
	const [user, setUser] = useState<UserProps | null>(null);
	// const [isAdmin, setIsAdmin] = useState(false);

  const fetchFormsList = async () => {
    if (useCurrentSearchResultContext.currentUser !== null) {
			const userType = useCurrentSearchResultContext.currentUser.type;
      if(userType){
        const formsResultsList = await GenericFormDBService().getAllForms(userType);
        if (formsResultsList) {
          if (formsResultsList.length > 0) {
            setFormsList(formsResultsList);
          }
        }
      }
    }
  }

  useEffect(() => {
		setUser(useCurrentSearchResultContext.currentUser);
    // fetch forms 
    fetchFormsList();
  }, [formsList])

  const handleApproveForm = async (formObject: GenericFormProps) => {
    const currentApprovalStatus = formObject.approvalStatus;
    if(!currentApprovalStatus){
      formObject.approvalStatus = true;
      await GenericFormDBService().updateForm(formObject);
    }
  }
  const handleEditForm = async (formObject: GenericFormProps) => {
    const formId = formObject.id;
   // redirect to form edit page 
    console.log('edit this form id', formId);

    
  }
  const handleDeleteForm = async (formObject: GenericFormProps) => {
    await GenericFormDBService().deleteForm(formObject);
  }

  return (
    <section id="viewForms" className="py-2 px-1 flex flex-col">
      <div>
        <div className="p-4 border-b-2 border-red-100">
          <h2 className="font-semibold text-2xl text-font_primary_color flex w-full justify-center mt-4">View Forms</h2>
        </div>
        {/* <SearchWeatherForm /> */}
        {/* <hr className="mt-8"></hr> */}
        {formsList ? formsList.map((item, index) => {
          return (
            <div className="flex flex-row mt-4 mx-8 py-4 px-4 border-yellow-900 border-2 rounded-lg justify-between"
              key={index}>
              <div className="flex flex-row">
                <div>
                  {index + 1}.
                </div>
                <div className="mx-4">
                  {capitializeFirstWord(item.username)}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mx-4">
                  {dateFormatter(item.dateCreated)}
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleApproveForm(item);
                  }}
                  className="mx-4">
                  <span>Approve</span>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditForm(item);
                  }}
                  className="mx-4">
                  
                  <span>Edit</span>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteForm(item);
                  }}>
                  <span>Delete</span>
                </div>
              </div>
            </div>
          )
        }) :
          <div id="message" className="block my-8 mx-1 py-2 text-center border-error bg-red-200 rounded">
            <span>
              No Records
            </span>
            <button>
              Create from here
            </button>
          </div>
        }
      </div>
    </section>
  )
};

export default ViewFormsComponent;