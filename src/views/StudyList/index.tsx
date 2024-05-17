import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

function StudyList() {
  useEffect(() => {
    redirect('/viewer');
  }, []);

  return (
    <>
      <h2>Study List</h2>
    </>
  );
}

export default StudyList;
