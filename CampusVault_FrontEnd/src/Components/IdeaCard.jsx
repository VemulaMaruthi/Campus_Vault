import { useState } from "react";
import Comment from "./Comment";
import { MdDelete } from "react-icons/md";

export default function IdeaCard({ idea, student, ideas, setIdeas }) {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [checked, setChecked] = useState(false);

  const ideaId = idea.id;
  const token = localStorage.getItem("token");

  const alreadyLiked = (idea.likedBy || []).includes(student?.rollNumber);
  const [hasLiked, setHasLiked] = useState(alreadyLiked);

  const isOwner = student?.rollNumber === idea.createdById;

  const formattedDate = idea.createdAt
    ? new Date(idea.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const categoryStyles = {
    Tech: "bg-blue-500/20 text-blue-400",
    Academic: "bg-green-500/20 text-green-400",
    "Campus Pulse": "bg-red-500/20 text-red-400",
    Cultural: "bg-yellow-300/20 text-yellow-400",
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return;

    const updated = await res.json();
    setHasLiked(!hasLiked);
    setIdeas(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  const handleEmail = (e) => {
    e.stopPropagation();

    const recipientEmail = idea.createdByEmail || null;
    const subject = encodeURIComponent(`Regarding your idea: ${idea.title}`);
    const body = encodeURIComponent(
      `Hi ${idea.createdByName},\n\nI came across your idea "${idea.title}" and wanted to connect.\n\nBest regards`
    );

    const gmailUrl = recipientEmail
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}`
      : `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", text);
        return;
      }

      setIdeas(prev => prev.filter(i => i.id !== ideaId));
      setShowModal(false);
      window.dispatchEvent(new Event("ideaDeleted"));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ── Delete confirmation replaces the entire card ──────────────────────────────
  const renderDeleteConfirm = () => (
    <div
      className="relative bg-[#111] p-6 rounded-xl border border-red-500/40
                  flex flex-col items-center justify-center text-center gap-5 min-h-[220px]"
      onClick={e => e.stopPropagation()}
    >
      
      <div>
        <p className="text-white font-semibold text-lg">Delete this idea?</p>
        <p className="text-gray-400 text-sm mt-1 max-w-xs">
          "{idea.title}" will be permanently removed.
        </p>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          className="w-4 h-4 accent-red-500 cursor-pointer"
        />
        <span className="text-gray-300 text-sm">Yes, I want to delete this idea</span>
      </label>

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={e => { e.stopPropagation(); setConfirmDelete(false); setChecked(false); }}
          className="flex-1 px-4 py-2 rounded-lg border border-white/10
                     text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={!checked}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            checked
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-red-500/20 text-red-900 cursor-not-allowed"
          }`}
        >
          <MdDelete /> Delete
        </button>
      </div>
    </div>
  );

  // ── Compact card ──────────────────────────────────────────────────────────────
  const renderCompactCard = () => (
    <div
      className="relative bg-[#111] p-6 rounded-xl border border-white/10
                  transition-all duration-300 hover:scale-105 hover:border-[#26F2D0] hover:shadow-lg cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      {/* Category — top left */}
      <div
        className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full
        ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}
      >
        {idea.category}
      </div>

      {/* Top-right: branch/year + email + delete */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full">
          {idea.createdByBranch} · {idea.createdByYear} Year
        </div>
        <button
          onClick={handleEmail}
          className="text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full
                     hover:bg-indigo-500/30 hover:text-indigo-300 transition-all"
        >
          📧 Email
        </button>
        {isOwner && (
          <button
            onClick={e => { e.stopPropagation(); setConfirmDelete(true); setChecked(false); }}
            className="text-red-400 hover:text-red-500 transition-colors text-lg"
            title="Delete idea"
          >
            <MdDelete />
          </button>
        )}
      </div>

      <h3 className="font-bold mt-8 text-left">{idea.title}</h3>

      <div className="text-gray-400 text-left w-full mt-2">
        {idea.description.length > 75 ? (
          <div className="space-y-1 w-full">
            <p className="line-clamp-2 h-[3rem] overflow-hidden leading-relaxed mb-2 w-full">
              {idea.description}
            </p>
            <span
              className="text-[#26F2D0] text-sm font-medium cursor-pointer hover:text-white transition-colors block"
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            >
              read more →
            </span>
          </div>
        ) : (
          <p className="leading-relaxed w-full">{idea.description}</p>
        )}
      </div>

      <div className="border-t border-white/10 my-4"></div>

      <div className="flex justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span>by {idea.createdByName}</span>
          <span className="text-xs text-gray-500">• {formattedDate}</span>
        </div>
        <div className="flex gap-6 items-center">
          <span>💬 {idea.comments?.length || 0}</span>
          <button
            onClick={handleLike}
            className={`transition-all hover:scale-125 flex items-center gap-1 ${
              hasLiked ? "text-[#26F2D0]" : "text-gray-400 hover:text-[#26F2D0]"
            }`}
            title={hasLiked ? "Unlike" : "Like"}
          >
            {hasLiked ? "👍" : "🤍"} {idea.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Modal ─────────────────────────────────────────────────────────────────────
  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      />
      <div className="relative bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto
                      rounded-2xl border-2 border-[#26F2D0]/50 shadow-2xl p-8 z-10">

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-6 right-6 text-[#26F2D0] hover:text-red-400 text-xl font-bold"
        >
          ×
        </button>

        <div className={`absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full
          ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
          {idea.category}
        </div>

        <div className="absolute top-6 right-20 text-sm bg-[#1f2937] text-[#26F2D0] px-4 py-2 rounded-full">
          {idea.createdByBranch} · {idea.createdByYear} Year
        </div>

        <h2 className="font-bold text-2xl mt-16 mb-6 text-center">{idea.title}</h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">{idea.description}</p>

        <div className="border-t border-white/20 my-8"></div>

        <div className="flex justify-between text-lg text-gray-400 mb-8">
          <div>
            <span className="font-medium">by {idea.createdByName}</span>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex gap-8">
            <span>💬 {idea.comments?.length || 0} comments</span>
            <span>👍 {idea.likes || 0} likes</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <Comment idea={idea} student={student} ideas={ideas} setIdeas={setIdeas} />
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex gap-4 flex-wrap items-center">
          <button
            onClick={handleLike}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              hasLiked
                ? "bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-red-500/20 hover:text-red-400"
                : "bg-white/10 text-gray-400 hover:bg-[#26F2D0]/20 hover:text-[#26F2D0]"
            }`}
          >
            {hasLiked ? "👍 Liked" : "🤍 Like"} ({idea.likes || 0})
          </button>

          <button
            onClick={handleEmail}
            className="px-6 py-2 rounded-full font-medium transition-all
                       bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400"
          >
            📧 Email {idea.createdByName}
          </button>

          {/* ── Inline delete confirm in modal footer ── */}
          {isOwner && confirmDelete && (
  <div className="ml-auto flex items-center gap-3 flex-wrap">
    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        className="w-4 h-4 accent-red-500"
      />
      Confirm delete
    </label>

    <button
      onClick={handleDelete}
      disabled={!checked}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
        checked
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-red-500/20 text-red-900 cursor-not-allowed"
      }`}
    >
      <MdDelete /> Delete
    </button>

    <button
      onClick={() => {
        setConfirmDelete(false);
        setChecked(false);
      }}
      className="text-gray-500 hover:text-white text-sm transition-colors"
    >
      Cancel
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );

  // ── If delete confirm is active and modal is closed, show confirm card ────────
  if (confirmDelete && !showModal) return renderDeleteConfirm();

  return showModal ? renderModal() : renderCompactCard();
}