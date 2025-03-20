import { FiMessageCircle, FiZap, FiHome, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import axios from "axios";

export default function RatingProjectPage() {
  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/sendMail',
        {
          email: e.target[0].value,
          zipCode: e.target[1].value,
          name: e.target[2].value
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      alert('Thank you! Information sent successfully.');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  }

  const steps = [
    {
      icon: <FiMessageCircle size={32} />, title: "1. Tell us what your home needs",
      description: "From routine maintenance and repairs to dream home renovations, we can help with any project big or small.",
      bgColor: "bg-color1/20", iconColor: "text-color1"
    },
    {
      icon: <FiZap size={32} />, title: "2. We'll match you with personalized solutions",
      description: "See your price and book services in an instant. Or, request and compare quotes from highly rated pros near you.",
      bgColor: "bg-stdBlue/20", iconColor: "text-stdBlue"
    },
    {
      icon: <FiHome size={32} />, title: "3. Start to finish, we've got you covered",
      description: "When you book and pay with SewaSetu, you're covered by our Happiness Guarantee.",
      bgColor: "bg-color1/20", iconColor: "text-color1"
    }
  ];

  return (
    <div className="w-[80vw] mx-auto py-8 md:py-16 px-4 md:px-8">
      <div className='flex flex-col text-center'>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-12 mb-10">
          <div className='text-center md:text-left md:flex-1'>
            <h1 className="text-2xl md:text-4xl font-bold text-stdBlue leading-tight">
              Get free project <span className="text-color1 block md:inline"> cost information </span> delivered to your inbox
            </h1>
          </div>
          <div className="w-full md:w-auto md:flex-1">
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl md:text-2xl text-stdBlue font-bold mb-6 inline-flex items-center gap-2">
                <FiMail className="text-color1" /> Receive mail
              </h2>
              <form onSubmit={sendMail} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input className="w-full h-12 rounded-lg pl-10 pr-4 border border-gray-300 outline-none" type="email" placeholder="Email Address" required />
                  <input className="w-full sm:w-32 h-12 rounded-lg pl-10 pr-4 border border-gray-300 outline-none" type="text" placeholder="Zip Code" required />
                  <input className="w-full sm:w-32 h-12 rounded-lg pl-10 pr-4 border border-gray-300 outline-none" type="text" placeholder="Name" required />
                </div>
                <button type="submit" className="bg-stdBlue text-white px-8 py-3 rounded-full font-bold hover:bg-color1 transition-all duration-300">
                  <FiMail /> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-stdBlue text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className={`absolute inset-0 ${step.bgColor} rounded-full animate-pulse`}></div>
                  <div className={`relative z-10 flex items-center justify-center ${step.iconColor}`}>{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-stdBlue group-hover:text-color1">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-800">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
