import { useState, useEffect } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { PRIORITIES, PRIORITY_LABELS, TASK_STATUS, TASK_STATUS_LABELS, SUBJECTS } from '../../data/constants';
import { getToday } from '../../utils/dateUtils';

/**
 * Task form component for adding/editing tasks
 */
export const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: SUBJECTS[0],
    priority: PRIORITIES.MEDIUM,
    dueDate: getToday(),
    status: TASK_STATUS.TODO,
    description: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        subject: task.subject || SUBJECTS[0],
        priority: task.priority || PRIORITIES.MEDIUM,
        dueDate: task.dueDate || getToday(),
        status: task.status || TASK_STATUS.TODO,
        description: task.description || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  const priorityOptions = Object.values(PRIORITIES).map((p) => ({
    value: p,
    label: PRIORITY_LABELS[p],
  }));

  const statusOptions = Object.values(TASK_STATUS).map((s) => ({
    value: s,
    label: TASK_STATUS_LABELS[s],
  }));

  const subjectOptions = SUBJECTS.map((s) => ({
    value: s,
    label: s,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          options={subjectOptions}
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="input-field"
          placeholder="Add task description..."
        />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};
