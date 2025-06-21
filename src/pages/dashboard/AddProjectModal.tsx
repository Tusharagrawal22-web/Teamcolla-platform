import { useEffect, useState } from 'react';

interface Project {
  _id?: string;
  name: string;
  description: string;
}

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string) => void;
  project?: Project | null;
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{project ? 'Edit' : 'Add'} Project</h2>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => onAdd(name, description)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {project ? 'Update' : 'Add'}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
