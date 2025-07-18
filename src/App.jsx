import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { Sun, Moon, Search, Filter, Users } from "lucide-react";
import { useDarkMode } from "./theme"; // ✅

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useDarkMode(); // ✅
  const darkMode = theme === "dark"; // ✅
  const USERS_PER_PAGE = 12;


  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const filteredUsers = users
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(query.toLowerCase()) &&
        (statusFilter === "All" || user.status === statusFilter)
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const toggleTheme = () => setTheme(darkMode ? "light" : "dark");


  return (
    <main className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 text-slate-800 dark:text-white p-4 sm:p-6">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <Users size={32} />
              User Directory
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          {/* Search, Filter, Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center w-full md:w-[60%] gap-2">
              <Search />
              <input
  type="text"
  placeholder="Search by name"
  className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm 
             focus:ring-2 focus:ring-indigo-400 focus:outline-none 
             dark:bg-gray-700 dark:border-gray-600 
             placeholder-gray-500 dark:placeholder-gray-400"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
            </div>

            <div className="flex gap-3 w-full md:w-[40%]">
              <select
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
              </select>
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-20">
                <p className="text-lg">No users found.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
