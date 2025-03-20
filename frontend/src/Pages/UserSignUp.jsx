import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock } from 'react-icons/fi';
import BackButton from '../components/BackButton';

export default function UserSignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        userType: 'user',
        contact: '',
        zipcode: '',
        state: '',
        city: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const passwordStrengthLabels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong'];
    const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "West Bengal"];
    const cities = {
        "Maharashtra": ["Sambhajinagar", "Solapur", "Beed", "Jalna", "Dharashiv"],
        "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"]
    };

    useEffect(() => {
        // Password strength calculator
        const strength = Math.min(
            Math.floor(formData.password.length / 3) + 
            (/[A-Z]/.test(formData.password) ? 1 : 0) +
            (/[0-9]/.test(formData.password) ? 1 : 0) +
            (/[^A-Za-z0-9]/.test(formData.password) ? 1 : 0),
            4
        );
        setPasswordStrength(strength);
    }, [formData.password]);

    useEffect(() => {
        const newErrors = {};
        if (formData.password && confirmPassword && formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
    }, [formData.password, confirmPassword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) newErrors.email = 'Invalid email address';
        if (!formData.contact.match(/^\d{10}$/)) newErrors.contact = 'Invalid phone number';
        if (!formData.zipcode.match(/^\d{6}$/)) newErrors.zipcode = 'Invalid zipcode';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (formData.password !== confirmPassword) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/register', formData);
            if (response.status === 201) {
                toast.success('🎉 Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Header Section */}
                    <div className="px-6 pt-8 pb-6 bg-gradient-to-r from-[#223265] to-[#2a3d7c]">
                        <div className="text-center space-y-2">
                            <div className="mb-4">
                                <span className="bg-[#FF3D00] px-3 py-1 rounded-l-md text-white text-xl font-bold">Trade</span>
                                <span className="bg-white px-3 py-1 rounded-r-md text-[#223265] text-xl font-bold">Connect</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Join Our Community</h2>
                            <p className="text-gray-200 text-sm">Start your journey with us today</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Personal Information</h3>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                                
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Contact Details</h3>
                                <div className="flex gap-4 flex-col md:flex-row">
                                    <div className="flex-1 relative">
                                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                +91
                                            </span>
                                            <input
                                                type="tel"
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                                className="flex-1 pl-10 pr-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                                pattern="\d{10}"
                                            />
                                        </div>
                                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                    </div>
                                    
                                    <div className="relative">
                                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="zipcode"
                                            value={formData.zipcode}
                                            onChange={handleInputChange}
                                            placeholder="Zipcode"
                                            className="w-32 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                        />
                                        {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Location</h3>
                                <div className="flex gap-4 flex-col md:flex-row">
                                    <div className="flex-1 relative">
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent bg-white"
                                        >
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>
                                    
                                    <div className="flex-1 relative">
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent bg-white"
                                            disabled={!formData.state}
                                        >
                                            <option value="">Select City</option>
                                            {cities[formData.state]?.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Security</h3>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                    />
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    passwordStrength < 2 ? 'bg-red-500' :
                                                    passwordStrength < 3 ? 'bg-orange-500' :
                                                    passwordStrength < 4 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`} 
                                                style={{ width: `${(passwordStrength + 1) * 25}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-600">
                                            {passwordStrengthLabels[passwordStrength]}
                                        </span>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF3D00] focus:border-transparent"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            {/* Terms and Submit */}
                            <div className="space-y-6">
                                <p className="text-xs text-gray-600 text-center">
                                    By signing up, you agree to our{' '}
                                    <a href="#" className="text-[#223265] font-semibold hover:underline hover:text-[#FF3D00]">Terms</a> and{' '}
                                    <a href="#" className="text-[#223265] font-semibold hover:underline hover:text-[#FF3D00]">Privacy Policy</a>
                                </p>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-[#FF3D00] to-[#FF5F33] text-white rounded-lg font-semibold
                                    hover:from-[#E63600] hover:to-[#FF4719] transition-all duration-300 relative overflow-hidden"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            Creating Account...
                                        </span>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}