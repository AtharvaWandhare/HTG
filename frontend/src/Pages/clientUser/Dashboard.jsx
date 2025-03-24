import { useState } from "react";
import { Transition } from '@headlessui/react';
import { FaHome, FaProjectDiagram, FaUserFriends, FaWallet, FaUser, FaTimes, FaPlus, FaEnvelope, FaMapMarkerAlt, FaPhone, FaEdit } from "react-icons/fa";

const SidebarItem = ({ icon, text, active, onClick }) => (
  <li
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
      }`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </li>
);

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-5 fixed">
      <h2 className="text-xl font-bold text-blue-600 mb-6">SewaSetu</h2>
      <ul className="space-y-4">
        <SidebarItem
          icon={<FaHome />}
          text="Dashboard"
          active={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem
          icon={<FaProjectDiagram />}
          text="Projects"
          active={activeSection === "projects"}
          onClick={() => setActiveSection("projects")}
        />
        <SidebarItem
          icon={<FaUserFriends />}
          text="Freelancers"
          active={activeSection === "freelancers"}
          onClick={() => setActiveSection("freelancers")}
        />
        <SidebarItem
          icon={<FaWallet />}
          text="Escrow"
          active={activeSection === "escrow"}
          onClick={() => setActiveSection("escrow")}
        />
        <SidebarItem
          icon={<FaUser />}
          text="Profile"
          active={activeSection === "profile"}
          onClick={() => setActiveSection("profile")}
        />
      </ul>
    </div>
  );
};

const CreateProjectForm = ({ onClose }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [paymentType, setPaymentType] = useState("fixed");
  const [duration, setDuration] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectTitle,
      description,
      category,
      budget,
      paymentType,
      duration,
      experienceLevel,
      skills,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create a New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a descriptive title for your project"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Describe your project in detail"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="carpentry">Carpentry</option>
                <option value="painting">Painting</option>
                <option value="landscaping">Landscaping</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your budget"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select duration</option>
                <option value="1-3 days">1-3 days</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select experience level</option>
                <option value="entry">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Skills Required</label>
              <div className="flex">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileSection = () => (
  <Transition
    appear={true}
    show={true}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">S</div>
        <div>
          <h2 className="text-xl font-bold">Sagar Waghmare</h2>
          <p className="text-gray-600">sagar@example.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-gray-600" />
          <span>sagarwaghmare@example.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhone className="text-gray-600" />
          <span>+91 98765-43210</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <span>Mumbai, India</span>
        </div>
      </div>

      <button className="mt-6 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <FaEdit />
        <span>Edit Profile</span>
      </button>
    </div>
  </Transition>
);

const MainDashboard = () => (
  <Transition
    appear={true}
    show={true}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome back, sagarwaghmare!</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">sagarwaghmare</span>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">S</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard title="Active Projects" value="0" linkText="View projects →" />
        <StatCard title="Pending Proposals" value="0" linkText="View projects →" />
        <StatCard title="Completed Projects" value="0" />
        <StatCard title="Total Spent" value="$0" linkText="View payments →" />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ActivityItem text="New proposal received for 'Website Redesign'" time="2 hours ago" />
        <ActivityItem text="New proposal received for 'Mobile App Development'" time="Yesterday" />
      </div>
    </div>
  </Transition>
);

const StatCard = ({ title, value, linkText }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {linkText && <button className="text-blue-600 text-sm mt-2 block">{linkText}</button>}
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="p-3 bg-white rounded-lg shadow mb-2">
    <p>{text}</p>
    <p className="text-sm text-gray-500">{time}</p>
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showCreateProject, setShowCreateProject] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <MainDashboard />;
      case "profile":
        return <ProfileSection />;
      case "projects":
        return <div className="p-6"><h2 className="text-2xl font-bold">Projects Section</h2></div>;
      case "freelancers":
        return <div className="p-6"><h2 className="text-2xl font-bold">Freelancers Section</h2></div>;
      case "escrow":
        return <div className="p-6"><h2 className="text-2xl font-bold">Escrow Section</h2></div>;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen ml-64">
        <div className="mt-6">
          <div className="space-x-4 mb-6">
            <button
              onClick={() => setShowCreateProject(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post a New Project
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Find Freelancers
            </button>
          </div>
          {renderSection()}
        </div>
      </div>

      {showCreateProject && (
        <CreateProjectForm onClose={() => setShowCreateProject(false)} />
      )}
    </div>
  );
};

export default Dashboard;