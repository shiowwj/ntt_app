import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { GenericFormProps } from '../../constants/genericFormProps';
import { GenericFormDBService } from '../../utils/genericFormDBController';
import { capitializeFirstWord, dateFormatter } from '../../utils/helperFunctions';
import {
  useCurrentSearchResult,
} from '../../hooks/userAuthentication';
import { UserProps } from "../../constants/loginProps";

const ViewFormsComponent: React.FC = () => {
  const useCurrentSearchResultContext = useCurrentSearchResult();
  const { path, url } = useRouteMatch();
  const [formsList, setFormsList] = useState<GenericFormProps[] | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const history = useHistory();

  const fetchFormsList = async () => {
    if (useCurrentSearchResultContext.currentUser !== null) {
      const userType = useCurrentSearchResultContext.currentUser.type;
      if (userType) {
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
    if (formsList == null) {
      fetchFormsList();
    }
  }, [formsList, useCurrentSearchResultContext.currentUser, user])

  const handleApproveForm = async (formObject: GenericFormProps) => {
    const currentApprovalStatus = formObject.approvalStatus;
    if (!currentApprovalStatus) {
      formObject.approvalStatus = true;
      await GenericFormDBService().updateForm(formObject);
    }
  }
  const handleEditForm = async (formObject: GenericFormProps) => {
    const formId = formObject.id;
    // redirect to form edit page 
    console.log('edit this form id', formId);
    history.push(`${path}/editform/${formId}`)
  }
  const handleDeleteForm = async (formObject: GenericFormProps) => {
    await GenericFormDBService().deleteForm(formObject);
  }

  return (
    <section id="viewForms" className="py-2 px-1 flex flex-col">
      <div className="flex justify-center">
        <div className="border-blue-600 bg-blue-300 rounded py-2 px-2 mt-3">
          <Link to={`${url}/createform`}>
            <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Create Forms here
                </span>
          </Link>
        </div>
      </div>
      <div>
        <div className="p-4 border-b-2 border-red-100">
          <h2 className="font-semibold text-2xl text-font_primary_color flex w-full justify-center mt-4">Forms</h2>
        </div>
        {formsList ? formsList.map((item, index) => {
          return (
            <div 
              // onClick={}
              className="flex flex-row mt-4 mx-8 py-4 px-4 border-yellow-900 border-2 rounded-lg justify-between"
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
                  {item.reportContent}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mx-4">
                  { item.dateModified ? dateFormatter(item.dateModified) : dateFormatter(item.dateCreated)}
                </div>
                {item.approvalStatus ?
                  <div
                    className="mx-4 text-green-300">
                    <span>Approved</span>
                  </div> :
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleApproveForm(item);
                    }}
                    className="mx-4 text-blue-300 cursor-pointer">
                    <span>Approve?</span>
                  </div>
                }
                {item.approvalStatus ? 
                  <div
                    className="mx-4 text-gray-400 cursor-not-allowed"
                  >
                  <span>Edit</span>
                </div> :   
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditForm(item);
                  }}
                  className="mx-4 text-yellow-400 cursor-pointer"
                  >
                  <span>Edit</span>
                </div>
                }
                {item.approvalStatus ? 
                <div
                  className="text-gray-400 cursor-not-allowed"
                  >
                  <span>Delete</span>
                </div> :
                <div
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteForm(item);
                  }}>
                  <span>Delete</span>
                </div>
              }
              </div>
            </div>
          )
        }) :
          <>
            <div id="message" className="block my-8 mx-1 py-2 text-center border-error bg-red-200 rounded">
              <span>
                No Records
            </span>
            </div>

          </>
        }
      </div>
    </section>
  )
};

export default ViewFormsComponent;