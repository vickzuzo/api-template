import {toast} from 'sonner';

export type ApiBaseError = {
  body: {
    statusCode: number;
    message: string | string[];
  };
};

export const handleError = (err: ApiBaseError) => {
  const NODE_ENV = import.meta.env.MODE;
  if (NODE_ENV === 'development') {
    console.error(JSON.stringify(err));
  }

  const errorObj = err?.body;
  if (errorObj?.statusCode === 500) {
    toast.error(
      'Sorry Something went wrong. We have logged this error and our engineers are working to fix it as soon as possible. If you need immediate assistance, please contact our support.',
    );
  } else if (
    typeof errorObj?.message === 'object' &&
    errorObj?.message !== null &&
    Array.isArray(errorObj?.message)
  ) {
    toast.error(errorObj?.message[0]);
  } else {
    toast.error(errorObj?.message);
  }
};
