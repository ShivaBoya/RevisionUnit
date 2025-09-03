import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, view, filter, onEdit }) {
  const filtered = tasks.filter((t) => {
    if (filter === "All Tasks") return true;
    if (filter === "Completed Tasks") return t.status === "Completed";
    if (filter === "Pending Tasks") return t.status === "Pending";
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        No tasks found. Add your first task!
      </div>
    );
  }

  return (
    <section>
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={() => onEdit(task)} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              compact
              onEdit={() => onEdit(task)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
