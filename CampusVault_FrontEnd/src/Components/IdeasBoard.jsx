import React, { useEffect, useState } from "react";
import IdeaForm from "./IdeaForm";
import IdeaCard from "./IdeaCard";

export default function IdeasBoard() {
  const token = localStorage.getItem("token");
  const myId = localStorage.getItem("id");

  // ✅ Build student from the keys actually saved during login
  const student = {
    rollNumber: localStorage.getItem("rollNumber"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("Email"),
  };

  const cooldownKey = `lastIdeaPostedAt_${myId}`;

  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [postError, setPostError] = useState("");

  useEffect(() => {
    if (!token || !myId) {
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => setIdeas(data))
      .catch(err => console.error("Failed to fetch ideas:", err));
  }, []);

  // ✅ Restore cooldown message on refresh — scoped to this student
  useEffect(() => {
    if (!myId) return;
    const lastPostedAt = localStorage.getItem(cooldownKey);
    if (!lastPostedAt) return;

    const diff = new Date() - new Date(lastPostedAt);
    const ms48 = 48 * 60 * 60 * 1000;

    if (diff < ms48) {
      const remaining = getTimeRemaining(lastPostedAt);
      setPostError(
        `You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`
      );
    } else {
      localStorage.removeItem(cooldownKey);
    }
  }, []);

  const isWithin48Hours = (dateStr) => {
    if (!dateStr) return false;
    return new Date() - new Date(dateStr) < 48 * 60 * 60 * 1000;
  };

  const getTimeRemaining = (fromDate) => {
    if (!fromDate) return "";
    const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
    const diff = unlock - new Date();
    if (diff <= 0) return "";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const lastPostedAt = localStorage.getItem(cooldownKey);
  const canPost = !lastPostedAt || !isWithin48Hours(lastPostedAt);

  const handlePostClick = () => {
    if (!canPost) {
      const remaining = getTimeRemaining(lastPostedAt);
      setPostError(
        `You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`
      );
      return;
    }
    setPostError("");
    setShowForm(true);
  };

  const filteredIdeas = ideas
    .filter(i => activeFilter === "All" || i.category === activeFilter)
    .sort((a, b) => {
      // ✅ Sort own ideas to top using rollNumber
      const isMyA = a.createdById === student.rollNumber;
      const isMyB = b.createdById === student.rollNumber;
      if (isMyA && !isMyB) return -1;
      if (!isMyA && isMyB) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                      border border-white/5 rounded-2xl p-6
                      flex flex-col md:flex-row md:items-center md:justify-between
                      gap-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
          <div>
            <h2 className="text-2xl font-bold">Ideas Board</h2>
            <p className="text-gray-400 text-sm">Share and support student initiatives</p>

            {postError && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${
                postError.startsWith("Idea posted")
                  ? "text-[#26F2D0]"
                  : "text-red-400"
              }`}>
                {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handlePostClick}
          className={`px-5 py-2 rounded-xl font-semibold transition-all ${
            canPost
              ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
              : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
          }`}
        >
          + Post an Idea
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex items-center gap-3">
        {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === cat ? "bg-[#26F2D0] text-black" : "bg-[#232323] text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
        {filteredIdeas.map(idea => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            student={student}
            ideas={ideas}
            setIdeas={setIdeas}
          />
        ))}
      </div>

      {showForm && (
        <IdeaForm
          student={student}
          onClose={() => setShowForm(false)}
          onSubmit={async (newIdea) => {
            const res = await fetch("http://localhost:8081/api/ideas/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newIdea)
            });

            if (!res.ok) {
              const text = await res.text();
              console.error("Failed to post idea:", text);
              return;
            }

            const saved = await res.json();

            const postedAt = saved.createdAt || new Date().toISOString();
            localStorage.setItem(cooldownKey, postedAt);

            // ✅ Use rollNumber not MongoDB _id for createdById
            setIdeas(prev => [{
              ...saved,
              createdByName: student.name || saved.createdByName,
              createdById: student.rollNumber || saved.createdById,
            }, ...prev]);

            setShowForm(false);

            const remaining = getTimeRemaining(postedAt);
            setPostError(
              `Idea posted! You can post another after 48 hours.${remaining ? ` Next post available in ${remaining}.` : ""}`
            );
          }}
        />
      )}
    </>
  );
}