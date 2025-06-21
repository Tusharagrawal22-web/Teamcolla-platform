// src/pages/dashboard/TeamPage.tsx
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'member';
};

type Activity = {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
};

const dummyUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'manager' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'member' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'member' },
];

const dummyActivities: Activity[] = [
  { id: 'a1', userId: '1', message: 'Assigned task: Design login UI', timestamp: '2025-06-20 10:00 AM' },
  { id: 'a2', userId: '2', message: 'Moved task: Dashboard layout to Done', timestamp: '2025-06-20 11:15 AM' },
  { id: 'a3', userId: '3', message: 'Sent message in Chat', timestamp: '2025-06-20 11:45 AM' },
];

export default function TeamPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setUsers(dummyUsers);
    setActivities(dummyActivities);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Team Overview</h1>
      <p className="text-gray-600">Team member roles and activity logs will be displayed here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Team Members */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="p-4 border rounded bg-gray-50">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm">
                  Role: <span className="capitalize font-semibold">{user.role}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity Logs */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Activity Logs</h2>
          <ul className="space-y-4">
            {activities.map((activity) => {
              const user = users.find((u) => u.id === activity.userId);
              return (
                <li key={activity.id} className="p-4 border rounded bg-gray-50">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{user?.name || 'Unknown User'}:</span> {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
