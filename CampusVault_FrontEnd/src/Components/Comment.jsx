import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosContact } from "react-icons/io";

export default function Comment({ idea, student, ideas, setIdeas }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const ideaId = idea.id;
  const token = localStorage.getItem("token");

  const alreadyCommented = (idea.comments || []).some(
    (c) => c.ownerRoll === student?.rollNumber
  );

  const submit = async () => {
    if (!text.trim() || alreadyCommented) return;
    setError("");

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: text.trim() }),
    });

    if (res.status === 403) {
      setError("You have already commented on this idea.");
      return;
    }
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    const updated = await res.json();
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === updated.id
          ? { ...i, comments: updated.comments, likes: updated.likes, likedBy: updated.likedBy }
          : i
      )
    );
    setText("");
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    const res = await fetch(
      `http://localhost:8081/api/ideas/${ideaId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) return;

    const updated = await res.json();
    setIdeas((prev) =>
      prev.map((i) =>
        i.id === updated.id ? { ...i, comments: updated.comments } : i
      )
    );
  };

  return (
    <div className="mt-4">
      {/* ── Input area ── */}
      {alreadyCommented ? (
        <div className="w-full p-3 bg-[#1b1b1b] rounded text-gray-500 text-sm text-center">
          ✅ You have already posted a response to this idea
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            className={`w-full p-2 bg-[#222] rounded resize-none border ${
              error ? "border-red-500/60" : "border-transparent"
            } focus:outline-none transition-colors`}
            placeholder="Write your response..."
            rows={3}
          />

          {error && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              ⚠️ {error}
            </p>
          )}

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

      {/* ── Comments list ── */}
      <div className="mt-4 space-y-3">
        {(idea.comments || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            <p className="text-2xl mb-2">💬</p>
            <p>No responses yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          (idea.comments || []).map((c, index) => {
            const isOwner = c.ownerRoll === student?.rollNumber;

            return (
              <div
                key={c.id || index}
                className="flex items-start justify-between gap-3 bg-[#1a1a1a] 
                           border border-white/5 rounded-xl px-4 py-3"
              >
                {/* Left: avatar + content */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Avatar circle */}
                  <div className="w-8 h-8 rounded-full bg-[#26F2D0]/20 text-[#26F2D0] 
                                  flex items-center justify-center text-sm font-bold shrink-0">
                    {c.ownerName?.[0]?.toUpperCase() || <IoIosContact className="w-6 h-6"/>}
                  </div>

                  {/* Name + comment text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">
                       {c.comment}
                      </span>
                    
                    </div>
                    <p className="text-gray-300 text-xs mt-1 break-words">
                       {c.commentedBy || "Anonymous"} . {c.commentedYear ? `${c.commentedYear} Year` : ""}
                       
                    </p>
                    
                  </div>
                </div>

                {/* Right: delete button — only for comment owner */}
                {isOwner && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors 
                               text-lg shrink-0 mt-0.5"
                    title="Delete comment"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}