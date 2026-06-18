import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, Clock, MessageSquare, Paperclip } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Mock Data Types
type Task = {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  comments: number;
  attachments: number;
  assigneeAvatar?: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type BoardData = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

const initialData: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Design Landing Page mockup', priority: 'High', comments: 3, attachments: 2 },
    'task-2': { id: 'task-2', title: 'Setup CI/CD pipeline', priority: 'Medium', comments: 0, attachments: 0 },
    'task-3': { id: 'task-3', title: 'Write API documentation', priority: 'Low', comments: 1, attachments: 0 },
    'task-4': { id: 'task-4', title: 'Implement Auth Flow', priority: 'High', comments: 5, attachments: 1 },
    'task-5': { id: 'task-5', title: 'Review PRs', priority: 'Medium', comments: 0, attachments: 0 },
  },
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2', 'task-3'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-4'] },
    'col-3': { id: 'col-3', title: 'In Review', taskIds: ['task-5'] },
    'col-4': { id: 'col-4', title: 'Done', taskIds: [] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
};

export function Taskboard() {
  const [data, setData] = useState<BoardData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startCol = data.columns[source.droppableId];
    const finishCol = data.columns[destination.droppableId];

    // Moving within the same column
    if (startCol === finishCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startCol, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startCol.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startCol, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishCol.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishCol, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="h-full w-full flex flex-col min-w-0 overflow-hidden p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0 min-w-0">
        <div className="min-w-0 truncate pr-4">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-light)] truncate">Taskboard</h1>
          <p className="text-[var(--color-text-light)]/60 text-sm mt-1 truncate">Manage and track your project progress.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button variant="outline">Filters</Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" /> Create Task
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 min-h-0 min-w-0 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full items-start min-w-max xl:min-w-0 w-full">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <div key={column.id} className="flex-1 min-w-[260px] max-w-[340px] flex flex-col bg-slate-50/50 rounded-2xl border border-[var(--color-border-light)] max-h-full">
                  <div className="p-4 flex items-center justify-between border-b border-[var(--color-border-light)]/50">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{column.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-black/5 text-xs font-medium text-[var(--color-text-light)]/60">
                        {tasks.length}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-black/5 rounded text-[var(--color-text-light)]/50 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 overflow-y-auto transition-colors ${
                          snapshot.isDraggingOver ? 'bg-[var(--color-primary)]/5' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-3 min-h-[150px]">
                          {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white p-4 rounded-xl border border-[var(--color-border-light)] shadow-sm group ${
                                    snapshot.isDragging ? 'shadow-xl ring-2 ring-[var(--color-primary)]/20 rotate-2' : 'hover:border-[var(--color-border-light)]/80 hover:shadow-md'
                                  } transition-all duration-200`}
                                  style={provided.draggableProps.style}
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded text-[var(--color-text-light)]/40 transition-all">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                  </div>
                                  
                                  <p className="font-medium text-sm text-[var(--color-text-light)] mb-4 leading-snug">
                                    {task.title}
                                  </p>
                                  
                                  <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3 text-[var(--color-text-light)]/40 text-xs font-medium">
                                      {task.comments > 0 && (
                                        <div className="flex items-center gap-1">
                                          <MessageSquare className="w-3.5 h-3.5" />
                                          {task.comments}
                                        </div>
                                      )}
                                      {task.attachments > 0 && (
                                        <div className="flex items-center gap-1">
                                          <Paperclip className="w-3.5 h-3.5" />
                                          {task.attachments}
                                        </div>
                                      )}
                                      {task.comments === 0 && task.attachments === 0 && (
                                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Clock className="w-3.5 h-3.5" />
                                          Added today
                                        </div>
                                      )}
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center text-[10px] font-bold">
                                      {task.assigneeAvatar ? 'IMG' : 'JS'}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                  
                  <div className="p-3 pt-0 mt-auto border-t border-transparent">
                    <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text-light)]/50 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" /> Add Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
