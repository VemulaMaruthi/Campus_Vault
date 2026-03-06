import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    email: "",
    year: "",
    branch: "",
    degree: ""
  });

  const [error, setError] = useState("");
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const value = e.target.value;
    if (value.length >= 13 && !isValidRoll(value)) {
      setError("The roll number is incorrect");
      return;
    }
    setError("");
    setForm({ ...form, roll: value });
  };

  const inputEmail = (e) => {
    const value = e.target.value;
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
    setForm({ ...form, email: value });
  };

  const isValidRoll = (roll) => {
    return roll.length >= 4 && roll[2] === "C" && roll[3] === "7";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ STEP 1: Validate only — no API call yet, just show declaration
  const handleSubmit = () => {
    if (!form.name || !form.roll || !form.year || !form.branch || !form.email) {
      setError("Please fill all fields");
      return;
    }
    if (!isValidRoll(form.roll)) {
      setError("Invalid roll number. Must contain all characters uppercase");
      return;
    }
    setError("");
    setShowDeclaration(true);
  };

  // ✅ STEP 2: Agreed to declaration — NOW register + login + navigate
  const handleEnter = async () => {
    if (!agreed) return;
    setLoading(true);
    setError("");

    try {
      // Register student
      const response = await fetch("http://localhost:8081/student-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          rollNumber: form.roll,
          email: form.email,
          year: form.year,
          branch: form.branch,
          degree: form.degree
        })
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        setShowDeclaration(false); // back to form to fix error
        setLoading(false);
        return;
      }

      // Auto-login
      const loginRes = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: form.roll }),
      });

      if (!loginRes.ok) {
        setError("Registered but login failed. Please go back and login.");
        setShowDeclaration(false);
        setLoading(false);
        return;
      }

      const data = await loginRes.json();

      // Save to localStorage and navigate
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("rollNumber", data.rollNumber);
      localStorage.setItem("Email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);

      navigate(`/profile/${data.id}/home`);

    } catch (err) {
      setError("Backend not reachable. Try again later.");
      setShowDeclaration(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black
                    bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/vault-bg.jpeg')]
                    bg-no-repeat bg-center bg-[length:75%_auto]">

      <div className="w-[420px] max-w-[95%] bg-[#0b0b0b]/80 backdrop-blur-xl
                      border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(38,242,208,0.15)]
                      hover:shadow-[0_0_80px_rgba(38,242,208,0.25)] transition overflow-hidden no-scrollbar">

        {/* ── Declaration screen ── */}
        {showDeclaration ? (
          <div className="p-8 flex flex-col gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h2 className="text-xl font-bold text-white">Student Declaration</h2>
              <p className="text-gray-400 text-sm mt-1">Please read and agree before entering</p>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl p-5 text-sm text-gray-300 space-y-3 leading-relaxed max-h-52 overflow-y-auto">
              <p>
                I, <span className="text-[#26F2D0] font-semibold">{form.name}</span>, hereby declare that:
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex gap-2">
                  <span className="text-[#26F2D0] shrink-0">→</span>
                  All information I have provided during registration is accurate and truthful.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#26F2D0] shrink-0">→</span>
                  I will use Campus Vault responsibly and respect my fellow students.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#26F2D0] shrink-0">→</span>
                  I will not post offensive, misleading, or plagiarised content.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#26F2D0] shrink-0">→</span>
                  I understand that misuse of this platform may result in my account being suspended.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#26F2D0] shrink-0">→</span>
                  I agree to abide by the rules and guidelines of Campus Vault at all times.
                </li>
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#26F2D0] cursor-pointer shrink-0"
              />
              <span className="text-gray-300 text-sm">
                I have read and agree to the above declaration
              </span>
            </label>

            {error && (
              <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeclaration(false); setAgreed(false); }}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10
                           text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                Go Back
              </button>
              <button
                onClick={handleEnter}
                disabled={!agreed || loading}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  agreed && !loading
                    ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8] hover:shadow-[0_0_20px_rgba(38,242,208,0.4)]"
                    : "bg-[#26F2D0]/20 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Setting up..." : "Enter Campus Vault →"}
              </button>
            </div>
          </div>

        ) : (
          /* ── Registration form ── */
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Set up your Campus Profile
            </h2>

            {error ? (
              <p className="text-red-500 text-center font-semibold mb-2">{error}</p>
            ) : (
              <p className="text-gray-400 text-center text-sm mb-6">
                This will be used when you post ideas or start discussions
              </p>
            )}

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#111] border border-white/10
                           text-white placeholder-gray-500 focus:border-[#26F2D0]
                           focus:outline-none"
              />

              <select
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
              >
                <option value="">Select Degree</option>
                <option value="B.Tech">B.Tech</option>
                <option value="Diploma">Diploma</option>
                <option value="MBA">MBA</option>
                <option value="M.Tech">M.Tech</option>
              </select>

              <input
                name="roll"
                placeholder="Roll Number"
                value={form.roll}
                onChange={inputChange}
                className="w-full p-3 rounded-lg bg-[#111] border border-white/10
                           text-white placeholder-gray-500 focus:border-[#26F2D0]
                           focus:outline-none"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={inputEmail}
                className="w-full p-3 rounded-lg bg-[#111] border border-white/10
                           text-white placeholder-gray-500 focus:border-[#26F2D0]
                           focus:outline-none"
              />

              <div className="flex gap-3">
                <select
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>

                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="CSE-AI">CSE (AI)</option>
                  <option value="CSE-DS">CSE (DS)</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-[#26F2D0] text-black py-3 rounded-xl
                           font-semibold text-lg hover:scale-[1.02]
                           hover:shadow-[0_0_30px_rgba(38,242,208,0.5)]
                           transition"
              >
                Enter Campus Vault →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}