// eslint-disable-next-line import/no-extraneous-dependencies
import {ErrorResponse} from '@remix-run/router';
import {useRouteError} from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="relative p-8 overflow-hidden gap-5 flex items-center justify-center flex-col h-[100vh] max-h-[100vh]">
      <h1 className="text-2xl font-extrabold ">{error?.statusText || 'Well this is unexpected'}</h1>
      <div className="" />

      <div className="w-1/2 text-center font-normal">
        {error?.status === 404 ? (
          <p className="">{error?.data}</p>
        ) : (
          <>
            <p>
              Sorry, an unexpected error occurred. We have logged this error and our engineers will
              investigate and fix it as soon as possible. If you need immediate assistance, please
              contact our support.
            </p>
            <p>Thank you for your patience.</p>
          </>
        )}
      </div>

      <div className="py-5" />
      <div className="flex justify-center">
        {/* <button
          prefixIcon={<i className=" saf-arrow-left" />}
          onClick={() => history.back()}
          btnText="Go Back"
        /> */}
      </div>
    </div>
  );
};

export default ErrorBoundary;
