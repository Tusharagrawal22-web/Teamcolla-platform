import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type Task = {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  assignedTo?: string;
};

type TaskState = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

export default function TasksPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<TaskState>({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!projectId) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5174/api/tasks?projectId=${projectId}`);
        const taskGroups: TaskState = { todo: [], inProgress: [], done: [] };
        res.data.forEach((task: Task) => {
          taskGroups[task.status].push(task);
        });
        setTasks(taskGroups);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as keyof TaskState;
    const destCol = destination.droppableId as keyof TaskState;

    const sourceTasks = Array.from(tasks[sourceCol]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    const updatedMovedTask = { ...movedTask, status: destCol };

    const destTasks = Array.from(tasks[destCol]);
    destTasks.splice(destination.index, 0, updatedMovedTask);

    setTasks({
      ...tasks,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks,
    });

    try {
      await axios.put(`http://localhost:5174/api/tasks/${movedTask._id}`, {
        status: destCol,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const createTask = async () => {
    if (!newTaskTitle.trim() || !projectId) return;
    try {
      const res = await axios.post('http://localhost:5174/api/tasks', {
        title: newTaskTitle,
        projectId,
        assignedTo: currentUser?.name || '',
      });

      const newTask = res.data;
      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, newTask],
      }));
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>

      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={createTask}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {(['todo', 'inProgress', 'done'] as (keyof TaskState)[]).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded p-4 min-h-[300px]"
                >
                  <h2 className="text-lg font-semibold capitalize mb-2">
                    {status === 'todo'
                      ? 'To Do'
                      : status === 'inProgress'
                      ? 'In Progress'
                      : 'Done'}
                  </h2>
                  <div className="space-y-2">
                    {tasks[status].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white border rounded p-3 shadow"
                          >
                            <p className="font-medium">{task.title}</p>
                            {task.assignedTo && (
                              <p className="text-xs text-gray-500">
                                Assigned to: {task.assignedTo}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
