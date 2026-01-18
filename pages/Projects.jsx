

import React, { useState } from 'react';
import '../styles/Projects.css';




const ProjectList = ({ projects, onCreateNew, onEditProject, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const getTeamAvatars = (teamMembers) => {
    return teamMembers.slice(0, 3).map((member, index) => (
      <img
        key={member.id}
        src={member.avatar}
        alt={member.name}
        className="team-avatar"
        style={{
          zIndex: teamMembers.length - index
        }}
        title={member.name}
      />
    ));
  };

  return (
    <div>
      <div className="header">
        <h1>Projects</h1>
        <button className="new-project-btn" onClick={onCreateNew}>
          + New Project
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Project"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => onEditProject(project)}>
            <div className="project-header">
              <div className="project-icon"></div>
              <div className="project-info">
                <div className="project-name">{project.name}</div>
                <span className="assigned-date">Assigned on {project.assignedDate}</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="project-footer">
              <div className="tasks-info">
                <div className="tasks-count">
                  {project.completedTasks}/{project.tasksCount} Tasks
                </div>
                <div className="due-date">Due: {project.dueDate}</div>
              </div>
              <div className="progress-circles">
                {getTeamAvatars(project.teamMembers)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ProjectForm Component
const ProjectForm = ({ project, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    dueDate: project?.dueDate || '',
    teamMembers: project?.teamMembers || []
  });
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const member = {
        id: Date.now(),
        name: newMemberName,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      };
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, member]
      });
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(m => m.id !== memberId)
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.dueDate) {
      onSave(formData);
    }
  };

  return (
    <div>

      <div className="tabs">
        <button className={`tab ${mode === 'edit' ? 'active' : ''}`}>
          {mode === 'edit' ? `Manage Project: ${project?.name}` : 'Manage Project'}
        </button>
        <button className={`tab ${mode === 'create' ? 'active' : ''}`}>
          Create New Project
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Project Name:</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-input"
          placeholder="Enter Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Due Date:</label>
        <div className="date-input-wrapper">
          <input
            type="date"
            className="form-input"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Team Members:</label>
        <div className="team-members-section">
          {formData.teamMembers.length > 0 && (
            <div className="team-members-display">
              {formData.teamMembers.map(member => (
                <div key={member.id} className="team-member-chip">
                  <img src={member.avatar} alt={member.name} />
                  <span>{member.name}</span>
                  <button
                    className="remove-member-btn"
                    onClick={() => handleRemoveMember(member.id)}
                    title="Remove member"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="add-member-section">
            <div className="add-member-input">
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
              />
            </div>
            <button className="add-member-btn" onClick={handleAddMember}>
              + Add Members
            </button>
          </div>
        </div>
      </div>

      <div className="form-actions">
        {mode === 'edit' && (
          <button className="btn btn-secondary" onClick={handleSubmit}>
            Save Changes
          </button>
        )}
        {mode === 'create' && (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Project
          </button>
        )}
        <button className="btn btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};


const Projects = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      assignedDate: '2024-01-15',
      tasksCount: 12,
      completedTasks: 8,
      dueDate: '2024-02-28',
      teamMembers: [
        { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=3' }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Build iOS and Android applications',
      assignedDate: '2024-01-10',
      tasksCount: 24,
      completedTasks: 15,
      dueDate: '2024-03-15',
      teamMembers: [
        { id: 4, name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: 5, name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=5' }
      ]
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q1 marketing campaign for product launch',
      assignedDate: '2024-01-20',
      tasksCount: 8,
      completedTasks: 3,
      dueDate: '2024-02-10',
      teamMembers: [
        { id: 6, name: 'Frank Miller', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: 7, name: 'Grace Taylor', avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: 8, name: 'Henry Wilson', avatar: 'https://i.pravatar.cc/150?img=8' }
      ]
    },
    {
      id: 4,
      name: 'API Integration',
      description: 'Integrate third-party APIs for data sync',
      assignedDate: '2024-01-18',
      tasksCount: 6,
      completedTasks: 6,
      dueDate: '2024-01-25',
      teamMembers: [
        { id: 9, name: 'Ivy Brown', avatar: 'https://i.pravatar.cc/150?img=9' },
        { id: 10, name: 'Jack Moore', avatar: 'https://i.pravatar.cc/150?img=10' }
      ]
    }
  ]);

  const handleCreateNew = () => {
    setSelectedProject(null);
    setCurrentView('create');
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setCurrentView('edit');
  };

  const handleSaveProject = (formData) => {
    if (currentView === 'create') {
      const newProject = {
        id: projects.length + 1,
        ...formData,
        assignedDate: new Date().toISOString().split('T')[0],
        tasksCount: 0,
        completedTasks: 0
      };
      setProjects([...projects, newProject]);
    } else if (currentView === 'edit') {
      const updatedProjects = projects.map(p =>
        p.id === selectedProject.id ? { ...p, ...formData } : p
      );
      setProjects(updatedProjects);
    }
    setCurrentView('list');
    setSelectedProject(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedProject(null);
  };

  const handleSearch = (searchTerm) => {
    // Search functionality handled within ProjectList component
  };

  if (currentView === 'list') {
    return (
      <ProjectList
        projects={projects}
        onCreateNew={handleCreateNew}
        onEditProject={handleEditProject}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <ProjectForm
      project={selectedProject}
      mode={currentView}
      onSave={handleSaveProject}
      onCancel={handleCancel}
    />
  );
};

export default Projects;
