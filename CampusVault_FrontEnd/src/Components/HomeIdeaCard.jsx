// // // // // import { ExternalLink, Trash2 } from "lucide-react";
// // // // // import { useState } from "react";

// // // // // const CATEGORY_ICONS = {
// // // // //   Tech: "/techh.png",
// // // // //   Academic: "/academic.png",
// // // // //   "Campus Pulse": "/campuspulse.png",
// // // // //   Cultural: "/cultural.png",
// // // // // };

// // // // // const CATEGORY_COLORS = {
// // // // //   Tech: "from-blue-500/20 to-blue-400/5 border-blue-400/20",
// // // // //   Academic: "from-green-500/20 to-green-400/5 border-green-400/20",
// // // // //   "Campus Pulse": "from-red-500/20 to-red-400/5 border-red-400/20",
// // // // //   Cultural: "from-yellow-500/20 to-yellow-400/5 border-yellow-400/20",
// // // // // };

// // // // // const getLinkLabel = (url) => {
// // // // //   if (!url) return "View";
// // // // //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// // // // //   if (url.includes("instagram")) return "📸 Instagram";
// // // // //   if (url.includes("drive.google")) return "📁 Drive";
// // // // //   if (url.includes("linkedin")) return "💼 LinkedIn";
// // // // //   return "🔗 View";
// // // // // };

// // // // // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// // // // //   const [confirm, setConfirm] = useState(false);
// // // // //   const [deleting, setDeleting] = useState(false);
// // // // //   const [errorMsg, setErrorMsg] = useState("");

// // // // //   const handleDelete = async (e) => {
// // // // //     e.stopPropagation();
// // // // //     setDeleting(true);
// // // // //     setErrorMsg("");

// // // // //     try {
// // // // //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// // // // //         method: "DELETE",
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });

// // // // //       if (res.ok) {
// // // // //         onDeleted(ideaId);
// // // // //       } else if (res.status === 403) {
// // // // //         setConfirm(false);
// // // // //         setErrorMsg("Seems you are not the one who implemented this idea.");
// // // // //         setTimeout(() => setErrorMsg(""), 3000);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Delete failed:", err);
// // // // //     } finally {
// // // // //       setDeleting(false);
// // // // //     }
// // // // //   };

// // // // //   if (confirm) {
// // // // //     return (
// // // // //       <div className="relative">
// // // // //         <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
// // // // //           <span className="text-xs text-gray-400">Remove?</span>

// // // // //           <button
// // // // //             onClick={handleDelete}
// // // // //             disabled={deleting}
// // // // //             className="text-xs text-red-400 font-semibold px-2 py-0.5
// // // // //             bg-red-400/10 rounded-full hover:bg-red-400/20 transition
// // // // //             disabled:opacity-50"
// // // // //           >
// // // // //             {deleting ? "..." : "Yes"}
// // // // //           </button>

// // // // //           <button
// // // // //             onClick={(e) => {
// // // // //               e.stopPropagation();
// // // // //               setConfirm(false);
// // // // //             }}
// // // // //             className="text-xs text-gray-500 hover:text-white px-2 py-0.5
// // // // //             bg-white/5 rounded-full transition"
// // // // //           >
// // // // //             No
// // // // //           </button>
// // // // //         </div>

// // // // //         {errorMsg && (
// // // // //           <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
// // // // //           border border-red-500/30 text-red-400 text-xs rounded-xl
// // // // //           px-3 py-2 shadow-lg z-20">
// // // // //             {errorMsg}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="relative">
// // // // //       <button
// // // // //         onClick={(e) => {
// // // // //           e.stopPropagation();
// // // // //           setConfirm(true);
// // // // //         }}
// // // // //         className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
// // // // //         hover:bg-red-400/10 transition-all"
// // // // //         title="Remove from showcase"
// // // // //       >
// // // // //         <Trash2 size={13} />
// // // // //       </button>

// // // // //       {errorMsg && (
// // // // //         <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
// // // // //         border border-red-500/30 text-red-400 text-xs rounded-xl
// // // // //         px-3 py-2 shadow-lg z-20">
// // // // //           {errorMsg}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {

// // // // //   const gradientClass = CATEGORY_COLORS[idea.category]
// // // // //     || "from-gray-500/20 to-gray-400/5 border-gray-400/20";

// // // // //   const proposedBy = idea.classProposal
// // // // //     ? `🏛️ ${idea.proposalClass}`
// // // // //     : `💡 ${idea.createdByName}`;

// // // // //   const proposedBySubtext = idea.classProposal
// // // // //     ? `Class Proposal · ${idea.category}`
// // // // //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// // // // //   return (
// // // // //     <div
// // // // //       className={`relative bg-gradient-to-br ${gradientClass} border rounded-2xl
// // // // //       overflow-hidden transition-all duration-300
// // // // //       hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]`}
// // // // //     >

// // // // //       {isModerator && (
// // // // //         <div className="absolute top-2 right-2 z-10">
// // // // //           <ShowcaseDeleteButton
// // // // //             ideaId={idea.id}
// // // // //             token={token}
// // // // //             onDeleted={onDeleted}
// // // // //           />
// // // // //         </div>
// // // // //       )}

// // // // //       {idea.showcaseImageUrl ? (
// // // // //         <div className="relative h-44 overflow-hidden">
// // // // //           <img
// // // // //             src={idea.showcaseImageUrl}
// // // // //             alt={idea.title}
// // // // //             className="w-full h-full object-cover"
// // // // //           />

// // // // //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

// // // // //           <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5
// // // // //           bg-green-500/80 text-white rounded-full font-medium">
// // // // //             ✅ Implemented
// // // // //           </span>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="h-32 flex items-center justify-center bg-white/[0.03]
// // // // //         border-b border-white/5">
// // // // //           <img
// // // // //             src={CATEGORY_ICONS[idea.category] || "/others.png"}
// // // // //             className="w-16 h-16 object-contain opacity-60"
// // // // //             alt=""
// // // // //           />
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="p-4">
// // // // //         <div className="flex items-start justify-between gap-2 mb-1">

// // // // //           <p className="text-white font-bold text-sm leading-snug flex-1">
// // // // //             {idea.title}
// // // // //           </p>

// // // // //           {idea.showcaseLink && (
// // // // //             <a
// // // // //               href={idea.showcaseLink}
// // // // //               target="_blank"
// // // // //               rel="noopener noreferrer"
// // // // //               onClick={e => e.stopPropagation()}
// // // // //               className="shrink-0 flex items-center gap-1 px-2 py-1
// // // // //               bg-white/10 hover:bg-[#26F2D0]/20 text-gray-400
// // // // //               hover:text-[#26F2D0] rounded-lg text-xs transition-all
// // // // //               border border-white/10 hover:border-[#26F2D0]/30
// // // // //               whitespace-nowrap"
// // // // //               title={idea.showcaseLink}
// // // // //             >
// // // // //               {getLinkLabel(idea.showcaseLink)}
// // // // //               <ExternalLink size={10} />
// // // // //             </a>
// // // // //           )}
// // // // //         </div>

// // // // //         <p className="text-gray-400 text-xs line-clamp-2 mb-3">
// // // // //           {idea.description}
// // // // //         </p>

// // // // //         <div className="flex items-center justify-between">

// // // // //           <div>
// // // // //             <p className="text-xs text-gray-300 font-medium">
// // // // //               {proposedBy}
// // // // //             </p>

// // // // //             <p className="text-xs text-gray-500">
// // // // //               {proposedBySubtext}
// // // // //             </p>
// // // // //           </div>

// // // // //           <div className="text-right">
// // // // //             <p className="text-xs text-[#26F2D0] font-bold">
// // // // //               👍 {idea.likes || 0} likes
// // // // //             </p>

// // // // //             {idea.reviewedAt && (
// // // // //               <p className="text-xs text-gray-600">
// // // // //                 {formatDate(idea.reviewedAt)}
// // // // //               </p>
// // // // //             )}
// // // // //           </div>

// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HomeIdeaCard;









// // // // import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// // // // import { useState } from "react";

// // // // /* ── Category config ── */
// // // // const CATEGORY_ICONS = {
// // // //   Tech:           "/techh.png",
// // // //   Academic:       "/academic.png",
// // // //   "Campus Pulse": "/campuspulse.png",
// // // //   Cultural:       "/cultural.png",
// // // // };

// // // // const CATEGORY_ACCENT = {
// // // //   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
// // // //   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
// // // //   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
// // // //   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// // // // };

// // // // const getLinkLabel = (url) => {
// // // //   if (!url) return "View";
// // // //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// // // //   if (url.includes("instagram")) return "📸 Instagram";
// // // //   if (url.includes("drive.google")) return "📁 Drive";
// // // //   if (url.includes("linkedin")) return "💼 LinkedIn";
// // // //   return "🔗 View";
// // // // };

// // // // /* ── Delete button — exact same logic as before ── */
// // // // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// // // //   const [confirm,  setConfirm]  = useState(false);
// // // //   const [deleting, setDeleting] = useState(false);
// // // //   const [errorMsg, setErrorMsg] = useState("");

