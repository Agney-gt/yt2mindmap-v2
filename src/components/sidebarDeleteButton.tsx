"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
interface DeleteButtonProps {
  mindmapId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ mindmapId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this mindmap?");
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/mindmaps/${mindmapId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = "Unknown error";

        if (contentType?.includes("application/json")) {
          const err = await res.json();
          errorMessage = err.error || errorMessage;
        } else {
          const text = await res.text();
          console.error("Raw error response:", text);
          errorMessage = text;
        }

        alert(`Failed to delete: ${errorMessage}`);
        return;
      }

      alert("Mindmap deleted");
      // Optionally refresh or re-fetch list here
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Something went wrong while trying to delete the mindmap.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="ml-4 text-red-500 hover:text-red-700 text-right"
    >
      {isDeleting ? 'Deleting...' : <X className="w-4 h-4" />}
    </button>
  );
};

export default DeleteButton;
