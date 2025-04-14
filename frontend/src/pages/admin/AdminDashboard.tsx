  function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Users</h2>
                        <p className="text-gray-600">Manage all users in the system.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Reports</h2>
                        <p className="text-gray-600">View system reports and analytics.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Settings</h2>
                        <p className="text-gray-600">Configure system settings and preferences.</p>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4 mt-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;