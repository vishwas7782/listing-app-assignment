import { Mail, Phone, UserCircle2, BadgeCheck } from "lucide-react";

function UserCard({ user }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-700 p-5 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <UserCircle2 size={42} className="text-indigo-600 dark:text-indigo-400" />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p
            className={`text-sm ${
              user.status === "Active" ? "text-green-600" : "text-red-500"
            } flex items-center gap-1`}
          >
            <BadgeCheck size={16} />
            {user.status}
          </p>
        </div>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
        <p className="flex items-center gap-2">
          <Mail size={16} />
          {user.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} />
          {user.mobile}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
