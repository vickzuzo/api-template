import {ApiBaseError, handleError} from '@emedic/utils/handleError';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiWrapper} from '.';

type ServiceFunction<A, B> = (payload: A) => Promise<B>;

interface UseGetRequestOptions<A, B> {
  service: ServiceFunction<A, B>;
  payload?: A;
  onError?: (val?: ApiBaseError) => void;
  tag: string;
  invalidate?: boolean;
  onSuccess?: (val?: B) => void;
}

interface UseGetRequestResult<A, B> {
  loading: boolean;
  isLoading: boolean;
  data?: B;
  error?: ApiBaseError | null;
  trigger: (payload: A) => void;
  isMutating?: boolean;
}

export function useMutateRequest<A, B>({
  service,
  tag,
  onSuccess,
  onError,
  invalidate = true,
}: UseGetRequestOptions<A, B>): UseGetRequestResult<A, B> {
  const queryClient = useQueryClient();

  const info = useMutation({
    mutationFn: (payload: A) => apiWrapper(() => service(payload)),
    onSuccess: data => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (invalidate) {
        queryClient.invalidateQueries({queryKey: [tag]});
      }
    },
    onError: (error: ApiBaseError) => {
      handleError(error);
      onError?.(error);
    },
  });

  return {
    loading: info.isLoading,
    isLoading: info.isLoading,
    isMutating: info.isLoading,
    data: info.data,
    trigger: info.mutate,
    error: info.error,
  };
}
