import Wrapper from "../assets/wrappers/AdminDashboard";

const AdminDashboard = ({ queryClient }) => {
  return (
    <Wrapper>
      <div className="admin-dashboard-container">
        <div className="container">
          <h1>This is Admin Dashboard</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
