import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { GenericFormProps } from '../../constants/genericFormProps';
import { GenericFormDBService } from '../../utils/genericFormDBController';

const CreateFormComponent: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ username: string; reportContent: string; dateOfReport: string; timeOfReport: string }>();
  // const [formSubmitErrors, setFormSubmitErrors] = useState([]);
  const history = useHistory();

  const handleFormSubmitAction = handleSubmit(async (data) => {

    const timeStamp = new Date(data.dateOfReport + 'T' + data.timeOfReport)
    // clear form submit erros
    // setFormSubmitErrors([]);
    const formObject: GenericFormProps = {
      username: data.username,
      reportContent: data.reportContent,
      dateCreated: timeStamp,
      approvalStatus: false
    }

    const createFormDBResult = await GenericFormDBService().createForm(formObject);

    if (createFormDBResult !== undefined && createFormDBResult.username) {
      history.push('/dashboard');
    }
  })

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form className="mt-8 min-w-75vw">
        <div className="flex mt-3 justify-between flex-col md:flex-row">

          <div>
            <label htmlFor="username">
              Username:
          </label>
            <input
              id="username"
              type="text"
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              {...register("username", {
                required: true
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
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Time"
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
            onClick={handleFormSubmitAction}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Form
						</button>
        </div>

      </form>

    </div>
  )
};

export default CreateFormComponent;