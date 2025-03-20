import React from 'react';

export default function WorkingOnHome() {
    return (
        <div className="bg-stdBg w-[80vw] mx-auto flex flex-col items-center py-10">
            <h1 className="text-center text-headTag font-bold text-stdBlue text-3xl mb-6">
                How it works
            </h1>
            <div className="flex flex-wrap justify-center gap-8">
                {/* Step 1 */}
                <div className="h-auto w-[300px] flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-xl">
                    <i className="fa-regular fa-comment-dots text-homeTag text-4xl mb-3"></i>
                    <h2 className="text-ternaryFont font-bold text-stdBlue text-xl mb-2">
                        1. Tell us what your home needs
                    </h2>
                    <p className="text-gray-700">
                        From routine maintenance and repairs to dream home renovations, we can help with any project — big or small.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="h-auto w-[300px] flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-xl">
                    <i className="fa-solid fa-bolt text-homeTag text-4xl mb-3"></i>
                    <h2 className="text-ternaryFont font-bold text-stdBlue text-xl mb-2">
                        2. We’ll match you with personalized solutions
                    </h2>
                    <p className="text-gray-700">
                        See your price and book services in an instant. Or, request and compare quotes from highly rated pros near you.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="h-auto w-[300px] flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-xl">
                    <i className="fa-solid fa-house text-homeTag text-4xl mb-3"></i>
                    <h2 className="text-ternaryFont font-bold text-stdBlue text-xl mb-2">
                        3. Start to finish, we’ve got you covered
                    </h2>
                    <p className="text-gray-700">
                        When you book and pay with Angi, you’re covered by our Happiness Guarantee. We’ll cover your projects up to full purchase price, plus limited damage protection.
                    </p>
                </div>
            </div>
        </div>
    );
}
