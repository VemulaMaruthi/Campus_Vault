import React, { useEffect, useState } from "react";
import IdeaForm from "./IdeaForm";
import IdeaCard from "./IdeaCard";

export default function IdeasBoard() {
  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");

  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => setIdeas(data))
      .catch(err => console.error("Failed to fetch ideas:", err));
  }, []);

  const normalize = (str) => (str || "").trim().toLowerCase().replace(/\s+/g, " ");
  const myName = normalize(student?.name);

  const filteredIdeas = ideas
    .filter(i => activeFilter === "All" || i.category === activeFilter)
    .sort((a, b) => {
      // ✅ Match by ID (most reliable) with name as fallback
      const isMyA = a.createdById === student?.id || normalize(a.createdByName) === myName;
      const isMyB = b.createdById === student?.id || normalize(b.createdByName) === myName;

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
          </div>
        </div>

        <button
          className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold"
          onClick={() => setShowForm(true)}
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

            // ✅ Prepend with student info guaranteed
            setIdeas(prev => [{
              ...saved,
              createdByName: student?.name || saved.createdByName,
              createdById: student?.id || saved.createdById,
            }, ...prev]);

            setShowForm(false);
          }}
        />
      )}
    </>
  );
}