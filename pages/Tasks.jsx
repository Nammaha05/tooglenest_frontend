import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, User, Flag } from 'lucide-react';
import '../styles/Tasks.css';

const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tasks = [
    { id: 1, name: 'Design System Update', project: 'Project A', assignee: 'John Doe', dueDate: '2026-01-20', priority: 'High', status: 'To Do' },
    { id: 2, name: 'API Integration', project: 'Project B', assignee: 'Sarah Smith', dueDate: '2026-01-22', priority: 'Medium', status: 'In Progress' },
    { id: 3, name: 'User Testing', project: 'Project C', assignee: 'Mike Johnson', dueDate: '2026-01-25', priority: 'Low', status: 'Done' }
  ];

  const filters = ['All Tasks', 'To Do', 'In Progress', 'Done'];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div>
      <div>
        <div className="header">
          <h1 className="title">My Tasks</h1>
          <div className="header-actions">
            <button className="add-task-btn">+ New Task</button>
          </div>
        </div>

        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="search-row">
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="priority-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Priority
          </button>
        </div>

        <div className="table-container">
          <div className="table-header">
            <div className="col-task">Task</div>
            <div className="col-project">Project</div>
            <div className="col-assignee">Assignee</div>
            <div className="col-date">Due Date</div>
            <div className="col-priority">Priority</div>
          </div>

          <div className="task-list">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="task-row"
                onClick={() => handleTaskClick(task)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="task-cell col-task">
                  <div className="task-checkbox"></div>
                  <span className="task-name">{task.name}</span>
                </div>
                <div className="task-cell col-project">
                  <span className="project-badge">{task.project}</span>
                </div>
                <div className="task-cell col-assignee">
                  <div className="avatar">{getInitials(task.assignee)}</div>
                  <span>{task.assignee}</span>
                </div>
                <div className="task-cell col-date">{task.dueDate}</div>
                <div className="task-cell col-priority">
                  <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) + '20', color: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTask && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Task Details</h2>
              <button className="close-icon" onClick={closePopup}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="popup-details">
              <div className="detail-row">
                <span className="detail-label">Task Name</span>
                <span className="detail-value">{selectedTask.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Project</span>
                <span className="project-badge">{selectedTask.project}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Assignee</span>
                <div className="assignee-info">
                  <div className="avatar">{getInitials(selectedTask.assignee)}</div>
                  <span>{selectedTask.assignee}</span>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date</span>
                <span className="detail-value">{selectedTask.dueDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Priority</span>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(selectedTask.priority) + '20', color: getPriorityColor(selectedTask.priority) }}>
                  {selectedTask.priority}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="status-badge">{selectedTask.status}</span>
              </div>
            </div>
            <div className="popup-actions">
              <button className="btn-secondary close-btn" onClick={closePopup}>Close</button>
              <button className="btn-primary edit-btn">Edit Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;