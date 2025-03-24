import { FiMail, FiPhone, FiYoutube, FiHome, FiInfo, FiTool, FiLogIn, FiLinkedin, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SevaSetuLogo from "../components/Assets/SevaSetuLogo.png";

function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img src={SevaSetuLogo} alt="SewaSetu Logo" className="h-20 w-auto object-contain bg-white p-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-300" />
            <p className="text-lg font-semibold mt-3 text-gray-300">Connecting Skills with Opportunities</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <nav className="flex flex-col space-y-2">
            {[
              { icon: <FiHome />, text: "Home", path: "/" },
              { icon: <FiInfo />, text: "About us", path: "/about" },
              { icon: <FiTool />, text: "Services", path: "/services" },
              { icon: <FiLogIn />, text: "Login", path: "/login" },
            ].map((link, index) => (
              <Link key={index} to={link.path} className="flex items-center space-x-2 text-gray-300 hover:text-white transition">
                {link.icon}<span>{link.text}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-3">
            {[
              { icon: <FiMail />, text: "sewasetu@gmail.com" },
              { icon: <FiPhone />, text: "+91 1800 130 200" },
              { icon: <FiYoutube />, text: "www.SewaSetu.youtube.com" },
            ].map((info, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-300 hover:text-white transition">
                {info.icon}<span>{info.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col space-y-3">
            <input type="email" placeholder="Enter your email" className="p-2 rounded-lg text-gray-900 focus:outline-none" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-600 pt-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-white transition"><FiLinkedin size={20} /></a>
          <a href="#" className="hover:text-white transition"><FiFacebook size={20} /></a>
          <a href="#" className="hover:text-white transition"><FiTwitter size={20} /></a>
        </div>
        <p>© {new Date().getFullYear()} SewaSetu. All rights reserved.</p>
        <p className="mt-2"><Link to="/privacy" className="hover:underline">Privacy Policy</Link> | <Link to="/terms" className="hover:underline">Terms of Service</Link></p>
      </div>
    </footer>
  );
}

export default Footer;