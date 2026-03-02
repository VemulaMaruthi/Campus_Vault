import { useState } from "react";
import CommentItem from "./CommentItem";

export default function Comment({ idea, student, ideas, setIdeas }) {
  const [text, setText] = useState("");

  const ideaId = idea.id;
  const token = localStorage.getItem("token");

  const alreadyCommented = (idea.comments || []).some(
    c => c.ownerRoll === student?.rollNumber
  );

  const submit = async () => {
    if (!text.trim() || alreadyCommented) return;

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: text.trim() })
    });

    if (res.status === 403) {
      alert("You have already commented on this idea.");
      return;
    }

    if (!res.ok) return;

    const updated = await res.json();
    setIdeas(prev => prev.map(i =>
      i.id === updated.id
        ? { ...i, comments: updated.comments, likes: updated.likes, likedBy: updated.likedBy }
        : i
    ));
    setText("");
  };

  return (
    <div className="mt-4">
      {alreadyCommented ? (
        <div className="w-full p-3 bg-[#1b1b1b] rounded text-gray-500 text-sm text-center">
          ✅ You have already posted a response to this idea
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full p-2 bg-[#222] rounded resize-none"
            placeholder="Write your response..."
            rows={3}
          />
          <button
            onClick={submit}
            disabled={!text.trim()}
            className={`px-4 py-2 rounded mt-2 font-semibold transition-all ${
              text.trim()
                ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
                : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            Post Response
          </button>
        </>
      )}

      <div className="mt-4 space-y-3">
        {(idea.comments || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            <p className="text-2xl mb-2">💬</p>
            <p>No responses yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          (idea.comments || []).map((c, index) => (
            <CommentItem
              key={c.id || index} // ✅ fixed key prop
              comment={c}
              student={student}
              onDelete={async () => {
                const res = await fetch(
                  `http://localhost:8081/api/ideas/${ideaId}/comment/${c.id}`,
                  {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (!res.ok) return;
                const updated = await res.json();
                setIdeas(prev => prev.map(i =>
                  i.id === updated.id
                    ? { ...i, comments: updated.comments }
                    : i
                ));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}