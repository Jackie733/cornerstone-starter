import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import request from '@/utils/request';

const fetcher = (url: string) => request.get(url).then((r) => r.data);

function StudyList() {
  const { data, error } = useSWR('/smart/patients', fetcher);
  console.log(data, error);

  return (
    <>
      <h2>Study List</h2>
      <Button>Click me</Button>
    </>
  );
}

export default StudyList;
