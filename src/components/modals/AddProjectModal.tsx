// src/components/modals/AddProjectModal.tsx
import { useEffect, useState } from 'react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string) => void;
  project: { _id?: string; name: string; description: string } | null;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
  project,
}: AddProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [project]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {project ? 'Edit Project' : 'Add Project'}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project name"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Project description"
            className="w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(name, description)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {project ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
