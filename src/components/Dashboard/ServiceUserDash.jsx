import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const role = "SERVICE_USER"; // This should be dynamically determined based on the logged-in user

  return (
    <div>
      <Navbar role={role} />
      {/* The rest of your dashboard content goes here */}
    </div>
  );
};
