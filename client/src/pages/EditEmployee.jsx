import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import employeeService from '../services/employeeService';
import Loading from '../components/Loading';
import { MdArrowBack } from 'react-icons/md';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getEmployee(id);
        setInitialData(data);
      } catch (err) {
        setFetchError('Employee not found or failed to load data.');
      } finally {
        setPageLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);
    setError(null);
    try {
      await employeeService.updateEmployee(id, formData);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) return <Loading />;
  if (fetchError) return <div className="card text-center p-4 error-text">{fetchError}</div>;

  return (
    <div className="edit-employee-page">
      <div className="flex items-center gap-2 mb-4">
        <button className="btn btn-outline" onClick={() => navigate('/employees')} style={{padding: '0.25rem 0.5rem'}}>
          <MdArrowBack />
        </button>
        <h1 className="page-title" style={{marginBottom: 0}}>Edit Employee</h1>
      </div>
      
      <EmployeeForm 
        initialData={initialData}
        onSubmit={handleSubmit} 
        isLoading={submitLoading} 
        serverError={error} 
      />
    </div>
  );
};

export default EditEmployee;
