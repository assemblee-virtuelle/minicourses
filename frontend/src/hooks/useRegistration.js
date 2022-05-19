import { useGetIdentity, useGetList } from "react-admin";

const useRegistration = record => {
  const { identity } = useGetIdentity();

  const { data, ids, loading, error } = useGetList(
    'Registration',
    { page: 1, perPage: 1000 },
    { field: 'pair:startDate', order: 'DESC' },
    { 'tutor:learner': identity?.id, 'tutor:course': record?.id },
    { enabled: !!(identity?.id && record?.id) }
  );

  if( loading || error || ids.length === 0 ) {
    return null;
  } else {
    return data[ids[0]];
  }
};

export default useRegistration;
