import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li>
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        <li>
          <Link to="/admin/add">
         Add Product
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
