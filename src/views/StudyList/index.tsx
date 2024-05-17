import { useNavigate } from 'react-router-dom';

function StudyList() {
  const navigate = useNavigate();

  navigate('/viewer');

  return <h2>TODO: Study List</h2>;
}

export default StudyList;
