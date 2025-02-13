const MyAppointments = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Profile</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="min-w-full text-left text-gray-500">
          <div>
            <div className="mb-4 px-4">
              <label>
                Name : <span>{user?.name}</span>
              </label>
            </div>
            <div className="mb-4 px-4">
              <label>
                Id : <span>{user?.id}</span>
              </label>
            </div>
            <div className="mb-4 px-4">
              <label>
                Email :<span>{user?.email}</span>
              </label>
            </div>
            <div className="mb-4 px-4">
              <label>
                Role : <span>{user?.role}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
