import {ApiBaseError, handleError} from '@emedic/utils/handleError';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {apiWrapper} from '.';

type ServiceFunction<A, B> = (payload?: A) => Promise<B>;

interface UseGetRequestOptions<A, B> {
  service: ServiceFunction<A, B>;
  payload?: A;
  page?: number;
  limit?: number;
  searchText?: string;
  enabled?: boolean;
  onSuccess?: (val?: B) => void;
  onError?: (val: ApiBaseError) => void;
  tag: string;
}

interface UseGetRequestResult<B> {
  loading: boolean;
  isLoading: boolean;
  refetch: (options?: {throwOnError: boolean; cancelRefetch: boolean}) => Promise<UseQueryResult>;
  data?: B;
  error?: ApiBaseError | null;
}

export function useGetRequest<A, B>({
  service,
  payload,
  onSuccess,
  onError,
  tag,
  enabled = true,
}: UseGetRequestOptions<A, B>): UseGetRequestResult<B> {
  const methodName = service.name;
  const queryKey = [tag, {methodName, payload}];

  const info = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await apiWrapper(() => service(payload));
      return data;
    },
    enabled,
    onSuccess: data => {
      onSuccess?.(data);
    },
    onError: (error: ApiBaseError) => {
      handleError(error);
      onError?.(error);
    },
  });

  return {
    loading: info.isLoading,
    isLoading: info.isLoading,
    refetch: info.refetch,
    data: info.data,
    error: info.error,
  };
}
