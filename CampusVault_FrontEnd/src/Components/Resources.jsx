import React, { useState } from "react";

const BASE = "http://localhost:8081";

const Resources = () => {
  const [paperDomain, setPaperDomain] = useState("");
  const [notesDomain, setNotesDomain] = useState("");
  const [papers, setPapers] = useState([]);
  const [notes,  setNotes]  = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("papers");
  const [loadingPapers, setLoadingPapers] = useState(false);
  const [loadingNotes,  setLoadingNotes]  = useState(false);

  const token = localStorage.getItem("token");

  // ─── Fetch papers from /api/files?domain=... ────────────────────────────
  const fetchPapers = async (selectedDomain) => {
    setPaperDomain(selectedDomain);
    setPapers([]);
    setSearch("");
    if (!selectedDomain) return;
    setLoadingPapers(true);
    try {
      const res = await fetch(
        `${BASE}/api/files?domain=${selectedDomain}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching papers:", err);
    } finally {
      setLoadingPapers(false);
    }
  };

  // ─── Fetch notes from /api/notes?domain=... ─────────────────────────────
  const fetchNotes = async (selectedDomain) => {
    setNotesDomain(selectedDomain);
    setNotes([]);
    setSearch("");
    if (!selectedDomain) return;
    setLoadingNotes(true);
    try {
      const res = await fetch(
        `${BASE}/api/notes?domain=${selectedDomain}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoadingNotes(false);
    }
  };

  // ─── Download ────────────────────────────────────────────────────────────
  const handleDownload = (apiPath, id, filename) => {
    const link = document.createElement("a");
    link.href = `${BASE}/${apiPath}/download/${id}`;
    link.download = filename;
    link.click();
  };

  // ─── Highlight search matches ────────────────────────────────────────────
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 text-black px-1 rounded">{part}</span>
      ) : part
    );
  };

  const filterAndSort = (list) =>
    list
      .map((file) => ({
        ...file,
        matchIndex: file.filename.toLowerCase().indexOf(search.toLowerCase()),
      }))
      .filter((file) => search === "" || file.matchIndex !== -1)
      .sort((a, b) => {
        if (a.matchIndex === -1) return 1;
        if (b.matchIndex === -1) return -1;
        return a.matchIndex - b.matchIndex;
      });

  const filteredPapers = filterAndSort(papers);
  const filteredNotes  = filterAndSort(notes);
  const activeDomain   = activeTab === "papers" ? paperDomain : notesDomain;

  // ─── Domain dropdown ─────────────────────────────────────────────────────
  const DomainSelect = ({ value, onChange }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded bg-gray-700 text-white mt-2"
    >
      <option value="">Select Domain</option>
      <option value="B.Tech">B.Tech</option>
      <option value="Diploma">Diploma</option>
      <option value="MBA">M.B.A</option>
      <option value="M.Tech">M.Tech</option>
    </select>
  );

  // ─── Shared file list ─────────────────────────────────────────────────────
  const FileList = ({ files, apiPath, loading, domain }) => {
    const label = apiPath === "api/files" ? "papers" : "notes";

    if (loading) return (
      <div className="flex items-center gap-2 text-gray-500 text-sm mt-6">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Loading {label}...
      </div>
    );

    if (!domain) return (
      <div className="flex flex-col flex-1 mt-4">
        <p className="text-gray-600 mb-6">← Select a domain to view {label} 🗐</p>
        <div className="mt-28 bg-[#f8fbff] border border-[#d6e4f0] rounded-xl p-5 shadow-sm max-w-2xl">
          <h4 className="text-lg font-semibold text-[#1d3557] mb-3">Note</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
            <li>All materials are shared strictly for academic purposes.</li>
            <li>If you find any wrong or mismatched files, please report them.</li>
          </ul>
        </div>
      </div>
    );

    if (files.length === 0) return (
      <p className="text-gray-600 mt-6">No {label} found for this domain.</p>
    );

    return (
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar mt-2">
        <ul>
          {files.map((file) => (
            <li
              key={file.id}
              className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-3 mb-2 rounded shadow"
            >
              {/* View inline */}
              <span
                className="cursor-pointer font-medium text-[#1d3557] hover:underline"
                onClick={() =>
                  window.open(`${BASE}/${apiPath}/view/${file.id}`, "_blank")
                }
              >
                {highlightText(file.filename, search)}
              </span>

              {/* Download */}
              <button
                onClick={() => handleDownload(apiPath, file.id, file.filename)}
                className="bg-[#1d3557] text-white px-3 py-1 rounded hover:bg-[#457B9D] transition-all shrink-0 ml-3"
              >
                ⬇️ Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="resources" className="flex flex-col md:flex-row h-screen">

      {/* Sidebar */}
      <aside className="w-full md:w-[320px] bg-[#181818] text-white p-8 border-r-2 border-gray-800
                        sticky top-[80px] h-[calc(100vh-80px)]">
        <h3 className="text-3xl font-bold mb-1">Select Domain</h3>
        <p className="text-gray-400 text-sm mb-4">Choose a domain to view resources.</p>

        {/* ✅ Separate dropdown per tab */}
        {activeTab === "papers" ? (
          <>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Papers Domain</p>
            <DomainSelect value={paperDomain} onChange={fetchPapers} />
          </>
        ) : (
          <>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Notes Domain</p>
            <DomainSelect value={notesDomain} onChange={fetchNotes} />
          </>
        )}
      </aside>

      {/* Main Content */}
      <section className="flex flex-col w-full sticky top-[80px] h-[calc(100vh-80px)]
                          no-scrollbar bg-[#f8fbff] text-black p-8 text-left">

        <h2 className="text-3xl font-bold text-[#1d3557] mb-6">Academic Resources</h2>

        {/* Tabs */}
        <div className="flex gap-6 mb-4 border-b border-gray-300">
          <button
            onClick={() => { setActiveTab("papers"); setSearch(""); }}
            className={`pb-2 px-4 font-medium transition-all ${
              activeTab === "papers"
                ? "border-b-4 border-[#1d3557] text-[#1d3557]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            📄 Papers
          </button>
          <button
            onClick={() => { setActiveTab("notes"); setSearch(""); }}
            className={`pb-2 px-4 font-medium transition-all ${
              activeTab === "notes"
                ? "border-b-4 border-[#1d3557] text-[#1d3557]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            🗒️ Notes
          </button>
        </div>

        {/* Search — only when domain selected */}
        {activeDomain && (
          <input
            type="text"
            placeholder="⌕ Search by Subject, Year, or Regulation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#457B9D] bg-[#eaf4ff] p-2 rounded w-full mb-2"
          />
        )}

        {/* ✅ Papers — /api/files?domain=... */}
        {activeTab === "papers" && (
          <FileList
            files={filteredPapers}
            apiPath="api/files"
            loading={loadingPapers}
            domain={paperDomain}
          />
        )}

        {/* ✅ Notes — /api/notes?domain=... */}
        {activeTab === "notes" && (
          <FileList
            files={filteredNotes}
            apiPath="api/notes"
            loading={loadingNotes}
            domain={notesDomain}
          />
        )}

      </section>
    </div>
  );
};

export default Resources;