// // // //   const handleDelete = async (e) => {
// // // //     e.stopPropagation();
// // // //     setDeleting(true);
// // // //     setErrorMsg("");
// // // //     try {
// // // //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// // // //         method: "DELETE",
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       if (res.ok) {
// // // //         onDeleted(ideaId);
// // // //       } else if (res.status === 403) {
// // // //         setConfirm(false);
// // // //         setErrorMsg("Seems you are not the one who implemented this idea.");
// // // //         setTimeout(() => setErrorMsg(""), 3000);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Delete failed:", err);
// // // //     } finally {
// // // //       setDeleting(false);
// // // //     }
// // // //   };

// // // //   if (confirm) {
// // // //     return (
// // // //       <div style={{ position: "relative" }}>
// // // //         <div
// // // //           style={{ display: "flex", alignItems: "center", gap: 4 }}
// // // //           onClick={e => e.stopPropagation()}
// // // //         >
// // // //           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
// // // //           <button
// // // //             onClick={handleDelete}
// // // //             disabled={deleting}
// // // //             style={{
// // // //               fontSize: 11, color: "#f87171", fontWeight: 600,
// // // //               padding: "2px 8px", borderRadius: 999,
// // // //               background: "rgba(239,68,68,0.12)",
// // // //               border: "1px solid rgba(239,68,68,0.25)",
// // // //               cursor: "pointer", opacity: deleting ? 0.5 : 1,
// // // //             }}
// // // //           >
// // // //             {deleting ? "..." : "Yes"}
// // // //           </button>
// // // //           <button
// // // //             onClick={e => { e.stopPropagation(); setConfirm(false); }}
// // // //             style={{
// // // //               fontSize: 11, color: "#6b7280", padding: "2px 8px",
// // // //               borderRadius: 999, background: "rgba(255,255,255,0.06)",
// // // //               border: "none", cursor: "pointer",
// // // //             }}
// // // //           >
// // // //             No
// // // //           </button>
// // // //         </div>
// // // //         {errorMsg && (
// // // //           <div style={{
// // // //             position: "absolute", top: 28, right: 0, width: 200,
// // // //             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // // //             color: "#f87171", fontSize: 11, borderRadius: 10,
// // // //             padding: "8px 12px", zIndex: 20,
// // // //             boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// // // //           }}>
// // // //             {errorMsg}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div style={{ position: "relative" }}>
// // // //       <button
// // // //         onClick={e => { e.stopPropagation(); setConfirm(true); }}
// // // //         title="Remove from showcase"
// // // //         style={{
// // // //           padding: 6, borderRadius: 8,
// // // //           background: "rgba(239,68,68,0.08)",
// // // //           border: "1px solid rgba(239,68,68,0.18)",
// // // //           color: "#ef4444", cursor: "pointer",
// // // //           display: "flex", alignItems: "center", justifyContent: "center",
// // // //           transition: "all 0.2s",
// // // //         }}
// // // //         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
// // // //         onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
// // // //       >
// // // //         <Trash2 size={13} />
// // // //       </button>
// // // //       {errorMsg && (
// // // //         <div style={{
// // // //           position: "absolute", top: 28, right: 0, width: 200,
// // // //           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // // //           color: "#f87171", fontSize: 11, borderRadius: 10,
// // // //           padding: "8px 12px", zIndex: 20,
// // // //         }}>
// // // //           {errorMsg}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ═══════════════════════════════════════════════
// // // //    SHOWCASE GROUP — wraps a group of ideas into
// // // //    the fanned card stack. Pass all ideas for one
// // // //    "slot" here; each card fans out on hover.
// // // //    ─────────────────────────────────────────────
// // // //    Used inside Home.jsx showcase loop like:
// // // //      <ShowcaseCardGroup ideas={showcase} ... />
// // // // ═══════════════════════════════════════════════ */

// // // // /* ── Single glass card (one idea) ── */
// // // // function GlassIdeaCard({
// // // //   idea, rotation, zIndex, isModerator, token, onDeleted, formatDate, isHovered,
// // // // }) {
// // // //   const accent = CATEGORY_ACCENT[idea.category] || {
// // // //     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
// // // //   };

// // // //   const proposedBy = idea.classProposal
// // // //     ? `🏛️ ${idea.proposalClass}`
// // // //     : `💡 ${idea.createdByName}`;

// // // //   const proposedBySubtext = idea.classProposal
// // // //     ? `Class Proposal · ${idea.category}`
// // // //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         width: 200,
// // // //         height: 240,
// // // //         borderRadius: 16,
// // // //         background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
// // // //         border: "1px solid rgba(255,255,255,0.13)",
// // // //         boxShadow: `0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset`,
// // // //         backdropFilter: "blur(14px)",
// // // //         WebkitBackdropFilter: "blur(14px)",
// // // //         overflow: "hidden",
// // // //         transform: `rotate(${rotation}deg)`,
// // // //         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s ease",
// // // //         zIndex,
// // // //         cursor: "default",
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //       }}
// // // //     >
// // // //       {/* category colour top bar */}
// // // //       <div style={{
// // // //         height: 3, flexShrink: 0,
// // // //         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
// // // //         boxShadow: `0 0 10px ${accent.glow}`,
// // // //       }} />

// // // //       {/* image or icon */}
// // // //       {idea.showcaseImageUrl ? (
// // // //         <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
// // // //           <img
// // // //             src={idea.showcaseImageUrl}
// // // //             alt={idea.title}
// // // //             style={{ width: "100%", height: "100%", objectFit: "cover" }}
// // // //           />
// // // //           <div style={{
// // // //             position: "absolute", inset: 0,
// // // //             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
// // // //           }} />
// // // //           <span style={{
// // // //             position: "absolute", bottom: 6, left: 8,
// // // //             fontSize: 9, padding: "2px 7px", borderRadius: 999,
// // // //             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
// // // //           }}>
// // // //             ✅ Implemented
// // // //           </span>
// // // //         </div>
// // // //       ) : (
// // // //         <div style={{
// // // //           height: 80, flexShrink: 0,
// // // //           display: "flex", alignItems: "center", justifyContent: "center",
// // // //           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
// // // //           borderBottom: "1px solid rgba(255,255,255,0.06)",
// // // //         }}>
// // // //           <img
// // // //             src={CATEGORY_ICONS[idea.category] || "/others.png"}
// // // //             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
// // // //             alt=""
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* body */}
// // // //       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
// // // //         {/* title + link */}
// // // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
// // // //           <p style={{
// // // //             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
// // // //             margin: 0, flex: 1,
// // // //             display: "-webkit-box", WebkitLineClamp: 2,
// // // //             WebkitBoxOrient: "vertical", overflow: "hidden",
// // // //           }}>
// // // //             {idea.title}
// // // //           </p>
// // // //           {idea.showcaseLink && (
// // // //             <a
// // // //               href={idea.showcaseLink}
// // // //               target="_blank"
// // // //               rel="noopener noreferrer"
// // // //               onClick={e => e.stopPropagation()}
// // // //               style={{
// // // //                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
// // // //                 padding: "3px 7px", borderRadius: 8,
// // // //                 background: "rgba(255,255,255,0.08)",
// // // //                 border: "1px solid rgba(255,255,255,0.12)",
// // // //                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
// // // //                 whiteSpace: "nowrap", transition: "all 0.2s",
// // // //               }}
// // // //               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
// // // //               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
// // // //             >
// // // //               {getLinkLabel(idea.showcaseLink)}
// // // //               <ExternalLink size={8} />
// // // //             </a>
// // // //           )}
// // // //         </div>

// // // //         {/* proposed by */}
// // // //         <div style={{ marginTop: "auto" }}>
// // // //           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>
// // // //             {proposedBy}
// // // //           </p>
// // // //           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>
// // // //             {proposedBySubtext}
// // // //           </p>
// // // //         </div>

// // // //         {/* likes + date row */}
// // // //         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // // //           <span style={{
// // // //             fontSize: 10, color: "#26F2D0", fontWeight: 700,
// // // //             display: "flex", alignItems: "center", gap: 3,
// // // //           }}>
// // // //             <ThumbsUp size={9} /> {idea.likes || 0}
// // // //           </span>
// // // //           {idea.reviewedAt && (
// // // //             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
// // // //               <Calendar size={8} />
// // // //               {formatDate(idea.reviewedAt)}
// // // //             </span>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* bottom label bar — mirrors the CSS ::before */}
// // // //       <div style={{
// // // //         height: 36, flexShrink: 0,
// // // //         background: "rgba(255,255,255,0.05)",
// // // //         borderTop: "1px solid rgba(255,255,255,0.07)",
// // // //         display: "flex", alignItems: "center", justifyContent: "center",
// // // //         gap: 6,
// // // //       }}>
// // // //         <span style={{
// // // //           fontSize: 10, color: "#d1d5db", fontWeight: 500,
// // // //           letterSpacing: "0.06em", textTransform: "uppercase",
// // // //         }}>
// // // //           {idea.category || "Idea"}
// // // //         </span>
// // // //         {isModerator && (
// // // //           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Fan group — takes ONE idea, renders it as a stacked visual ──
// // // //    We show 3 ghost cards behind it to create the fan illusion,
// // // //    then the real card on top. All fan out on hover.             */
// // // // const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {
// // // //   const [hovered, setHovered] = useState(false);

// // // //   /* fan rotations: back-most → front */
// // // //   const ROTATIONS     = [-14, -5, 5];
// // // //   const FAN_ROTATIONS = [-22, -8, 8];

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "relative",
// // // //         width: 200,
// // // //         height: 240,
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //       }}
// // // //       onMouseEnter={() => setHovered(true)}
// // // //       onMouseLeave={() => setHovered(false)}
// // // //     >
// // // //       {/* ghost cards (decorative depth layers) */}
// // // //       {[0, 1, 2].map((i) => (
// // // //         <div
// // // //           key={i}
// // // //           style={{
// // // //             position: "absolute",
// // // //             width: 200,
// // // //             height: 240,
// // // //             borderRadius: 16,
// // // //             background: `linear-gradient(160deg, rgba(255,255,255,${0.06 - i * 0.015}) 0%, rgba(255,255,255,0.02) 100%)`,
// // // //             border: "1px solid rgba(255,255,255,0.08)",
// // // //             boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
// // // //             backdropFilter: "blur(8px)",
// // // //             WebkitBackdropFilter: "blur(8px)",
// // // //             borderRadius: 16,
// // // //             transform: `rotate(${hovered ? FAN_ROTATIONS[i] : ROTATIONS[i]}deg)`,
// // // //             transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
// // // //             zIndex: i + 1,
// // // //           }}
// // // //         />
// // // //       ))}

// // // //       {/* real card — always on top, no rotation */}
// // // //       <GlassIdeaCard
// // // //         idea={idea}
// // // //         rotation={0}
// // // //         zIndex={10}
// // // //         isModerator={isModerator}
// // // //         token={token}
// // // //         onDeleted={onDeleted}
// // // //         formatDate={formatDate}
// // // //         isHovered={hovered}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HomeIdeaCard;





// // // // import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// // // // import { useState } from "react";

// // // // /* ── Category config ── */
// // // // const CATEGORY_ICONS = {
// // // //   Tech:           "/techh.png",
// // // //   Academic:       "/academic.png",
// // // //   "Campus Pulse": "/campuspulse.png",
// // // //   Cultural:       "/cultural.png",
// // // // };

// // // // const CATEGORY_ACCENT = {
// // // //   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
// // // //   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
// // // //   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
// // // //   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// // // // };

// // // // const getLinkLabel = (url) => {
// // // //   if (!url) return "View";
// // // //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// // // //   if (url.includes("instagram")) return "📸 Instagram";
// // // //   if (url.includes("drive.google")) return "📁 Drive";
// // // //   if (url.includes("linkedin")) return "💼 LinkedIn";
// // // //   return "🔗 View";
// // // // };

// // // // /* ── Delete button ── */
// // // // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// // // //   const [confirm,  setConfirm]  = useState(false);
// // // //   const [deleting, setDeleting] = useState(false);
// // // //   const [errorMsg, setErrorMsg] = useState("");

