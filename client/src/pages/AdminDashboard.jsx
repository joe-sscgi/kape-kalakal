import Wrapper from "../assets/wrappers/AdminDashboard";
import { useAdminDashboardLayoutContext } from "./AdminDashboardLayout";

const AdminDashboard = () => {
  const { user } = useAdminDashboardLayoutContext();
  return (
    <Wrapper>
      <div className="admin-dashboard-container">
        <div className="container">
          <h1>Hello {user.userUsername}</h1>

          <h1>This is Admin Dashboard</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
