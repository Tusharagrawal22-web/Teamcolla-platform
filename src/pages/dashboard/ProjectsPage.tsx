// src/pages/dashboard/ProjectsPage.tsx
import { useEffect, useState } from 'react';
import AddProjectModal from '../../components/modals/AddProjectModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Project = {
  _id: string;
  name: string;
  description: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (name: string, description: string) => {
    try {
      if (editingProject) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${editingProject._id}`, {
          name,
          description,
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/projects`, { name, description });
      }

      setShowModal(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="p-6 pt-20 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No projects found.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg text-gray-700">{project.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="flex justify-end gap-3 text-sm">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowModal(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/dashboard/projects/${project._id}/tasks`)}
                  className="text-green-600 hover:underline"
                >
                  View Tasks
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AddProjectModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProject(null);
        }}
        onAdd={handleAddProject}
        project={editingProject}
      />
    </div>
  );
}
