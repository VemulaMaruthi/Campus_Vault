// import { useState } from "react";

// function ClubLeaving({ club, myRoll, token, onUpdate }) {
//   const [showBox, setShowBox] = useState(false);
//   const [confirm, setConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const API_BASE = "http://localhost:8081";

//   const handleLeave = async () => {
//   try {
//     const res = await fetch(
//       `http://localhost:8081/api/clubs/${club.id}/leave`,
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Leave failed:", text);
//       return;
//     }

//     const updated = await res.json(); // ✅ MUST exist

//     onUpdate(updated); // 🔥 THIS updates UI instantly
//   } catch (err) {
//     console.error("Leave error:", err);
//   }
// };

//   return (
//   <div className="w-full h-full flex flex-col justify-center items-center text-center px-6">

//     <div className="w-full max-w-xl bg-[#111] border border-red-500/30 rounded-2xl p-6 shadow-lg space-y-4">

//       <h2 className="text-red-400 text-lg font-semibold">
//         ⚠️ Leave Club
//       </h2>

//       <p className="text-sm text-gray-400 leading-relaxed">
//         Leaving this club will permanently remove your association.
//         <br /><br />
//         You will lose:
//         <br />• All badges earned
//         <br />• Activity history
//         <br />• Club privileges
//       </p>

//       <label className="flex items-center justify-center gap-2 text-sm text-gray-300 cursor-pointer mt-3">
//         <input
//           type="checkbox"
//           checked={confirm}
//           onChange={(e) => setConfirm(e.target.checked)}
//         />
//         I understand the consequences
//       </label>

//       {confirm && (
//         <button
//           onClick={handleLeave}
//           disabled={loading}
//           className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
//         >
//           {loading ? "Leaving..." : "Leave Club"}
//         </button>
//       )}
//     </div>
//   </div>
// );
// }
// export default ClubLeaving;

import { useState } from "react";

function ClubLeaving({ club, myRoll, token, onUpdate }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLeave = async () => {
    if (!confirm || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/leave`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Failed to leave club");
        setLoading(false);
        return;
      }

      const updated = await res.json();

      // 🔥 update parent state → club moves instantly
      onUpdate(updated);

    } catch (err) {
      console.error("Leave error:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center px-6">

      <div className="w-full max-w-xl bg-[#111] border border-red-500/30 rounded-2xl p-6 shadow-lg space-y-4">

        <h2 className="text-red-400 text-lg font-semibold">
          ⚠️ Leave Club
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed">
          Leaving this club will permanently remove your association.
          <br /><br />
          You will lose:
          <br />• All badges earned
          <br />• Activity history
          <br />• Club privileges
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded p-2">
            {error}
          </div>
        )}

        {/* CONFIRM */}
        <label className="flex items-center justify-center gap-2 text-sm text-gray-300 cursor-pointer mt-3">
          <input
            type="checkbox"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          I understand the consequences
        </label>

        {/* BUTTON */}
        <button
          onClick={handleLeave}
          disabled={!confirm || loading}
          className={`mt-4 px-6 py-2 rounded-lg font-semibold transition
            ${!confirm || loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
            }`}
        >
          {loading ? "Leaving..." : "Leave Club"}
        </button>

      </div>
    </div>
  );
}

export default ClubLeaving;