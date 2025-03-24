import { FaUserTie, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceTypeCard = () => {
  const cards = [
    {
      title: "Join as a Client",
      icon: <FaUser className="text-4xl md:text-5xl text-stdBlue" />, 
      description: "Find top-rated professionals to complete your tasks efficiently.",
      benefits: [
        "Access verified service providers",
        "Post job requests easily",
        "Track progress in real-time",
        "Secure and hassle-free payments"
      ],
      gradient: "from-stdBlue/10 via-stdBlue/5 to-transparent",
      link: "/signlog",
      buttonColor: "bg-stdBlue hover:bg-blue-800"
    },
    {
      title: "Join as a Gig Expert",
      icon: <FaUserTie className="text-4xl md:text-5xl text-color1" />, 
      description: "Grow your freelancing career with our trusted platform.",
      benefits: [
        "Get access to a wide range of clients",
        "Flexible work opportunities",
        "Build a strong professional profile",
        "Earn securely with guaranteed payments"
      ],
      gradient: "from-color1/10 via-color1/5 to-transparent",
      link: "/signup-w",
      buttonColor: "bg-color1 hover:bg-orange-600"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-white 
              shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out
              border border-gray-100 hover:-translate-y-1 animate-fadeIn
              ${index === 0 ? 'delay-[200ms]' : 'delay-[400ms]'}`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

            {/* Content */}
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white shadow-lg 
                  transform transition-transform duration-300 hover:scale-110">
                  {card.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 
                  transition-colors duration-300 hover:text-stdBlue">
                  {card.title}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                {card.description}
              </p>

              <ul className="space-y-3 mb-8">
                {card.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700 
                      transform transition-all duration-300 hover:translate-x-2"
                    style={{
                      animationDelay: `${(index * 200) + (idx * 100)}ms`,
                      opacity: 0,
                      animation: 'fadeSlideIn 0.5s ease-out forwards'
                    }}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500 
                      transition-transform duration-300 hover:scale-125" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link to={card.link} className="block">
                <button
                  className={`w-full ${card.buttonColor} text-white py-3 px-6 
                    rounded-xl font-semibold flex items-center justify-center gap-2
                    shadow-lg transition-all duration-300 hover:scale-[1.02] 
                    active:scale-[0.98] hover:shadow-xl
                    transform hover:-translate-y-0.5`}
                >
                  Get Started
                  <FaArrowRight className="text-sm transition-transform 
                    duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 
              bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl
              transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeCard;
