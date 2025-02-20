import React from "react";
import AdminTable from "../components/AdminTable";

// Admin page only open to admin, by comparing google account ids

const AdminPage = () => {
  return (
    <div>
      <AdminTable />
    </div>
  );
};

export default AdminPage;
