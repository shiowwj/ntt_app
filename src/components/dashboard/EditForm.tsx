import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GenericFormProps } from '../../constants/genericFormProps';
import { GenericFormDBService } from '../../utils/genericFormDBController';
import { dateFormatter } from '../../utils/helperFunctions';


const EditFormComponent: React.FC = () => {

  const { formId } = useParams<{ formId: string }>();
  const [formData, setFormData] = useState<GenericFormProps | null>(null);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ username: string; reportContent: string; dateOfReport: string; timeOfReport: string; }>();

  const getFormDetails = async (id: string) => {
    const getFormDBResult = await GenericFormDBService().getFormById(id);
    if (getFormDBResult !== undefined && getFormDBResult.id) {
      const formObject: GenericFormProps = {
        id: id,
        username: getFormDBResult.username,
        dateCreated: getFormDBResult.dateCreated,
        dateModified: getFormDBResult.dateModified,
        approvalStatus: getFormDBResult.approvalStatus,
        reportContent: getFormDBResult.reportContent
      }
      setFormData(formObject);
    }
  }

  useEffect(() => {
    if (formData == null) {
      getFormDetails(formId)
    }
  }, [formData, formId])

  const handleFormUpdateAction = handleSubmit(async (data) => {
    console.log('update form date', data)
    const timeStamp = new Date(data.dateOfReport + 'T' + data.timeOfReport)
    const formObject: GenericFormProps = {
      id: formId,
      username: data.username,
      dateModified: timeStamp,
      reportContent: data.reportContent,
      approvalStatus: false
    }
    GenericFormDBService().updateForm(formObject);
    history.push('/dashboard');
  })

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form className="mt-8 min-w-75vw">
        <div className="flex mt-3 justify-between">

          <div>
            <label htmlFor="username">
              Username:
          </label>
            <input
              id="username"
              type="text"
              defaultValue={formData?.username}
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              {...register("username", {
                required: true,
              })

              }
            />
            {errors?.username?.type === "required" && (
              <div className="mt-2 text-xs text-red-600">
                <p>Username is required</p>
              </div>
            )}
          </div>
          <div className="flex flex-row">
            <div>
              <label htmlFor="dateOfReport">
                Date:
               </label>
              <input
                id="dateOfReport"
                type="date"
                defaultValue={formData?.dateModified ? dateFormatter(formData?.dateModified, 'date') : dateFormatter(formData?.dateCreated, 'date')}
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date"
                {...register("dateOfReport", {
                  required: true
                })

                }
              />
              {errors?.dateOfReport?.type === "required" && (
                <div className="mt-2 text-xs text-red-600">
                  <p>Date is required</p>
                </div>
              )}

            </div>
            <div>
              <label htmlFor="timeOfReport">
              Time:
               </label>
              <input
                id="timeOfReport"
                type="time"
                defaultValue={ formData?.dateModified ? dateFormatter(formData?.dateModified, 'time') : dateFormatter(formData?.dateCreated, 'time')}
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date"
                {...register("timeOfReport", {
                  required: true
                })

                }
              />
              {errors?.timeOfReport?.type === "required" && (
                <div className="mt-2 text-xs text-red-600">
                  <p>Time is required</p>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="reportContent">
            Report Content:
          </label>
          <textarea
            id="reportContent"
            defaultValue={formData?.reportContent}
            className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Report Content"
            {...register("reportContent", {
              required: true
            })
            }
          />
        </div>
        {errors?.username?.type === "required" && (
          <div className="mt-2 text-xs text-red-600">
            <p>Submitting an empty form?</p>
          </div>
        )}

        {/* FORM SUBMIT BUTTON*/}
        <div className="mt-3">
          <button
            type="submit"
            onClick={handleFormUpdateAction}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Form
						</button>
        </div>

      </form>

    </div>
  )
};

export default EditFormComponent;