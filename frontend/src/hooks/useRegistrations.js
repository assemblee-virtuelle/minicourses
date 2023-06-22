import { useGetIdentity, useGetList } from "react-admin";

const useRegistrations = () => {
  const { identity } = useGetIdentity();

  const { data, isLoading } = useGetList(
    'Registration',
    { page: 1, perPage: 1000 },
    { field: 'pair:startDate', order: 'DESC' },
    { 'tutor:registrant': identity?.id },
    { enabled: !!(identity?.id) }
  );

  if( isLoading || data.length === 0 ) {
    return [];
  } else {
    return Object.values(data);
  }
};

export default useRegistrations;
