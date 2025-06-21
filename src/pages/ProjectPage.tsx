import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Project = {
  _id: string;
  name: string;
  description: string;
};

type Task = {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  assignedTo?: string;
};

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5174/api/projects/${projectId}`);
      setProject(res.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5174/api/tasks?projectId=${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchTasks();
    }
  }, [projectId]);

  return (
    <div className="p-6 pt-20 bg-white min-h-screen">
      {project ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-600 mb-6">{project.description}</p>

          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found for this project.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task._id} className="p-4 border rounded bg-gray-100">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-600 capitalize">Status: {task.status}</div>
                  {task.assignedTo && (
                    <div className="text-sm text-gray-500">Assigned to: {task.assignedTo}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading project...</p>
      )}
    </div>
  );
}
