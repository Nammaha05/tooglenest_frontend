import KanbanBoard from "../components/kanban/KanbanBoard";
import api from "../services/api";

const Kanban = () => {

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    // ✅ YAHI DAALO
    await api.put(`/tasks/${taskId}`, { status: newStatus });
  };
};
export default KanbanBoard;
