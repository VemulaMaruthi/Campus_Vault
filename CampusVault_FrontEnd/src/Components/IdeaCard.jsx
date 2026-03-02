import { useState } from "react";
import Comment from "./Comment";

export default function IdeaCard({ idea, student, ideas, setIdeas }) {
  const [showModal, setShowModal] = useState(false);

  const ideaId = idea.id;
  const token = localStorage.getItem("token");

  // ✅ Check if this student already liked — from backend data
  const alreadyLiked = (idea.likedBy || []).includes(student?.rollNumber);
  const [hasLiked, setHasLiked] = useState(alreadyLiked);

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

  // ✅ Single like handler used by both compact card and modal
  const handleLike = async (e) => {
    e.stopPropagation();
    if (hasLiked) return;

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Backend identifies student from token
      },
    });

    if (!res.ok) return;

    const updated = await res.json();
    setHasLiked(true);
    setIdeas(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  const renderCompactCard = () => (
    <div
      className="relative bg-[#111] p-6 rounded-xl border border-white/10
                  transition-all duration-300 hover:scale-105 hover:border-[#26F2D0] hover:shadow-lg cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <div
        className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full
        ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}
      >
        {idea.category}
      </div>

      <div className="absolute top-4 right-4 text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full">
        {idea.createdByBranch} · {idea.createdByYear}
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
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
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

          {/* ✅ Like button on compact card */}
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`transition-all ${
              hasLiked ? "opacity-50 cursor-not-allowed" : "hover:scale-125"
            }`}
          >
            👍 {idea.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );

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

        <div
          className={`absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full
          ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}
        >
          {idea.category}
        </div>

        <div className="absolute top-6 right-20 text-sm bg-[#1f2937] text-[#26F2D0] px-4 py-2 rounded-full">
          {idea.createdByBranch} · {idea.createdByYear}
        </div>

        <h2 className="font-bold text-2xl mt-16 mb-6 text-center">
          {idea.title}
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {idea.description}
        </p>

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
          <Comment
            idea={idea}
            student={student}
            ideas={ideas}
            setIdeas={setIdeas}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          {/* ✅ Like button in modal */}
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              hasLiked
                ? "bg-[#26F2D0]/10 text-gray-500 cursor-not-allowed"
                : "bg-[#26F2D0]/20 hover:bg-[#26F2D0]/30 text-[#26F2D0]"
            }`}
          >
            {hasLiked ? "✅ Liked" : "👍 Like"} ({idea.likes || 0})
          </button>
        </div>
      </div>
    </div>
  );

  return showModal ? renderModal() : renderCompactCard();
}