// // // //   const handleDelete = async (e) => {
// // // //     e.stopPropagation();
// // // //     setDeleting(true);
// // // //     setErrorMsg("");
// // // //     try {
// // // //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// // // //         method: "DELETE",
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       if (res.ok) {
// // // //         onDeleted(ideaId);
// // // //       } else if (res.status === 403) {
// // // //         setConfirm(false);
// // // //         setErrorMsg("Seems you are not the one who implemented this idea.");
// // // //         setTimeout(() => setErrorMsg(""), 3000);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Delete failed:", err);
// // // //     } finally {
// // // //       setDeleting(false);
// // // //     }
// // // //   };

// // // //   if (confirm) {
// // // //     return (
// // // //       <div style={{ position: "relative" }}>
// // // //         <div
// // // //           style={{ display: "flex", alignItems: "center", gap: 4 }}
// // // //           onClick={e => e.stopPropagation()}
// // // //         >
// // // //           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
// // // //           <button
// // // //             onClick={handleDelete}
// // // //             disabled={deleting}
// // // //             style={{
// // // //               fontSize: 11, color: "#f87171", fontWeight: 600,
// // // //               padding: "2px 8px", borderRadius: 999,
// // // //               background: "rgba(239,68,68,0.12)",
// // // //               border: "1px solid rgba(239,68,68,0.25)",
// // // //               cursor: "pointer", opacity: deleting ? 0.5 : 1,
// // // //             }}
// // // //           >
// // // //             {deleting ? "..." : "Yes"}
// // // //           </button>
// // // //           <button
// // // //             onClick={e => { e.stopPropagation(); setConfirm(false); }}
// // // //             style={{
// // // //               fontSize: 11, color: "#6b7280", padding: "2px 8px",
// // // //               borderRadius: 999, background: "rgba(255,255,255,0.06)",
// // // //               border: "none", cursor: "pointer",
// // // //             }}
// // // //           >
// // // //             No
// // // //           </button>
// // // //         </div>
// // // //         {errorMsg && (
// // // //           <div style={{
// // // //             position: "absolute", top: 28, right: 0, width: 200,
// // // //             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // // //             color: "#f87171", fontSize: 11, borderRadius: 10,
// // // //             padding: "8px 12px", zIndex: 20,
// // // //             boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// // // //           }}>
// // // //             {errorMsg}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div style={{ position: "relative" }}>
// // // //       <button
// // // //         onClick={e => { e.stopPropagation(); setConfirm(true); }}
// // // //         title="Remove from showcase"
// // // //         style={{
// // // //           padding: 6, borderRadius: 8,
// // // //           background: "rgba(239,68,68,0.08)",
// // // //           border: "1px solid rgba(239,68,68,0.18)",
// // // //           color: "#ef4444", cursor: "pointer",
// // // //           display: "flex", alignItems: "center", justifyContent: "center",
// // // //           transition: "all 0.2s",
// // // //         }}
// // // //         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
// // // //         onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
// // // //       >
// // // //         <Trash2 size={13} />
// // // //       </button>
// // // //       {errorMsg && (
// // // //         <div style={{
// // // //           position: "absolute", top: 28, right: 0, width: 200,
// // // //           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // // //           color: "#f87171", fontSize: 11, borderRadius: 10,
// // // //           padding: "8px 12px", zIndex: 20,
// // // //         }}>
// // // //           {errorMsg}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // /* ── Single glass card (one idea) ── */
// // // // function GlassIdeaCard({
// // // //   idea, rotation, zIndex, isModerator, token, onDeleted, formatDate,
// // // //   translateX = 0, translateY = 0,
// // // // }) {
// // // //   const accent = CATEGORY_ACCENT[idea.category] || {
// // // //     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
// // // //   };

// // // //   const proposedBy = idea.classProposal
// // // //     ? `🏛️ ${idea.proposalClass}`
// // // //     : `💡 ${idea.createdByName}`;

// // // //   const proposedBySubtext = idea.classProposal
// // // //     ? `Class Proposal · ${idea.category}`
// // // //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         width: 200,
// // // //         height: 240,
// // // //         borderRadius: 16,
// // // //         background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
// // // //         border: "1px solid rgba(255,255,255,0.13)",
// // // //         boxShadow: `0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset`,
// // // //         backdropFilter: "blur(14px)",
// // // //         WebkitBackdropFilter: "blur(14px)",
// // // //         overflow: "hidden",
// // // //         transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
// // // //         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
// // // //         zIndex,
// // // //         cursor: "default",
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //       }}
// // // //     >
// // // //       {/* category colour top bar */}
// // // //       <div style={{
// // // //         height: 3, flexShrink: 0,
// // // //         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
// // // //         boxShadow: `0 0 10px ${accent.glow}`,
// // // //       }} />

// // // //       {/* image or icon */}
// // // //       {idea.showcaseImageUrl ? (
// // // //         <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
// // // //           <img
// // // //             src={idea.showcaseImageUrl}
// // // //             alt={idea.title}
// // // //             style={{ width: "100%", height: "100%", objectFit: "cover" }}
// // // //           />
// // // //           <div style={{
// // // //             position: "absolute", inset: 0,
// // // //             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
// // // //           }} />
// // // //           <span style={{
// // // //             position: "absolute", bottom: 6, left: 8,
// // // //             fontSize: 9, padding: "2px 7px", borderRadius: 999,
// // // //             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
// // // //           }}>
// // // //             ✅ Implemented
// // // //           </span>
// // // //         </div>
// // // //       ) : (
// // // //         <div style={{
// // // //           height: 80, flexShrink: 0,
// // // //           display: "flex", alignItems: "center", justifyContent: "center",
// // // //           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
// // // //           borderBottom: "1px solid rgba(255,255,255,0.06)",
// // // //         }}>
// // // //           <img
// // // //             src={CATEGORY_ICONS[idea.category] || "/others.png"}
// // // //             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
// // // //             alt=""
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* body */}
// // // //       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
// // // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
// // // //           <p style={{
// // // //             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
// // // //             margin: 0, flex: 1,
// // // //             display: "-webkit-box", WebkitLineClamp: 2,
// // // //             WebkitBoxOrient: "vertical", overflow: "hidden",
// // // //           }}>
// // // //             {idea.title}
// // // //           </p>
// // // //           {idea.showcaseLink && (
// // // //             <a
// // // //               href={idea.showcaseLink}
// // // //               target="_blank"
// // // //               rel="noopener noreferrer"
// // // //               onClick={e => e.stopPropagation()}
// // // //               style={{
// // // //                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
// // // //                 padding: "3px 7px", borderRadius: 8,
// // // //                 background: "rgba(255,255,255,0.08)",
// // // //                 border: "1px solid rgba(255,255,255,0.12)",
// // // //                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
// // // //                 whiteSpace: "nowrap", transition: "all 0.2s",
// // // //               }}
// // // //               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
// // // //               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
// // // //             >
// // // //               {getLinkLabel(idea.showcaseLink)}
// // // //               <ExternalLink size={8} />
// // // //             </a>
// // // //           )}
// // // //         </div>

// // // //         <div style={{ marginTop: "auto" }}>
// // // //           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>
// // // //             {proposedBy}
// // // //           </p>
// // // //           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>
// // // //             {proposedBySubtext}
// // // //           </p>
// // // //         </div>

// // // //         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // // //           <span style={{
// // // //             fontSize: 10, color: "#26F2D0", fontWeight: 700,
// // // //             display: "flex", alignItems: "center", gap: 3,
// // // //           }}>
// // // //             <ThumbsUp size={9} /> {idea.likes || 0}
// // // //           </span>
// // // //           {idea.reviewedAt && (
// // // //             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
// // // //               <Calendar size={8} />
// // // //               {formatDate(idea.reviewedAt)}
// // // //             </span>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* bottom label bar */}
// // // //       <div style={{
// // // //         height: 36, flexShrink: 0,
// // // //         background: "rgba(255,255,255,0.05)",
// // // //         borderTop: "1px solid rgba(255,255,255,0.07)",
// // // //         display: "flex", alignItems: "center", justifyContent: "center",
// // // //         gap: 6,
// // // //       }}>
// // // //         <span style={{
// // // //           fontSize: 10, color: "#d1d5db", fontWeight: 500,
// // // //           letterSpacing: "0.06em", textTransform: "uppercase",
// // // //         }}>
// // // //           {idea.category || "Idea"}
// // // //         </span>
// // // //         {isModerator && (
// // // //           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ── Ghost card — same dark glass shell, no content ── */
// // // // function GhostCard({ rotation, translateX, translateY, zIndex }) {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         width: 200,
// // // //         height: 240,
// // // //         borderRadius: 16,
// // // //         /* same dark glass look as real card */
// // // //         background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 60%, rgba(0,0,0,0.18) 100%)",
// // // //         border: "1px solid rgba(255,255,255,0.10)",
// // // //         boxShadow: "0 16px 36px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
// // // //         backdropFilter: "blur(12px)",
// // // //         WebkitBackdropFilter: "blur(12px)",
// // // //         transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
// // // //         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
// // // //         zIndex,
// // // //         overflow: "hidden",
// // // //       }}
// // // //     >
// // // //       {/* top shine */}
// // // //       <div style={{
// // // //         position: "absolute", top: 0, left: 0, right: 0, height: "45%",
// // // //         background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
// // // //         borderRadius: "16px 16px 0 0",
// // // //         pointerEvents: "none",
// // // //       }} />
// // // //       {/* bottom label bar to visually match real card */}
// // // //       <div style={{
// // // //         position: "absolute", bottom: 0, left: 0, right: 0, height: 36,
// // // //         background: "rgba(255,255,255,0.04)",
// // // //         borderTop: "1px solid rgba(255,255,255,0.06)",
// // // //       }} />
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ════════════════════════════════════════════
// // // //    HomeIdeaCard
// // // //    — Default: all cards perfectly stacked → looks like ONE card
// // // //    — Hover:   ghost cards fan out left & right
// // // //    ════════════════════════════════════════════ */
// // // // const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {
// // // //   const [hovered, setHovered] = useState(false);

// // // //   const ghosts = [
// // // //     /* left ghost */
// // // //     { stackRot: -2, stackX: 0,   stackY: 0, fanRot: -18, fanX: -65, fanY: 12, zIndex: 1 },
// // // //     /* right ghost */
// // // //     { stackRot:  2, stackX: 0,   stackY: 0, fanRot:  15, fanX:  60, fanY: 12, zIndex: 2 },
// // // //   ];

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "relative",
// // // //         width: 200,
// // // //         height: 240,
// // // //         /* extra horizontal breathing room so fanned cards don't clip in grids */
// // // //         margin: "0 70px",
// // // //       }}
// // // //       onMouseEnter={() => setHovered(true)}
// // // //       onMouseLeave={() => setHovered(false)}
// // // //     >
// // // //       {/* ghost cards — same glass style, no content, sit below real card */}
// // // //       {ghosts.map((g, i) => (
// // // //         <GhostCard
// // // //           key={i}
// // // //           rotation={hovered ? g.fanRot : g.stackRot}
// // // //           translateX={hovered ? g.fanX  : g.stackX}
// // // //           translateY={hovered ? g.fanY  : g.stackY}
// // // //           zIndex={g.zIndex}
// // // //         />
// // // //       ))}

// // // //       {/* real card — always on top, zero rotation */}
// // // //       <GlassIdeaCard
// // // //         idea={idea}
// // // //         rotation={0}
// // // //         translateX={0}
// // // //         translateY={0}
// // // //         zIndex={10}
// // // //         isModerator={isModerator}
// // // //         token={token}
// // // //         onDeleted={onDeleted}
// // // //         formatDate={formatDate}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HomeIdeaCard;




