import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { 
  Users, Award, ShieldCheck, BookOpen, MapPin, Phone, Clock,
  Mail, Settings, LogOut, CheckCircle, Edit, Trash2, Plus, 
  Search, X, MessageSquare, ChevronRight, Check, AlertCircle, FileText
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inquiries");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  
  // Data lists
  const [inquiries, setInquiries] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [stats, setStats] = useState([]);
  const [siteSettings, setSiteSettings] = useState({
    facebook_url: "", instagram_url: "", youtube_url: "", batch_size: ""
  });
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // Search/Filters
  const [inquirySearch, setInquirySearch] = useState("");
  const [topperSearch, setTopperSearch] = useState("");

  // Modals & Forms State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "topper", "course", "branch", "stat"
  const [editItem, setEditItem] = useState(null); // null for create, object for edit
  const [formFields, setFormFields] = useState({});
  const [subjectsList, setSubjectsList] = useState([]); // Dynamic subjects for course edit

  // Alert message
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUsername");
    if (!savedToken) {
      navigate("/admin/login");
    } else {
      setToken(savedToken);
      setUsername(savedUser || "Admin");
      fetchAllData(savedToken);
    }
  }, [navigate]);

  const showMessage = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 4000);
  };

  const fetchAllData = async (authToken) => {
    const headers = { "Authorization": `Token ${authToken}` };
    try {
      // Fetch inquiries
      const resInq = await fetch(`${API_BASE_URL}/api/inquiries/`, { headers });
      if (resInq.status === 401) {
        handleLogout();
        return;
      }
      const dataInq = await resInq.json();
      setInquiries(dataInq);

      // Fetch toppers (public, but auth header works too)
      const resTop = await fetch(`${API_BASE_URL}/api/toppers/`);
      const dataTop = await resTop.json();
      setToppers(dataTop);

      // Fetch courses
      const resCor = await fetch(`${API_BASE_URL}/api/courses/`);
      const dataCor = await resCor.json();
      setCourses(dataCor);

      // Fetch branches
      const resBr = await fetch(`${API_BASE_URL}/api/branches/`);
      const dataBr = await resBr.json();
      setBranches(dataBr);

      // Fetch stats
      const resSt = await fetch(`${API_BASE_URL}/api/stats/`);
      const dataSt = await resSt.json();
      setStats(dataSt);

      // Fetch site settings
      const resSet = await fetch(`${API_BASE_URL}/api/settings/1/`);
      if (resSet.ok) {
        const dataSet = await resSet.json();
        setSiteSettings(dataSet);
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      showMessage("error", "Error connecting to server. Make sure Django is running.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  // API Call wrappers
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const endpointType = modalType === "inquiry" ? "inquiries" : modalType === "branch" ? "branches" : `${modalType}s`;
    const endpoint = `${API_BASE_URL}/api/${endpointType}/`;
    const method = editItem ? "PUT" : "POST";
    const url = editItem ? `${endpoint}${editItem.id}/` : endpoint;

    let body = JSON.stringify(formFields);
    let headers = {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body
      });

      if (response.ok) {
        showMessage("success", `${modalType.toUpperCase()} successfully ${editItem ? "updated" : "created"}!`);
        setModalOpen(false);
        fetchAllData(token);
      } else {
        const errorData = await response.json();
        showMessage("error", `Failed to save: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Network error during operation.");
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    const endpointType = type === "inquiry" ? "inquiries" : type === "branch" ? "branches" : `${type}s`;

    try {
      const response = await fetch(`${API_BASE_URL}/api/${endpointType}/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${token}`
        }
      });

      if (response.ok) {
        showMessage("success", `${type.toUpperCase()} deleted successfully.`);
        fetchAllData(token);
      } else {
        showMessage("error", "Failed to delete item.");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Network error during deletion.");
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        showMessage("success", "Admin credentials updated successfully. You may need to log in again if your token expires.");
        if (credentials.username) {
          setUsername(credentials.username);
          localStorage.setItem("adminUsername", credentials.username);
        }
        setCredentials({ username: "", password: "" });
      } else {
        showMessage("error", "Failed to update credentials.");
      }
    } catch (err) {
      showMessage("error", "Network error updating credentials.");
    }
  };

  const handleInquiryStatusChange = async (inquiry, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries/${inquiry.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        showMessage("success", "Inquiry status updated.");
        fetchAllData(token);
      } else {
        showMessage("error", "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Network error.");
    }
  };

  // Open modals helper
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setModalOpen(true);

    if (item) {
      setFormFields(item);
    } else {
      // Default empty structures
      if (type === "topper") {
        setFormFields({ name: "", school: "", score: "", subject: "", category: "SCIENCE", is_perfect: false, year: "2024-2025" });
      } else if (type === "course") {
        setFormFields({ badge: "FULL YEAR", grade: "7 – 10", title: "", description: "" });
      } else if (type === "branch") {
        setFormFields({ name: "", address: "", phone: "", hours: "Mon–Sun : 1:00 PM – 8:30 PM", image: null });
      } else if (type === "stat") {
        setFormFields({ icon_name: "Users", value: "", label: "" });
      }
    }
  };

  // Filtering lists based on search
  const filteredInquiries = inquiries.filter(inq => 
    inq.student_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
    inq.parent_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
    inq.phone.includes(inquirySearch) ||
    inq.grade.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  const filteredToppers = toppers.filter(top => 
    top.name.toLowerCase().includes(topperSearch.toLowerCase()) ||
    top.school.toLowerCase().includes(topperSearch.toLowerCase()) ||
    top.subject.toLowerCase().includes(topperSearch.toLowerCase()) ||
    top.category.toLowerCase().includes(topperSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#D6242A] flex items-center justify-center font-bold text-base text-white">i</span>
            <div>
              <p className="font-extrabold tracking-wide text-sm">EDUCARE</p>
              <p className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">Console Dashboard</p>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "inquiries"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <MessageSquare size={18} />
              Inquiries Inbox
              {inquiries.filter(i => i.status === 'PENDING').length > 0 && (
                <span className="ml-auto bg-white text-[#D6242A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {inquiries.filter(i => i.status === 'PENDING').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("toppers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "toppers"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <Award size={18} />
              Toppers Honours
            </button>

            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "courses"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <BookOpen size={18} />
              Courses & Subjects
            </button>

            <button
              onClick={() => setActiveTab("branches")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "branches"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <MapPin size={18} />
              Campuses & Info
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "stats"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <FileText size={18} />
              Stats Counters
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-[#D6242A] text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <Settings size={18} />
              Global Settings
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 space-y-3">
          <div className="flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-300">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{username}</p>
              <p className="text-[10px] text-neutral-500 font-bold uppercase">Superuser</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-bold text-xs py-3 rounded-xl transition-all"
          >
            <LogOut size={14} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header bar */}
        <header className="bg-white border-b border-neutral-200 px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight uppercase">
            {activeTab === "inquiries" && "Parent & Student Inquiries"}
            {activeTab === "toppers" && "Toppers honors Board"}
            {activeTab === "courses" && "Curriculum / Courses Editor"}
            {activeTab === "branches" && "Branches & Contact Info"}
            {activeTab === "stats" && "Homepage Statistics Counters"}
          </h2>

          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-xs font-bold text-[#D6242A] hover:underline flex items-center gap-1"
            >
              ← Exit to Website
            </Link>
          </div>
        </header>

        {/* Global floating alerts */}
        {alert.message && (
          <div className="mx-8 mt-6">
            <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${
              alert.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              {alert.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{alert.message}</span>
            </div>
          </div>
        )}

        <div className="flex-1 p-4 md:p-8 overflow-x-auto">
          {/* TAB 1: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {/* Filter controls */}
              <div className="flex items-center gap-4 bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by student, parent name, class, or phone..."
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 pl-9 pr-4 focus:outline-none focus:border-[#D6242A]"
                  />
                </div>
              </div>

              {/* Inquiries List */}
              <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
                {filteredInquiries.length === 0 ? (
                  <div className="p-12 text-center text-neutral-400">
                    <MessageSquare size={48} className="mx-auto mb-4 stroke-1" />
                    <p className="font-semibold text-neutral-500">No inquiries found</p>
                    <p className="text-xs text-neutral-400 mt-1">Queries from visitors will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase text-[11px] tracking-wider">
                          <th className="py-4 px-6">Student & Parent</th>
                          <th className="py-4 px-6">Contact Info</th>
                          <th className="py-4 px-6">Class/Grade</th>
                          <th className="py-4 px-6">Message</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-150">
                        {filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-neutral-50/50">
                            <td className="py-4 px-6">
                              <p className="font-bold text-neutral-900">{inq.student_name}</p>
                              <p className="text-xs text-neutral-500">Parent: {inq.parent_name}</p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-neutral-700 font-medium">{inq.phone}</p>
                              <p className="text-xs text-neutral-400">{inq.email}</p>
                            </td>
                            <td className="py-4 px-6">
                              <span className="bg-neutral-100 text-neutral-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                                {inq.grade}
                              </span>
                            </td>
                            <td className="py-4 px-6 max-w-xs">
                              <p className="text-neutral-600 line-clamp-2 text-xs" title={inq.message}>
                                {inq.message || "—"}
                              </p>
                              <p className="text-[10px] text-neutral-400 mt-1">
                                {new Date(inq.created_at).toLocaleString()}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={inq.status}
                                onChange={(e) => handleInquiryStatusChange(inq, e.target.value)}
                                className={`text-xs font-bold px-2 py-1.5 rounded-lg border focus:outline-none ${
                                  inq.status === "PENDING" ? "bg-amber-50 border-amber-200 text-amber-700" :
                                  inq.status === "CONTACTED" ? "bg-blue-50 border-blue-200 text-blue-700" :
                                  inq.status === "ENROLLED" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                                  "bg-neutral-100 border-neutral-200 text-neutral-700"
                                }`}
                              >
                                <option value="PENDING">Pending</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="ENROLLED">Enrolled</option>
                                <option value="CLOSED">Closed</option>
                              </select>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleDelete("inquiry", inq.id)}
                                className="text-neutral-400 hover:text-[#D6242A] p-2 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TOPPERS */}
          {activeTab === "toppers" && (
            <div className="space-y-6">
              {/* Header actions */}
              <div className="flex items-center justify-between gap-4 bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    value={topperSearch}
                    onChange={(e) => setTopperSearch(e.target.value)}
                    placeholder="Search toppers by name, school, subject..."
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:border-[#D6242A]"
                  />
                </div>
                <button
                  onClick={() => openModal("topper")}
                  className="inline-flex items-center gap-1.5 bg-[#D6242A] hover:bg-[#B81E23] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  <Plus size={14} />
                  Add New Topper
                </button>
              </div>

              {/* Toppers list */}
              <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
                {filteredToppers.length === 0 ? (
                  <div className="p-12 text-center text-neutral-400">
                    <Award size={48} className="mx-auto mb-4 stroke-1" />
                    <p className="font-semibold text-neutral-500">No toppers found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase text-[11px] tracking-wider">
                          <th className="py-4 px-6">Student Name</th>
                          <th className="py-4 px-6">School</th>
                          <th className="py-4 px-6">Score</th>
                          <th className="py-4 px-6">Best In (Subject)</th>
                          <th className="py-4 px-6">Category Group</th>
                          <th className="py-4 px-6">Year</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-150">
                        {filteredToppers.map((top) => (
                          <tr key={top.id} className="hover:bg-neutral-50/50">
                            <td className="py-4 px-6 font-bold text-neutral-900 flex items-center gap-2">
                              {top.name}
                              {top.is_perfect && (
                                <span className="bg-amber-100 text-amber-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Perfect
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-neutral-600">{top.school}</td>
                            <td className="py-4 px-6 font-bold text-neutral-900">{top.score}</td>
                            <td className="py-4 px-6 text-neutral-700 font-semibold">{top.subject}</td>
                            <td className="py-4 px-6 text-neutral-500 text-xs">
                              {top.category === "SCIENCE" && "Aggregate Science"}
                              {top.category === "HINDI" && "Hindi Toppers"}
                              {top.category === "HISTORY_GEOGRAPHY" && "History & Geography"}
                              {top.category === "LITERATURE_LANGUAGE" && "Literature & Language"}
                            </td>
                            <td className="py-4 px-6 text-neutral-500 text-xs">{top.year}</td>
                            <td className="py-4 px-6 text-right space-x-1">
                              <button
                                onClick={() => openModal("topper", top)}
                                className="text-neutral-400 hover:text-[#F3B70E] p-2 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete("topper", top.id)}
                                className="text-neutral-400 hover:text-[#D6242A] p-2 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: COURSES */}
          {activeTab === "courses" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
                <p className="text-sm font-semibold text-neutral-600">Courses determine core class curriculum blocks displayed on Courses page.</p>
                <button
                  onClick={() => openModal("course")}
                  className="inline-flex items-center gap-1.5 bg-[#D6242A] hover:bg-[#B81E23] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  <Plus size={14} />
                  Add New Course
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-[#D6242A]/10 text-[#D6242A] text-[10px] font-extrabold tracking-wider px-2 py-1 rounded">
                          {course.badge}
                        </span>
                        <span className="text-xs text-neutral-500 font-semibold">{course.grade}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{course.title}</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4">{course.description}</p>
                      
                      <div className="border-t border-neutral-100 pt-4 mt-4">
                        <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-2">Subject syllabus highlights</p>
                        {course.subjects && course.subjects.length > 0 ? (
                          <div className="space-y-2">
                            {course.subjects.map((sub) => (
                              <div key={sub.id} className="text-xs flex justify-between items-start gap-2 bg-neutral-50 p-2.5 rounded border border-neutral-150">
                                <div>
                                  <p className="font-bold text-neutral-900">{sub.name}</p>
                                  <p className="text-[11px] text-neutral-500 leading-relaxed mt-0.5">{sub.description}</p>
                                </div>
                                <button 
                                  onClick={() => handleDelete("subject", sub.id)}
                                  className="text-neutral-400 hover:text-[#D6242A] p-1 transition-colors shrink-0"
                                  title="Delete subject highlight"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-400 italic">No subject highlights configured.</p>
                        )}
                        
                        {/* Quick Subject Add */}
                        <button
                          onClick={() => {
                            setModalType("subject");
                            setEditItem(null);
                            setFormFields({ course: course.id, name: "", description: "" });
                            setModalOpen(true);
                          }}
                          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#D6242A] hover:underline"
                        >
                          <Plus size={12} />
                          Add Subject Highlight
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4 mt-6">
                      <button
                        onClick={() => openModal("course", course)}
                        className="text-neutral-400 hover:text-[#F3B70E] p-2 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("course", course.id)}
                        className="text-neutral-400 hover:text-[#D6242A] p-2 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BRANCHES */}
          {activeTab === "branches" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
                <p className="text-sm font-semibold text-neutral-600">Update address, telephone, hours, and visual image paths for physical branches.</p>
                <button
                  onClick={() => openModal("branch")}
                  className="inline-flex items-center gap-1.5 bg-[#D6242A] hover:bg-[#B81E23] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  <Plus size={14} />
                  Add New Branch
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {branches.map((branch) => (
                  <div key={branch.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="p-6 space-y-4">
                      <h3 className="font-extrabold text-xl text-neutral-900 border-b border-neutral-100 pb-2">{branch.name} Campus</h3>
                      <div className="space-y-3 text-xs">
                        <div className="flex items-start gap-2.5">
                          <MapPin size={16} className="text-[#F3B70E] shrink-0 mt-0.5" />
                          <p className="text-neutral-600 leading-relaxed">{branch.address}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone size={16} className="text-[#F3B70E] shrink-0" />
                          <p className="text-neutral-600 font-semibold">{branch.phone}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock size={16} className="text-[#F3B70E] shrink-0" />
                          <p className="text-neutral-600">{branch.hours}</p>
                        </div>
                        <div className="text-sm font-semibold text-neutral-500 truncate flex items-center gap-2">
                          <MapPin size={14} className="text-neutral-400 shrink-0" />
                          {branch.image && (
                            <span className="truncate">
                              Image Path: <a href={branch.image} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{branch.image.split('/').pop()}</a>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-100 flex justify-end gap-2">
                      <button
                        onClick={() => openModal("branch", branch)}
                        className="text-neutral-400 hover:text-[#F3B70E] p-2 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("branch", branch.id)}
                        className="text-neutral-400 hover:text-[#D6242A] p-2 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: STATS */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm flex justify-between items-center">
                <p className="text-sm font-semibold text-neutral-600">Home page statistics bar counters (value edits reflect immediately).</p>
                <button
                  onClick={() => openModal("stat")}
                  className="inline-flex items-center gap-1.5 bg-[#D6242A] hover:bg-[#B81E23] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  <Plus size={14} />
                  Add New Stat
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((st) => (
                  <div key={st.id} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Icon: {st.icon_name}</p>
                      <p className="text-3xl font-extrabold text-[#D6242A]">{st.value}</p>
                      <p className="text-sm font-semibold text-neutral-800 mt-1">{st.label}</p>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-neutral-100 pt-3 mt-4">
                      <button
                        onClick={() => openModal("stat", st)}
                        className="text-neutral-400 hover:text-[#F3B70E] p-1.5 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete("stat", st.id)}
                        className="text-neutral-400 hover:text-[#D6242A] p-1.5 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold text-neutral-900">Global Settings</h2>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch(`${API_BASE_URL}/api/settings/1/`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Token ${token}`
                        },
                        body: JSON.stringify(siteSettings)
                      });
                      if (response.ok) {
                        showMessage("success", "Settings updated successfully.");
                      } else {
                        const errorData = await response.json();
                        showMessage("error", `Failed to update settings: ${JSON.stringify(errorData)}`);
                      }
                    } catch (err) {
                      showMessage("error", "Network error updating settings.");
                    }
                  }}
                  className="space-y-4"
                >

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Instagram URL</label>
                    <input
                      type="url"
                      value={siteSettings.instagram_url || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                      className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Facebook URL</label>
                    <input
                      type="url"
                      value={siteSettings.facebook_url || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                      className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">YouTube URL</label>
                    <input
                      type="url"
                      value={siteSettings.youtube_url || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, youtube_url: e.target.value })}
                      className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="bg-[#D6242A] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#B81E23] transition-colors">
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex justify-between items-center mt-12 mb-6">
                <h2 className="text-xl font-extrabold text-neutral-900">Admin Credentials</h2>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                <form onSubmit={handleUpdateCredentials} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">New Username</label>
                    <input
                      type="text"
                      placeholder="Leave blank to keep current"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">New Password</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="bg-[#D6242A] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#B81E23] transition-colors">
                      Update Credentials
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Global CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-neutral-950 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-base capitalize">
                {editItem ? "Edit" : "Add"} {modalType}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="p-6 space-y-4">
              {/* TOPPER FORM */}
              {modalType === "topper" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Student Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.name || ""}
                        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">School</label>
                      <input
                        type="text"
                        required
                        value={formFields.school || ""}
                        onChange={(e) => setFormFields({ ...formFields, school: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Score (e.g. 99.8 or 98)</label>
                      <input
                        type="text"
                        required
                        value={formFields.score || ""}
                        onChange={(e) => setFormFields({ ...formFields, score: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Best Subject</label>
                      <input
                        type="text"
                        required
                        value={formFields.subject || ""}
                        onChange={(e) => setFormFields({ ...formFields, subject: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Category Group</label>
                      <select
                        value={formFields.category || "SCIENCE"}
                        onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none bg-white"
                      >
                        <option value="SCIENCE">Aggregate Science</option>
                        <option value="HINDI">Hindi Toppers</option>
                        <option value="HISTORY_GEOGRAPHY">History & Geography</option>
                        <option value="LITERATURE_LANGUAGE">Literature & Language</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Academic Year</label>
                      <input
                        type="text"
                        required
                        value={formFields.year || "2024-2025"}
                        onChange={(e) => setFormFields({ ...formFields, year: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="is_perfect"
                      checked={formFields.is_perfect || false}
                      onChange={(e) => setFormFields({ ...formFields, is_perfect: e.target.checked })}
                      className="rounded text-[#D6242A] focus:ring-[#D6242A]"
                    />
                    <label htmlFor="is_perfect" className="text-xs font-bold text-neutral-600">Perfect Score 100/100 (Shows Golden Star Badge)</label>
                  </div>
                </>
              )}

              {/* COURSE FORM */}
              {modalType === "course" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Course Title</label>
                    <input
                      type="text"
                      required
                      value={formFields.title || ""}
                      onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                      placeholder="e.g. ICSE Foundation"
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Badge</label>
                      <input
                        type="text"
                        required
                        value={formFields.badge || "FULL YEAR"}
                        onChange={(e) => setFormFields({ ...formFields, badge: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Target Grade/Classes</label>
                      <input
                        type="text"
                        required
                        value={formFields.grade || "7 – 10"}
                        onChange={(e) => setFormFields({ ...formFields, grade: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Course Overview Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.description || ""}
                      onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* SUBJECT HIGHLIGHT FORM */}
              {modalType === "subject" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Subject Name</label>
                    <input
                      type="text"
                      required
                      value={formFields.name || ""}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      placeholder="e.g. Mathematics"
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Syllabus Highlight Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.description || ""}
                      onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                      placeholder="e.g. core algebra precision, geo board level..."
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* BRANCH FORM */}
              {modalType === "branch" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Branch Name</label>
                    <input
                      type="text"
                      required
                      value={formFields.name || ""}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      placeholder="e.g. Chembur"
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Full Address</label>
                    <textarea
                      required
                      rows={2}
                      value={formFields.address || ""}
                      onChange={(e) => setFormFields({ ...formFields, address: e.target.value })}
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={formFields.phone || ""}
                        onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Class Timings</label>
                      <input
                        type="text"
                        required
                        value={formFields.hours || ""}
                        onChange={(e) => setFormFields({ ...formFields, hours: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Branch Image URL (Imgur link)</label>
                    <input
                      type="url"
                      placeholder="https://i.imgur.com/your-image.jpg"
                      value={formFields.image || (editItem && editItem.image) || ""}
                      onChange={(e) => setFormFields({ ...formFields, image: e.target.value })}
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Google Maps Location URL</label>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/?q=..."
                      value={formFields.google_maps_url || (editItem && editItem.google_maps_url) || ""}
                      onChange={(e) => setFormFields({ ...formFields, google_maps_url: e.target.value })}
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* STAT FORM */}
              {modalType === "stat" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Counter Value</label>
                      <input
                        type="text"
                        required
                        value={formFields.value || ""}
                        onChange={(e) => setFormFields({ ...formFields, value: e.target.value })}
                        placeholder="e.g. 10000+"
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Lucide Icon Name</label>
                      <select
                        value={formFields.icon_name || "Users"}
                        onChange={(e) => setFormFields({ ...formFields, icon_name: e.target.value })}
                        className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none bg-white"
                      >
                        <option value="Users">Users</option>
                        <option value="Award">Award</option>
                        <option value="ShieldCheck">ShieldCheck</option>
                        <option value="BookOpen">BookOpen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Stat Label Description</label>
                    <input
                      type="text"
                      required
                      value={formFields.label || ""}
                      onChange={(e) => setFormFields({ ...formFields, label: e.target.value })}
                      placeholder="e.g. Students Guided"
                      className="w-full text-xs border border-neutral-200 rounded-lg p-2.5 focus:border-[#D6242A] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="bg-neutral-50 px-6 py-4 -mx-6 -mb-6 mt-6 flex justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-white border border-neutral-300 text-neutral-700 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D6242A] hover:bg-[#B81E23] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  {editItem ? "Save Changes" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
