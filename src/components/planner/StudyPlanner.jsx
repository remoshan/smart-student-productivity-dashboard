import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { useTasks } from '../../hooks/useTasks';
import { TASK_STATUS } from '../../data/constants';

/**
 * Study Planner / Task Manager component
 */
export const StudyPlanner = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus, reorderTasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === TASK_STATUS.COMPLETED;
    if (filter === 'active') return task.status !== TASK_STATUS.COMPLETED;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate === today;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by status (completed last), then by due date, then by priority
    if (a.status === TASK_STATUS.COMPLETED && b.status !== TASK_STATUS.COMPLETED) return 1;
    if (a.status !== TASK_STATUS.COMPLETED && b.status === TASK_STATUS.COMPLETED) return -1;
    
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }

    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Study Planner
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks and stay organized
          </p>
        </div>
        <Button onClick={handleAddTask} variant="primary">
          + Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Tasks' },
          { id: 'active', label: 'Active' },
          { id: 'today', label: 'Today' },
          { id: 'completed', label: 'Completed' },
        ].map((filterOption) => (
          <Button
            key={filterOption.id}
            variant={filter === filterOption.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(filterOption.id)}
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Task Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {sortedTasks.length} of {tasks.length} tasks
      </div>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filter === 'all'
              ? "Get started by adding your first task!"
              : `No ${filter} tasks at the moment.`}
          </p>
          {filter === 'all' && (
            <Button onClick={handleAddTask} variant="primary">
              Add Your First Task
            </Button>
          )}
        </Card>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {sortedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <TaskItem
                          task={task}
                          onToggle={toggleTaskStatus}
                          onEdit={handleEditTask}
                          onDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Task Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        size="md"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
};