// // // import { ExternalLink, Trash2, ThumbsUp, Calendar,GraduationCap } from "lucide-react";
// // // import { useState } from "react";

// // // /* ── Category config ── */
// // // const CATEGORY_ICONS = {
// // //   Tech:           "/techh.png",
// // //   Academic:       "/academic.png",
// // //   "Campus Pulse": "/campuspulse.png",
// // //   Cultural:       "/cultural.png",
// // // };

// // // const CATEGORY_ACCENT = {
// // //   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
// // //   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
// // //   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
// // //   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// // // };

// // // const getLinkLabel = (url) => {
// // //   if (!url) return "View";
// // //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// // //   if (url.includes("instagram")) return "📸 Instagram";
// // //   if (url.includes("drive.google")) return "📁 Drive";
// // //   if (url.includes("linkedin")) return "💼 LinkedIn";
// // //   return "🔗 View";
// // // };

// // // /* ── Delete button ── */
// // // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// // //   const [confirm,  setConfirm]  = useState(false);
// // //   const [deleting, setDeleting] = useState(false);
// // //   const [errorMsg, setErrorMsg] = useState("");

// // //   const handleDelete = async (e) => {
// // //     e.stopPropagation();
// // //     setDeleting(true);
// // //     setErrorMsg("");
// // //     try {
// // //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// // //         method: "DELETE",
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       if (res.ok) {
// // //         onDeleted(ideaId);
// // //       } else if (res.status === 403) {
// // //         setConfirm(false);
// // //         setErrorMsg("Seems you are not the one who implemented this idea.");
// // //         setTimeout(() => setErrorMsg(""), 3000);
// // //       }
// // //     } catch (err) {
// // //       console.error("Delete failed:", err);
// // //     } finally {
// // //       setDeleting(false);
// // //     }
// // //   };

// // //   if (confirm) {
// // //     return (
// // //       <div style={{ position: "relative" }}>
// // //         <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
// // //           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
// // //           <button
// // //             onClick={handleDelete}
// // //             disabled={deleting}
// // //             style={{
// // //               fontSize: 11, color: "#f87171", fontWeight: 600,
// // //               padding: "2px 8px", borderRadius: 999,
// // //               background: "rgba(239,68,68,0.12)",
// // //               border: "1px solid rgba(239,68,68,0.25)",
// // //               cursor: "pointer", opacity: deleting ? 0.5 : 1,
// // //             }}
// // //           >
// // //             {deleting ? "..." : "Yes"}
// // //           </button>
// // //           <button
// // //             onClick={e => { e.stopPropagation(); setConfirm(false); }}
// // //             style={{
// // //               fontSize: 11, color: "#6b7280", padding: "2px 8px",
// // //               borderRadius: 999, background: "rgba(255,255,255,0.06)",
// // //               border: "none", cursor: "pointer",
// // //             }}
// // //           >
// // //             No
// // //           </button>
// // //         </div>
// // //         {errorMsg && (
// // //           <div style={{
// // //             position: "absolute", top: 28, right: 0, width: 200,
// // //             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // //             color: "#f87171", fontSize: 11, borderRadius: 10,
// // //             padding: "8px 12px", zIndex: 20,
// // //             boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// // //           }}>
// // //             {errorMsg}
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={{ position: "relative" }}>
// // //       <button
// // //         onClick={e => { e.stopPropagation(); setConfirm(true); }}
// // //         title="Remove from showcase"
// // //         style={{
// // //           padding: 6, borderRadius: 0,
// // //           // background: "rgba(239,68,68,0.08)",
// // //           // border: "1px solid rgba(239,68,68,0.18)",
// // //           color: "#ef4444", cursor: "pointer",
// // //           display: "flex", alignItems: "center", justifyContent: "center",
// // //           transition: "all 0.2s",
// // //         }}
// // //         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
// // //         onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
// // //       >
// // //         <Trash2 size={8} />
// // //       </button>
// // //       {errorMsg && (
// // //         <div style={{
// // //           position: "absolute", top: 28, right: 0, width: 200,
// // //           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// // //           color: "#f87171", fontSize: 11, borderRadius: 10,
// // //           padding: "8px 12px", zIndex: 20,
// // //         }}>
// // //           {errorMsg}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // /* ────────────────────────────────────────────────
// // //    GlassIdeaCard — a single full card (icon + label)
// // //    accepts transform props so the parent can
// // //    position/rotate it for both stack & spread states
// // // ──────────────────────────────────────────────── */
// // // function GlassIdeaCard({ idea, style, isModerator, token, onDeleted, formatDate }) {
// // //   const accent = CATEGORY_ACCENT[idea.category] || {
// // //     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
// // //   };

// // //   const proposedBy = idea.classProposal
// // //     ? `🏛️ ${idea.proposalClass}`
// // //     : `💡 ${idea.createdByName}`;

// // //   const proposedBySubtext = idea.classProposal
// // //     ? `Class Proposal · ${idea.category}`
// // //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "absolute",
// // //         width: window.innerWidth < 640 
// // //           ? 200 
// // //           : window.innerWidth < 1024 
// // //             ? 230 
// // //             : 270,

// // //         height: window.innerWidth < 640 
// // //           ? 240 
// // //           : window.innerWidth < 1024 
// // //             ? 270 
// // //             : 310,
// // //         height: 310,
// // //         borderRadius: 16,
// // //         background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
// // //         border: "1px solid rgba(255,255,255,0.13)",
// // //         boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
// // //         backdropFilter: "blur(14px)",
// // //         WebkitBackdropFilter: "blur(14px)",
// // //         overflow: "hidden",
// // //         cursor: "default",
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         /* transition handles both stack→spread and spread→stack */
// // //         transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
// // //         ...style,
// // //       }}
// // //     >
// // //       {/* category colour top bar */}
// // //       <div style={{
// // //         height: 3, flexShrink: 0,
// // //         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
// // //         boxShadow: `0 0 10px ${accent.glow}`,
// // //       }} />

// // //       {/* image or icon */}
// // //       {idea.showcaseImageUrl ? (
// // //         <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
// // //           <img
// // //             src={idea.showcaseImageUrl}
// // //             alt={idea.title}
// // //             style={{ width: "100%", height: "100%", objectFit: "cover" }}
// // //           />
// // //           <div style={{
// // //             position: "absolute", inset: 0,
// // //             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
// // //           }} />
// // //           <span style={{
// // //             position: "absolute", bottom: 6, left: 8,
// // //             fontSize: 9, padding: "2px 7px", borderRadius: 999,
// // //             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
// // //           }}>
// // //             ✅ Implemented
// // //           </span>
// // //         </div>
// // //       ) : (
// // //         <div style={{
// // //           height: 80, flexShrink: 0,
// // //           display: "flex", alignItems: "center", justifyContent: "center",
// // //           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
// // //           borderBottom: "1px solid rgba(255,255,255,0.06)",
// // //         }}>
// // //           <img
// // //             src={CATEGORY_ICONS[idea.category] || "/others.png"}
// // //             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
// // //             alt=""
// // //           />
// // //         </div>
// // //       )}

// // //       {/* body */}
// // //       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
// // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
// // //           <p style={{
// // //             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
// // //             margin: 0, flex: 1,
// // //             display: "-webkit-box", WebkitLineClamp: 2,
// // //             WebkitBoxOrient: "vertical", overflow: "hidden",
// // //           }}>
// // //             {idea.title}
// // //           </p>
// // //           {idea.showcaseLink && (
// // //             <a
// // //               href={idea.showcaseLink}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               onClick={e => e.stopPropagation()}
// // //               style={{
// // //                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
// // //                 padding: "3px 7px", borderRadius: 8,
// // //                 background: "rgba(255,255,255,0.08)",
// // //                 border: "1px solid rgba(255,255,255,0.12)",
// // //                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
// // //                 whiteSpace: "nowrap", transition: "all 0.2s",
// // //               }}
// // //               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
// // //               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
// // //             >
// // //               {getLinkLabel(idea.showcaseLink)}
// // //               <ExternalLink size={8} />
// // //             </a>
// // //           )}
// // //         </div>

// // //         <div style={{ marginTop: "auto" }}>
// // //           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>{proposedBy}</p>
// // //           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>{proposedBySubtext}</p>
// // //         </div>

// // //         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // //           <span style={{ fontSize: 10, color: "#26F2D0", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
// // //             <ThumbsUp size={9} /> {idea.likes || 0}
// // //           </span>
// // //           {idea.reviewedAt && (
// // //             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
// // //               <Calendar size={8} />
// // //               {formatDate(idea.reviewedAt)}
// // //             </span>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* bottom label bar */}
// // //       <div style={{
// // //         height: 36, flexShrink: 0,
// // //         background: "rgba(255,255,255,0.05)",
// // //         borderTop: "1px solid rgba(255,255,255,0.07)",
// // //         display: "flex", alignItems: "center", justifyContent: "center",
// // //         gap: 6,
// // //       }}>
// // //         <span style={{
// // //           fontSize: 10, color: "#d1d5db", fontWeight: 500,
// // //           letterSpacing: "0.06em", textTransform: "uppercase",
// // //         }}>
// // //           {idea.category || "Idea"}
// // //         </span>
// // //         {isModerator && (
// // //           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ════════════════════════════════════════════════════════
// // //    HomeIdeaCard
// // //    --------------------------------------------------------
// // //    Props:
// // //      ideas       — array of idea objects (the whole group)
// // //      isModerator — bool
// // //      token       — auth token
// // //      onDeleted   — callback
// // //      formatDate  — date formatter fn

// // //    Default  → cards stacked as a fanned deck (image 1)
// // //    On hover → all cards spread flat side-by-side (image 2)
// // //    No individual card hover effects — group only.
// // // ════════════════════════════════════════════════════════ */

// // // const CARD_W   = 270;   // card width
// // // const CARD_GAP = 20;    // gap between cards when spread

// // // /*
// // //   Stack transforms per index (for up to 5 cards):
// // //   The last card (highest index) is on top with no rotation.
// // //   Earlier cards peek behind with slight rotation & offset.
// // // */
// // // const STACK_TRANSFORMS = [
// // //   { rotate: -15, x: -30, y: 20, z: 1 },   // furthest back / left
// // //   { rotate: -8,  x: -14, y: 10, z: 2 },
// // //   { rotate:  0,  x:   0, y:  0, z: 3 },   // top card — front face
// // //   { rotate:  8,  x:  14, y: 10, z: 2 },
// // //   { rotate:  15, x:  30, y: 20, z: 1 },
// // // ];

// // // const HomeIdeaCard = ({ ideas = [], isModerator, token, onDeleted, formatDate }) => {
// // //   const [hovered, setHovered] = useState(false);

// // //   const count   = ideas.length;
// // //   // total width when spread: N cards + (N-1) gaps
// // //   const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

// // // return (
// // //   <div
// // //     style={{
// // //       position: "relative",
// // //       width: hovered ? spreadW : CARD_W + 40,
// // //       height: 260,
// // //       // ✅ MOBILE SCROLL ONLY (inline media query alternative)
// // //       maxWidth: window.innerWidth < 768 ? "100vw" : spreadW,
// // //       overflowX: window.innerWidth < 768 && hovered ? "auto" : "visible",
// // //       WebkitOverflowScrolling: "touch",
// // //       scrollbarWidth: "thin",
// // //       msOverflowStyle: "none",
// // //       display: "flex",
// // //       alignItems: "center",
// // //       justifyContent: "center",
// // //       cursor: "pointer",
// // //       margin: "0 auto",
// // //       transition: "width 0.4s ease"
// // //     }}
// // //     onMouseEnter={() => setHovered(true)}
// // //     onMouseLeave={() => setHovered(false)}
// // //   >

// // //       {ideas.map((idea, i) => {
// // //         /* ── SPREAD position (hover) ── */
// // //         const spreadX = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
// // //         const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;

// // //         /* ── STACK position (default) ── */
// // //         // Pick a stack slot; centre the top card
// // //         const slotIndex = Math.min(i, STACK_TRANSFORMS.length - 1);
// // //         const slot = STACK_TRANSFORMS[slotIndex];
// // //         // bring the "top" card (last in array) to index 2 slot (front)
// // //         const adjustedSlot = STACK_TRANSFORMS[
// // //           Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1))
// // //         ] || slot;

// // //         const stackTransform = `translateX(${adjustedSlot.x}px) translateY(${adjustedSlot.y}px) rotate(${adjustedSlot.rotate}deg)`;

// // //         return (
// // //           <GlassIdeaCard
// // //             key={idea.id}
// // //             idea={idea}
// // //             isModerator={isModerator}
// // //             token={token}
// // //             onDeleted={onDeleted}
// // //             formatDate={formatDate}
// // //             style={{
// // //               transform: hovered ? spreadTransform : stackTransform,
// // //               zIndex: hovered ? i + 1 : adjustedSlot.z,
// // //             }}
// // //           />
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // };

// // // export default HomeIdeaCard;

// // import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// // import { useState, useRef, useEffect, useCallback } from "react";

// // /* ── Responsive card dimensions ── */
// // const getCardDimensions = () => {
// //   const w = window.innerWidth;
// //   if (w < 640)  return { W: 200, H: 240, GAP: 12, bucket: "mobile" };
// //   if (w < 1024) return { W: 230, H: 275, GAP: 16, bucket: "tablet" };
// //   return           { W: 270, H: 310, GAP: 20, bucket: "desktop" };
// // };

// // /* ── Category config ── */
// // const CATEGORY_ICONS = {
// //   Tech:           "/techh.png",
// //   Academic:       "/academic.png",
// //   "Campus Pulse": "/campuspulse.png",
// //   Cultural:       "/cultural.png",
// // };

// // const CATEGORY_ACCENT = {
// //   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
// //   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
// //   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
// //   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// // };

// // const getLinkLabel = (url) => {
// //   if (!url) return "View";
// //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// //   if (url.includes("instagram")) return "📸 Instagram";
// //   if (url.includes("drive.google")) return "📁 Drive";
// //   if (url.includes("linkedin")) return "💼 LinkedIn";
// //   return "🔗 View";
// // };

// // /* ── Delete button ── */
// // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// //   const [confirm,  setConfirm]  = useState(false);
// //   const [deleting, setDeleting] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState("");

// //   const handleDelete = async (e) => {
// //     e.stopPropagation();
// //     setDeleting(true);
// //     setErrorMsg("");
// //     try {
// //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.ok) {
// //         onDeleted(ideaId);
// //       } else if (res.status === 403) {
// //         setConfirm(false);
// //         setErrorMsg("Seems you are not the one who implemented this idea.");
// //         setTimeout(() => setErrorMsg(""), 3000);
// //       }
// //     } catch (err) {
// //       console.error("Delete failed:", err);
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   if (confirm) {
// //     return (
// //       <div style={{ position: "relative" }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
// //           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
// //           <button onClick={handleDelete} disabled={deleting}
// //             style={{
// //               fontSize: 11, color: "#f87171", fontWeight: 600,
// //               padding: "2px 8px", borderRadius: 999,
// //               background: "rgba(239,68,68,0.12)",
// //               border: "1px solid rgba(239,68,68,0.25)",
// //               cursor: "pointer", opacity: deleting ? 0.5 : 1,
// //             }}>
// //             {deleting ? "..." : "Yes"}
// //           </button>
// //           <button onClick={e => { e.stopPropagation(); setConfirm(false); }}
// //             style={{
// //               fontSize: 11, color: "#6b7280", padding: "2px 8px",
// //               borderRadius: 999, background: "rgba(255,255,255,0.06)",
// //               border: "none", cursor: "pointer",
// //             }}>
// //             No
// //           </button>
// //         </div>
// //         {errorMsg && (
// //           <div style={{
// //             position: "absolute", top: 28, right: 0, width: 200,
// //             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// //             color: "#f87171", fontSize: 11, borderRadius: 10,
// //             padding: "8px 12px", zIndex: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// //           }}>
// //             {errorMsg}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ position: "relative" }}>
// //       <button onClick={e => { e.stopPropagation(); setConfirm(true); }}
// //         title="Remove from showcase"
// //         style={{
// //           padding: 6, borderRadius: 0, color: "#ef4444", cursor: "pointer",
// //           display: "flex", alignItems: "center", justifyContent: "center",
// //           transition: "all 0.2s",
// //         }}
// //         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
// //         onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
// //         <Trash2 size={8} />
// //       </button>
// //       {errorMsg && (
// //         <div style={{
// //           position: "absolute", top: 28, right: 0, width: 200,
// //           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
// //           color: "#f87171", fontSize: 11, borderRadius: 10, padding: "8px 12px", zIndex: 20,
// //         }}>
// //           {errorMsg}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // /* ─────────────────────────────────────────────────────
// //    GlassIdeaCard — single card shell
// // ───────────────────────────────────────────────────── */
// // function GlassIdeaCard({ idea, style, isModerator, token, onDeleted, formatDate, cardH, onClick }) {
// //   const accent = CATEGORY_ACCENT[idea.category] || {
// //     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
// //   };

// //   const proposedBy = idea.classProposal ? `🏛️ ${idea.proposalClass}` : `💡 ${idea.createdByName}`;
// //   const proposedBySubtext = idea.classProposal
// //     ? `Class Proposal · ${idea.category}`
// //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// //   const imgH  = cardH >= 300 ? 110 : cardH >= 260 ? 96 : 80;
// //   const iconH = cardH >= 300 ? 90  : cardH >= 260 ? 80 : 64;

// //   return (
// //     <div onClick={onClick} style={{
// //       borderRadius: 16,
// //       background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
// //       border: "1px solid rgba(255,255,255,0.13)",
// //       boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
// //       backdropFilter: "blur(14px)",
// //       WebkitBackdropFilter: "blur(14px)",
// //       overflow: "hidden",
// //       display: "flex",
// //       flexDirection: "column",
// //       flexShrink: 0,
// //       ...style,
// //     }}>

// //       {/* category top bar */}
// //       <div style={{
// //         height: 3, flexShrink: 0,
// //         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
// //         boxShadow: `0 0 10px ${accent.glow}`,
// //       }} />

// //       {/* image or icon */}
// //       {idea.showcaseImageUrl ? (
// //         <div style={{ height: imgH, flexShrink: 0, position: "relative", overflow: "hidden" }}>
// //           <img src={idea.showcaseImageUrl} alt={idea.title}
// //             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //           <div style={{
// //             position: "absolute", inset: 0,
// //             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
// //           }} />
// //           <span style={{
// //             position: "absolute", bottom: 6, left: 8,
// //             fontSize: 9, padding: "2px 7px", borderRadius: 999,
// //             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
// //           }}>
// //             ✅ Implemented
// //           </span>
// //         </div>
// //       ) : (
// //         <div style={{
// //           height: iconH, flexShrink: 0,
// //           display: "flex", alignItems: "center", justifyContent: "center",
// //           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
// //           borderBottom: "1px solid rgba(255,255,255,0.06)",
// //         }}>
// //           <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
// //             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }} alt="" />
// //         </div>
// //       )}

// //       {/* body */}
// //       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
// //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
// //           <p style={{
// //             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
// //             margin: 0, flex: 1,
// //             display: "-webkit-box", WebkitLineClamp: 2,
// //             WebkitBoxOrient: "vertical", overflow: "hidden",
// //           }}>
// //             {idea.title}
// //           </p>
// //           {idea.showcaseLink && (
// //             <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
// //               onClick={e => e.stopPropagation()}
// //               style={{
// //                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
// //                 padding: "3px 7px", borderRadius: 8,
// //                 background: "rgba(255,255,255,0.08)",
// //                 border: "1px solid rgba(255,255,255,0.12)",
// //                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
// //                 whiteSpace: "nowrap", transition: "all 0.2s",
// //               }}
// //               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
// //               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
// //               {getLinkLabel(idea.showcaseLink)}
// //               <ExternalLink size={8} />
// //             </a>
// //           )}
// //         </div>

// //         <div style={{ marginTop: "auto" }}>
// //           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>{proposedBy}</p>
// //           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>{proposedBySubtext}</p>
// //         </div>

// //         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //           <span style={{ fontSize: 10, color: "#26F2D0", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
// //             <ThumbsUp size={9} /> {idea.likes || 0}
// //           </span>
// //           {idea.reviewedAt && (
// //             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
// //               <Calendar size={8} />
// //               {formatDate(idea.reviewedAt)}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {/* bottom label bar */}
// //       <div style={{
// //         height: 34, flexShrink: 0,
// //         background: "rgba(255,255,255,0.05)",
// //         borderTop: "1px solid rgba(255,255,255,0.07)",
// //         display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
// //       }}>
// //         <span style={{
// //           fontSize: 10, color: "#d1d5db", fontWeight: 500,
// //           letterSpacing: "0.06em", textTransform: "uppercase",
// //         }}>
// //           {idea.category || "Idea"}
// //         </span>
// //         {isModerator && (
// //           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────
// //    STACK_TRANSFORMS — desktop/tablet fan
// // ───────────────────────────────────────────────────── */
// // const STACK_TRANSFORMS = [
// //   { rotate: -15, x: -30, y: 20, z: 1 },
// //   { rotate: -8,  x: -14, y: 10, z: 2 },
// //   { rotate:  0,  x:   0, y:  0, z: 3 },
// //   { rotate:  8,  x:  14, y: 10, z: 2 },
// //   { rotate:  15, x:  30, y: 20, z: 1 },
// // ];

// // /* depth slots for mobile deck (index 0 = top/front card) */
// // const MOBILE_STACK = [
// //   { rotate:  0,  x:  0,  y:  0,  scale: 1.00, z: 10 },
// //   { rotate: -6,  x: -8,  y:  8,  scale: 0.94, z:  7 },
// //   { rotate:  5,  x:  6,  y: 14,  scale: 0.88, z:  4 },
// //   { rotate: -4,  x:  4,  y: 20,  scale: 0.82, z:  1 },
// //   { rotate:  3,  x: -2,  y: 26,  scale: 0.76, z:  0 },
// // ];

// // /* ─────────────────────────────────────────────────────
// //    MobileCarousel
// //    Tap/swipe → top card flies out horizontally (like
// //    dealing a deck), cards beneath shift forward.
// //    Native touch listeners avoid the passive-event error.
// // ───────────────────────────────────────────────────── */
// // function MobileCarousel({ ideas, isModerator, token, onDeleted, formatDate, dims }) {
// //   const { W: CARD_W, H: CARD_H } = dims;
// //   const count = ideas.length;

// //   /* deck offset — which card is currently on top */
// //   const [offset,    setOffset]    = useState(0);
// //   const [animating, setAnimating] = useState(false);
// //   /* which raw index is currently flying out */
// //   const [flyingIdx, setFlyingIdx] = useState(null);

// //   const containerRef = useRef(null);
// //   const touchStartX  = useRef(null);
// //   const touchStartY  = useRef(null);

// //   /* inject keyframes once */
// //   useEffect(() => {
// //     if (document.getElementById("deck-kf")) return;
// //     const s = document.createElement("style");
// //     s.id = "deck-kf";
// //     s.textContent = `
// //       @keyframes deckFlyOut {
// //         0%   { opacity: 1;   transform: var(--tf-start); }
// //         70%  { opacity: 0.5; transform: translateX(-130%) rotate(-22deg) scale(0.88); }
// //         100% { opacity: 0;   transform: translateX(-170%) rotate(-28deg) scale(0.82); }
// //       }
// //     `;
// //     document.head.appendChild(s);
// //   }, []);

// //   /* native touch listeners — passive:false only on touchmove */
// //   useEffect(() => {
// //     const el = containerRef.current;
// //     if (!el) return;

// //     const onStart = (e) => {
// //       touchStartX.current = e.touches[0].clientX;
// //       touchStartY.current = e.touches[0].clientY;
// //     };

// //     const onMove = (e) => {
// //       if (touchStartX.current === null) return;
// //       const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
// //       const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
// //       /* only block page scroll when clearly swiping sideways */
// //       if (dx > dy && dx > 8) e.preventDefault();
// //     };

// //     const onEnd = (e) => {
// //       if (touchStartX.current === null) return;
// //       const dx = e.changedTouches[0].clientX - touchStartX.current;
// //       if (Math.abs(dx) > 36) advance();
// //       touchStartX.current = null;
// //       touchStartY.current = null;
// //     };

// //     el.addEventListener("touchstart", onStart, { passive: true  });
// //     el.addEventListener("touchmove",  onMove,  { passive: false });
// //     el.addEventListener("touchend",   onEnd,   { passive: true  });

// //     return () => {
// //       el.removeEventListener("touchstart", onStart);
// //       el.removeEventListener("touchmove",  onMove);
// //       el.removeEventListener("touchend",   onEnd);
// //     };
// //   }, [animating, offset]); // eslint-disable-line react-hooks/exhaustive-deps

// //   const advance = useCallback(() => {
// //     if (animating || count <= 1) return;
// //     setAnimating(true);

// //     /* which raw index is currently on top */
// //     const topRawIdx = offset % count;
// //     setFlyingIdx(topRawIdx);

// //     setTimeout(() => {
// //       setOffset(prev => (prev + 1) % count);
// //       setFlyingIdx(null);
// //       setTimeout(() => setAnimating(false), 40);
// //     }, 360);
// //   }, [animating, count, offset]);

// //   /* active dot = the idea currently on top */
// //   const activeRawIdx = offset % count;

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>

// //       {/* deck */}
// //       <div
// //         ref={containerRef}
// //         style={{
// //           position: "relative",
// //           width: CARD_W + 30,
// //           height: CARD_H + 40,
// //           cursor: count > 1 ? "pointer" : "default",
// //           userSelect: "none",
// //         }}
// //         onClick={advance}
// //       >
// //         {ideas.map((idea, rawIdx) => {
// //           /* depth: 0 = top card, 1 = one below, etc. */
// //           const depth = ((rawIdx - offset) % count + count) % count;
// //           if (depth >= MOBILE_STACK.length) return null;

// //           const slot    = MOBILE_STACK[depth];
// //           const isTop   = depth === 0;
// //           const isFlying = rawIdx === flyingIdx;

// //           /* base CSS transform string for keyframe variable */
// //           const tfBase = `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`;

// //           /* when top card flies, cards below smoothly shift one step forward */
// //           const prevSlot = MOBILE_STACK[Math.max(0, depth - 1)];
// //           const tfTarget = `translateX(${prevSlot.x}px) translateY(${prevSlot.y}px) rotate(${prevSlot.rotate}deg) scale(${prevSlot.scale})`;

// //           return (
// //             <div
// //               key={idea.id}
// //               style={{
// //                 position:   "absolute",
// //                 top:        0,
// //                 left:       "50%",
// //                 marginLeft: -CARD_W / 2,
// //                 width:      CARD_W,
// //                 height:     CARD_H,
// //                 zIndex:     isFlying ? 20 : slot.z,
// //                 willChange: "transform, opacity",
// //                 "--tf-start": tfBase,

// //                 /* flying card: play keyframe */
// //                 ...(isFlying ? {
// //                   animation: "deckFlyOut 0.36s cubic-bezier(0.4,0,0.9,0.8) forwards",
// //                 } : {
// //                   /* idle / advancing: smooth transition */
// //                   transform:  flyingIdx !== null && !isTop ? tfTarget : tfBase,
// //                   transition: flyingIdx !== null
// //                     ? "transform 0.36s cubic-bezier(0.34,1.1,0.64,1)"
// //                     : "transform 0.4s cubic-bezier(0.34,1.1,0.64,1)",
// //                   opacity: 1,
// //                 }),
// //               }}
// //             >
// //               <GlassIdeaCard
// //                 idea={idea}
// //                 isModerator={isModerator}
// //                 token={token}
// //                 onDeleted={onDeleted}
// //                 formatDate={formatDate}
// //                 cardH={CARD_H}
// //                 style={{
// //                   width:  CARD_W,
// //                   height: CARD_H,
// //                   cursor: isTop && count > 1 ? "pointer" : "default",
// //                 }}
// //                 onClick={isTop ? (e) => { e.stopPropagation(); advance(); } : undefined}
// //               />
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* dots */}
// //       {count > 1 && (
// //         <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
// //           {ideas.map((_, i) => (
// //             <div key={i} style={{
// //               width:      i === activeRawIdx ? 18 : 6,
// //               height:     6,
// //               borderRadius: 999,
// //               background: i === activeRawIdx ? "#26F2D0" : "rgba(255,255,255,0.25)",
// //               transition: "all 0.3s ease",
// //             }} />
// //           ))}
// //         </div>
// //       )}

// //       {count > 1 && (
// //         <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", margin: 0, letterSpacing: "0.04em" }}>
// //           tap or swipe to flip
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────────────
// //    HomeIdeaCard — top-level, routes by breakpoint
// // ───────────────────────────────────────────────────── */
// // const HomeIdeaCard = ({ ideas = [], isModerator, token, onDeleted, formatDate }) => {
// //   const [dims,    setDims]    = useState(getCardDimensions);
// //   const [hovered, setHovered] = useState(false);

// //   useEffect(() => {
// //     const onResize = () => setDims(getCardDimensions());
// //     window.addEventListener("resize", onResize);
// //     return () => window.removeEventListener("resize", onResize);
// //   }, []);

// //   const count = ideas.length;
// //   const { W: CARD_W, H: CARD_H, GAP: CARD_GAP, bucket } = dims;

// //   /* ── Mobile ── */
// //   if (bucket === "mobile") {
// //     return (
// //       <MobileCarousel
// //         ideas={ideas}
// //         isModerator={isModerator}
// //         token={token}
// //         onDeleted={onDeleted}
// //         formatDate={formatDate}
// //         dims={dims}
// //       />
// //     );
// //   }

// //   /* ── Desktop / Tablet: stack → spread fan on hover ── */
// //   const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

// //   return (
// //     <div
// //       style={{
// //         position: "relative",
// //         width: hovered ? spreadW : CARD_W + 60,
// //         height: CARD_H + 40,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         cursor: "pointer",
// //         margin: "0 auto",
// //         transition: "width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
// //       }}
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //     >
// //       {ideas.map((idea, i) => {
// //         const spreadX       = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
// //         const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;

// //         const slotIdx       = Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1));
// //         const slot          = STACK_TRANSFORMS[slotIdx];
// //         const stackTransform = `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg)`;

// //         return (
// //           <GlassIdeaCard
// //             key={idea.id}
// //             idea={idea}
// //             isModerator={isModerator}
// //             token={token}
// //             onDeleted={onDeleted}
// //             formatDate={formatDate}
// //             cardH={CARD_H}
// //             style={{
// //               position:   "absolute",
// //               width:      CARD_W,
// //               height:     CARD_H,
// //               transform:  hovered ? spreadTransform : stackTransform,
// //               zIndex:     hovered ? i + 1 : slot.z,
// //               transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
// //               cursor:     "default",
// //             }}
// //           />
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default HomeIdeaCard;

// import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// /* ── Responsive card dimensions ── */
// const getCardDimensions = () => {
//   const w = window.innerWidth;
//   if (w < 640)  return { W: 200, H: 240, GAP: 12, bucket: "mobile" };
//   if (w < 1024) return { W: 230, H: 275, GAP: 16, bucket: "tablet" };
//   return           { W: 270, H: 310, GAP: 20, bucket: "desktop" };
// };

// /* ── Category config ── */
// const CATEGORY_ICONS = {
//   Tech:           "/techh.png",
//   Academic:       "/academic.png",
//   "Campus Pulse": "/campuspulse.png",
//   Cultural:       "/cultural.png",
// };

// const CATEGORY_ACCENT = {
//   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
//   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
//   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
//   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// };

// const getLinkLabel = (url) => {
//   if (!url) return "View";
//   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
//   if (url.includes("instagram")) return "📸 Instagram";
//   if (url.includes("drive.google")) return "📁 Drive";
//   if (url.includes("linkedin")) return "💼 LinkedIn";
//   return "🔗 View";
// };

// /* ── Delete button ── */
// const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
//   const [confirm,  setConfirm]  = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     setDeleting(true);
//     setErrorMsg("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         onDeleted(ideaId);
//       } else if (res.status === 403) {
//         setConfirm(false);
//         setErrorMsg("Seems you are not the one who implemented this idea.");
//         setTimeout(() => setErrorMsg(""), 3000);
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (confirm) {
//     return (
//       <div style={{ position: "relative" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
//           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
//           <button onClick={handleDelete} disabled={deleting}
//             style={{
//               fontSize: 11, color: "#f87171", fontWeight: 600,
//               padding: "2px 8px", borderRadius: 999,
//               background: "rgba(239,68,68,0.12)",
//               border: "1px solid rgba(239,68,68,0.25)",
//               cursor: "pointer", opacity: deleting ? 0.5 : 1,
//             }}>
//             {deleting ? "..." : "Yes"}
//           </button>
//           <button onClick={e => { e.stopPropagation(); setConfirm(false); }}
//             style={{
//               fontSize: 11, color: "#6b7280", padding: "2px 8px",
//               borderRadius: 999, background: "rgba(255,255,255,0.06)",
//               border: "none", cursor: "pointer",
//             }}>
//             No
//           </button>
//         </div>
//         {errorMsg && (
//           <div style={{
//             position: "absolute", top: 28, right: 0, width: 200,
//             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//             color: "#f87171", fontSize: 11, borderRadius: 10,
//             padding: "8px 12px", zIndex: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//           }}>
//             {errorMsg}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       <button onClick={e => { e.stopPropagation(); setConfirm(true); }}
//         title="Remove from showcase"
//         style={{
//           padding: 6, borderRadius: 0, color: "#ef4444", cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           transition: "all 0.2s",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
//         onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
//         <Trash2 size={8} />
//       </button>
//       {errorMsg && (
//         <div style={{
//           position: "absolute", top: 28, right: 0, width: 200,
//           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//           color: "#f87171", fontSize: 11, borderRadius: 10, padding: "8px 12px", zIndex: 20,
//         }}>
//           {errorMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────
//    GlassIdeaCard — single card shell
// ───────────────────────────────────────────────────── */
// function GlassIdeaCard({ idea, style, isModerator, token, onDeleted, formatDate, cardH, onClick }) {
//   const accent = CATEGORY_ACCENT[idea.category] || {
//     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
//   };

//   const proposedBy = idea.classProposal ? `🏛️ ${idea.proposalClass}` : `💡 ${idea.createdByName}`;
//   const proposedBySubtext = idea.classProposal
//     ? `Class Proposal · ${idea.category}`
//     : `${idea.createdByBranch} · ${idea.createdByYear}`;

//   const imgH  = cardH >= 300 ? 110 : cardH >= 260 ? 96 : 80;
//   const iconH = cardH >= 300 ? 90  : cardH >= 260 ? 80 : 64;

//   return (
//     <div onClick={onClick} style={{
//       borderRadius: 16,
//       background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
//       border: "1px solid rgba(255,255,255,0.13)",
//       boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
//       backdropFilter: "blur(14px)",
//       WebkitBackdropFilter: "blur(14px)",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column",
//       flexShrink: 0,
//       ...style,
//     }}>

//       {/* category top bar */}
//       <div style={{
//         height: 3, flexShrink: 0,
//         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
//         boxShadow: `0 0 10px ${accent.glow}`,
//       }} />

//       {/* image or icon */}
//       {idea.showcaseImageUrl ? (
//         <div style={{ height: imgH, flexShrink: 0, position: "relative", overflow: "hidden" }}>
//           <img src={idea.showcaseImageUrl} alt={idea.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
//           }} />
//           <span style={{
//             position: "absolute", bottom: 6, left: 8,
//             fontSize: 9, padding: "2px 7px", borderRadius: 999,
//             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
//           }}>
//             ✅ Implemented
//           </span>
//         </div>
//       ) : (
//         <div style={{
//           height: iconH, flexShrink: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//         }}>
//           <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
//             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }} alt="" />
//         </div>
//       )}

//       {/* body */}
//       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
//           <p style={{
//             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
//             margin: 0, flex: 1,
//             display: "-webkit-box", WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical", overflow: "hidden",
//           }}>
//             {idea.title}
//           </p>
//           {idea.showcaseLink && (
//             <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
//               onClick={e => e.stopPropagation()}
//               style={{
//                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
//                 padding: "3px 7px", borderRadius: 8,
//                 background: "rgba(255,255,255,0.08)",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
//                 whiteSpace: "nowrap", transition: "all 0.2s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
//               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
//               {getLinkLabel(idea.showcaseLink)}
//               <ExternalLink size={8} />
//             </a>
//           )}
//         </div>

//         <div style={{ marginTop: "auto" }}>
//           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>{proposedBy}</p>
//           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>{proposedBySubtext}</p>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <span style={{ fontSize: 10, color: "#26F2D0", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
//             <ThumbsUp size={9} /> {idea.likes || 0}
//           </span>
//           {idea.reviewedAt && (
//             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
//               <Calendar size={8} />
//               {formatDate(idea.reviewedAt)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* bottom label bar */}
//       <div style={{
//         height: 34, flexShrink: 0,
//         background: "rgba(255,255,255,0.05)",
//         borderTop: "1px solid rgba(255,255,255,0.07)",
//         display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//       }}>
//         <span style={{
//           fontSize: 10, color: "#d1d5db", fontWeight: 500,
//           letterSpacing: "0.06em", textTransform: "uppercase",
//         }}>
//           {idea.category || "Idea"}
//         </span>
//         {isModerator && (
//           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────
//    Stack/spread transforms — shared by all breakpoints
//    index 0 = leftmost fan position, middle = top card
// ───────────────────────────────────────────────────── */
// const STACK_TRANSFORMS = [
//   { rotate: -15, x: -30, y: 20, z: 1 },
//   { rotate: -8,  x: -14, y: 10, z: 2 },
//   { rotate:  0,  x:   0, y:  0, z: 3 },
//   { rotate:  8,  x:  14, y: 10, z: 2 },
//   { rotate:  15, x:  30, y: 20, z: 1 },
// ];

// /* ─────────────────────────────────────────────────────
//    HomeIdeaCard
//    • Desktop / Tablet : hover  → spread fan
//    • Mobile           : tap    → spread fan (tap again to collapse)
//    Native touchstart on the wrapper closes the fan when
//    tapping outside — no passive-event errors.
// ───────────────────────────────────────────────────── */
// const HomeIdeaCard = ({ ideas = [], isModerator, token, onDeleted, formatDate }) => {
//   const [dims,    setDims]    = useState(getCardDimensions);
//   /* `expanded` drives both hover (desktop) and tap (mobile) */
//   const [expanded, setExpanded] = useState(false);
//   const wrapperRef = useRef(null);

//   /* update dims on resize */
//   useEffect(() => {
//     const onResize = () => setDims(getCardDimensions());
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const { W: CARD_W, H: CARD_H, GAP: CARD_GAP, bucket } = dims;
//   const isMobile = bucket === "mobile";
//   const count    = ideas.length;

//   /* ── Mobile: tap outside the spread → collapse ── */
//   useEffect(() => {
//     if (!isMobile || !expanded) return;

//     /* use native listener with passive:true — no preventDefault needed */
//     const onOutsideTap = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setExpanded(false);
//       }
//     };

//     /* small delay so the tap that opened it doesn't immediately close it */
//     const tid = setTimeout(() => {
//       document.addEventListener("touchstart", onOutsideTap, { passive: true });
//       document.addEventListener("mousedown",  onOutsideTap);
//     }, 50);

//     return () => {
//       clearTimeout(tid);
//       document.removeEventListener("touchstart", onOutsideTap);
//       document.removeEventListener("mousedown",  onOutsideTap);
//     };
//   }, [isMobile, expanded]);

//   /* ── Geometry ── */
//   const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

//   /* on mobile the spread goes vertical-scroll-safe by capping width */
//   const containerW = expanded
//     ? (isMobile ? Math.min(spreadW, window.innerWidth - 32) : spreadW)
//     : CARD_W + 60;

//   /* hint label */
//   const hint = expanded ? "tap outside to close" : (isMobile ? "tap to see all" : null);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>

//       {/* ── card deck wrapper ── */}
//       <div
//         ref={wrapperRef}
//         style={{
//           position:   "relative",
//           width:      containerW,
//           height:     CARD_H + 40,
//           display:    "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor:     count > 1 ? "pointer" : "default",
//           margin:     "0 auto",
//           /* on mobile spread, allow horizontal overflow to be visible */
//           overflow:   "visible",
//           transition: "width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
//         }}
//         /* Desktop: hover triggers expand */
//         onMouseEnter={() => !isMobile && setExpanded(true)}
//         onMouseLeave={() => !isMobile && setExpanded(false)}
//         /* Mobile: tap on the stacked deck toggles expand */
//         onClick={() => isMobile && count > 1 && setExpanded(prev => !prev)}
//       >
//         {ideas.map((idea, i) => {
//           /* spread: evenly spaced, centred */
//           const spreadX       = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
//           const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;

//           /* stack: fanned behind the front card */
//           const slotIdx       = Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1));
//           const slot          = STACK_TRANSFORMS[slotIdx];
//           const stackTransform = `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg)`;

//           return (
//             <GlassIdeaCard
//               key={idea.id}
//               idea={idea}
//               isModerator={isModerator}
//               token={token}
//               onDeleted={onDeleted}
//               formatDate={formatDate}
//               cardH={CARD_H}
//               style={{
//                 position:   "absolute",
//                 width:      CARD_W,
//                 height:     CARD_H,
//                 transform:  expanded ? spreadTransform : stackTransform,
//                 zIndex:     expanded ? i + 1 : slot.z,
//                 transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
//                 cursor:     expanded ? "default" : (count > 1 ? "pointer" : "default"),
//               }}
//               /* stop individual card clicks from bubbling up and re-toggling the deck */
//               onClick={expanded ? (e) => e.stopPropagation() : undefined}
//             />
//           );
//         })}
//       </div>

//       {/* hint — mobile only */}
//       {isMobile && count > 1 && (
//         <p style={{
//           fontSize: 11,
//           color: "rgba(255,255,255,0.28)",
//           margin: 0,
//           letterSpacing: "0.04em",
//           transition: "opacity 0.3s",
//         }}>
//           {hint}
//         </p>
//       )}
//     </div>
//   );
// };

// export default HomeIdeaCard;

import { ExternalLink, Trash2, ThumbsUp, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

/* ── Responsive card dimensions ── */
const getCardDimensions = () => {
  const w = window.innerWidth;
  if (w < 640)  return { W: 200, H: 240, GAP: 12, bucket: "mobile" };
  if (w < 1024) return { W: 230, H: 275, GAP: 16, bucket: "tablet" };
  return           { W: 270, H: 310, GAP: 20, bucket: "desktop" };
};

/* ── Category config ── */
const CATEGORY_ICONS = {
  Tech:           "/techh.png",
  Academic:       "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural:       "/cultural.png",
};

const CATEGORY_ACCENT = {
  Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
  Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
  "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
  Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
};

const getLinkLabel = (url) => {
  if (!url) return "View";
  if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
  if (url.includes("instagram")) return "📸 Instagram";
  if (url.includes("drive.google")) return "📁 Drive";
  if (url.includes("linkedin")) return "💼 LinkedIn";
  return "🔗 View";
};

/* ── Delete button ── */
const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
  const [confirm,  setConfirm]  = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    setErrorMsg("");
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onDeleted(ideaId);
      } else if (res.status === 403) {
        setConfirm(false);
        setErrorMsg("Seems you are not the one who implemented this idea.");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (confirm) {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
          <button onClick={handleDelete} disabled={deleting}
            style={{
              fontSize: 11, color: "#f87171", fontWeight: 600,
              padding: "2px 8px", borderRadius: 999,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              cursor: "pointer", opacity: deleting ? 0.5 : 1,
            }}>
            {deleting ? "..." : "Yes"}
          </button>
          <button onClick={e => { e.stopPropagation(); setConfirm(false); }}
            style={{
              fontSize: 11, color: "#6b7280", padding: "2px 8px",
              borderRadius: 999, background: "rgba(255,255,255,0.06)",
              border: "none", cursor: "pointer",
            }}>
            No
          </button>
        </div>
        {errorMsg && (
          <div style={{
            position: "absolute", top: 28, right: 0, width: 200,
            background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171", fontSize: 11, borderRadius: 10,
            padding: "8px 12px", zIndex: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            {errorMsg}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button onClick={e => { e.stopPropagation(); setConfirm(true); }}
        title="Remove from showcase"
        style={{
          padding: 6, borderRadius: 0, color: "#ef4444", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
        <Trash2 size={8} />
      </button>
      {errorMsg && (
        <div style={{
          position: "absolute", top: 28, right: 0, width: 200,
          background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
          color: "#f87171", fontSize: 11, borderRadius: 10, padding: "8px 12px", zIndex: 20,
        }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   GlassIdeaCard — single card shell
───────────────────────────────────────────────────── */
function GlassIdeaCard({ idea, style, isModerator, token, onDeleted, formatDate, cardH, onClick }) {
  const accent = CATEGORY_ACCENT[idea.category] || {
    from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
  };

  const proposedBy = idea.classProposal ? `🏛️ ${idea.proposalClass}` : `💡 ${idea.createdByName}`;
  const proposedBySubtext = idea.classProposal
    ? `Class Proposal · ${idea.category}`
    : `${idea.createdByBranch} · ${idea.createdByYear}`;

  const imgH  = cardH >= 300 ? 110 : cardH >= 260 ? 96 : 80;
  const iconH = cardH >= 300 ? 90  : cardH >= 260 ? 80 : 64;

  return (
    <div onClick={onClick} style={{
      borderRadius: 16,
      background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
      border: "1px solid rgba(255,255,255,0.13)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      ...style,
    }}>
      {/* category top bar */}
      <div style={{
        height: 3, flexShrink: 0,
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 0 10px ${accent.glow}`,
      }} />

      {/* image or icon */}
      {idea.showcaseImageUrl ? (
        <div style={{ height: 170, flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <img src={idea.showcaseImageUrl} alt={idea.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          }} />
          <span style={{
            position: "absolute", bottom: 6, left: 8,
            fontSize: 9, padding: "2px 7px", borderRadius: 999,
            background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
          }}>
            ✅ Implemented
          </span>
        </div>
      ) : (
        <div style={{
          height: 170, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
            style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }} alt="" />
        </div>
      )}

      {/* body */}
      <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
          <p style={{
            color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
            margin: 0, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {idea.title}
          </p>
          {idea.showcaseLink && (
            <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
                padding: "3px 7px", borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#9ca3af", fontSize: 10, textDecoration: "none",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
              {getLinkLabel(idea.showcaseLink)}
              <ExternalLink size={8} />
            </a>
          )}
        </div>

        <div style={{ marginTop: "auto" }}>
          <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>{proposedBy}</p>
          <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>{proposedBySubtext}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#26F2D0", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
            <ThumbsUp size={9} /> {idea.likes || 0}
          </span>
          {idea.reviewedAt && (
            <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
              <Calendar size={8} />
              {formatDate(idea.reviewedAt)}
            </span>
          )}
        </div>
      </div>

      {/* bottom label bar */}
      <div style={{
        height: 34, flexShrink: 0,
        background: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}>
        <span style={{
          fontSize: 10, color: "#d1d5db", fontWeight: 500,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {idea.category || "Idea"}
        </span>
        {isModerator && (
          <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Stack transforms for desktop/tablet fan
───────────────────────────────────────────────────── */
const STACK_TRANSFORMS = [
  { rotate: -15, x: -30, y: 20, z: 1 },
  { rotate: -8,  x: -14, y: 10, z: 2 },
  { rotate:  0,  x:   0, y:  0, z: 3 },
  { rotate:  8,  x:  14, y: 10, z: 2 },
  { rotate:  15, x:  30, y: 20, z: 1 },
];

/* ─────────────────────────────────────────────────────
   MobileDeck — stacked fan that animates like desktop
   but expands vertically (safe, no overflow clip issues)
   First card is always visible on top.
   Tap the deck → cards fan out vertically one by one.
   Tap "Show less" → collapses back.
───────────────────────────────────────────────────── */
function MobileDeck({ ideas, isModerator, token, onDeleted, formatDate, dims }) {
  const { W: CARD_W, H: CARD_H } = dims;
  const [expanded, setExpanded] = useState(false);
  const count = ideas.length;

  /* Stack offsets for collapsed state — each card peeks below */
  const PEEK_OFFSETS = [0, 10, 18, 24, 28]; // px down from top for each depth

  /* Collapsed: stacked deck with first idea on top */
  /* Expanded:  all cards in a vertical column */

  const EXPANDED_GAP = 16; // gap between cards when expanded

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>

      {/* ── Deck / List area ── */}
      <div
        style={{
          position: "relative",
          width: CARD_W,
          /* height expands to fit all cards when open */
          height: expanded
            ? count * CARD_H + (count - 1) * EXPANDED_GAP
            : CARD_H + (Math.min(count, 5) - 1) * 10 + 10,
          transition: "height 0.5s cubic-bezier(0.34,1.05,0.64,1)",
          cursor: !expanded && count > 1 ? "pointer" : "default",
          margin: "0 auto",
        }}
        onClick={() => !expanded && count > 1 && setExpanded(true)}
      >
        {/* Render in reverse so first idea (index 0) is on top */}
        {[...ideas].reverse().map((idea, revIdx) => {
          const i = count - 1 - revIdx; // original index (0 = first = top card)

          /* collapsed: peek stack — first idea (i=0) sits at top, others peek below */
          const peekY    = Math.min(i, PEEK_OFFSETS.length - 1);
          const stackTop = PEEK_OFFSETS[peekY];

          /* collapsed rotation — slight fan tilt, first card upright */
          const ROTATIONS = [0, -3, 2, -2, 3];
          const stackRotate = ROTATIONS[Math.min(i, ROTATIONS.length - 1)];

          /* expanded: each card at its natural vertical position */
          const expandedTop = i * (CARD_H + EXPANDED_GAP);

          /* scale — cards behind are slightly smaller in collapsed */
          const stackScale = 1 - i * 0.03;

          return (
            <div
              key={idea.id}
              style={{
                position: "absolute",
                top:      0,
                left:     0,
                width:    CARD_W,
                zIndex:   expanded ? count - i : count - i, // first idea always on top
                transform: expanded
                  ? `translateY(${expandedTop}px) rotate(0deg) scale(1)`
                  : `translateY(${stackTop}px) rotate(${stackRotate}deg) scale(${stackScale})`,
                transition: [
                  `transform 0.5s cubic-bezier(0.34,1.05,0.64,1) ${expanded ? i * 40 : (count - 1 - i) * 30}ms`,
                  `opacity   0.4s ease ${expanded ? i * 40 : 0}ms`,
                ].join(", "),
                /* cards below first are slightly hidden in collapsed */
                opacity: expanded ? 1 : i === 0 ? 1 : Math.max(0, 1 - i * 0.15),
                pointerEvents: expanded || i === 0 ? "auto" : "none",
              }}
            >
              <GlassIdeaCard
                idea={idea}
                isModerator={isModerator}
                token={token}
                onDeleted={onDeleted}
                formatDate={formatDate}
                cardH={CARD_H}
                style={{ width: CARD_W, height: CARD_H }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Toggle button ── */}
      {count > 1 && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 20px", borderRadius: 999,
            background: expanded ? "rgba(38,242,208,0.12)" : "rgba(255,255,255,0.07)",
            border: `1px solid ${expanded ? "rgba(38,242,208,0.35)" : "rgba(255,255,255,0.15)"}`,
            color: expanded ? "#26F2D0" : "#9ca3af",
            fontSize: 12, fontWeight: 500, cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {expanded ? (
            <><ChevronUp size={13} /> Show less</>
          ) : (
            <><ChevronDown size={13} /> See all {count} ideas</>
          )}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HomeIdeaCard — routes by breakpoint
   Mobile  → MobileDeck (vertical expand, no overflow)
   Tablet / Desktop → horizontal fan on hover
───────────────────────────────────────────────────── */
const HomeIdeaCard = ({ ideas = [], isModerator, token, onDeleted, formatDate }) => {
  const [dims,    setDims]    = useState(getCardDimensions);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onResize = () => setDims(getCardDimensions());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { W: CARD_W, H: CARD_H, GAP: CARD_GAP, bucket } = dims;
  const count = ideas.length;

  /* ── Mobile: vertical deck ── */
  if (bucket === "mobile") {
  return (
    <div
      style={{
        display: "flex",
        gap: CARD_GAP,
        overflowX: "auto",
        padding: "10px 0",
        width: "100%",
      }}
    >
      {ideas.map((idea) => (
        <GlassIdeaCard
          key={idea.id}
          idea={idea}
          isModerator={isModerator}
          token={token}
          onDeleted={onDeleted}
          formatDate={formatDate}
          cardH={CARD_H}
          style={{
            width: CARD_W,
            height: CARD_H,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
  /* ── Desktop / Tablet: horizontal fan on hover ── */
  const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

  return (
    <div
      style={{
        position: "relative",
        width: hovered ? spreadW : CARD_W + 60,
        height: CARD_H + 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: count > 1 ? "pointer" : "default",
        margin: "0 auto",
        overflow: "visible",
        transition: "width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {ideas.map((idea, i) => {
        const spreadX        = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
        const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;

        const slotIdx        = Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1));
        const slot           = STACK_TRANSFORMS[slotIdx];
        const stackTransform  = `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg)`;

        return (
          <GlassIdeaCard
            key={idea.id}
            idea={idea}
            isModerator={isModerator}
            token={token}
            onDeleted={onDeleted}
            formatDate={formatDate}
            cardH={CARD_H}
            style={{
              position:   "absolute",
              width:      CARD_W,
              height:     CARD_H,
              transform:  hovered ? spreadTransform : stackTransform,
              zIndex:     hovered ? i + 1 : slot.z,
              transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
              cursor:     "default",
            }}
          />
        );
      })}
    </div>
  );
};

export default HomeIdeaCard;