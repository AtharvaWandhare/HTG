import React from 'react';

export default function ReviewsHome({ name, review, rating, image, category }) {
  return (
    <div className="relative group w-72 h-96 perspective">
      {/* Front Side (User Image & Name) */}
      <div className="absolute inset-0 bg-white rounded-xl shadow-lg transition-transform duration-700 transform group-hover:rotate-y-180">
        <img src={image} alt={name} className="w-full h-3/4 object-cover rounded-t-xl" />
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
      </div>

      {/* Back Side (Review & Rating) */}
      <div className="absolute inset-0 bg-gray-200 text-gray-800 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center opacity-0 transform rotate-y-180 group-hover:opacity-100 group-hover:rotate-y-0 transition-transform duration-700">
        <span className="text-orange-500 text-2xl">{'★'.repeat(rating)}</span>
        <p className="text-sm mt-2 text-center">{review}</p>
        <p className="text-blue-600 font-semibold mt-4">{category}</p>
      </div>
    </div>
  );
}

// Sample Usage
const sampleReviews = [
  {
    name: "Sophia Carter",
    review: "Absolutely fantastic service! Highly recommended.",
    rating: 5,
    category: "Web Development",
    image: "https://source.unsplash.com/random/300x400/?woman,portrait"
  },
  {
    name: "James Anderson",
    review: "Great work, timely delivery, and excellent communication.",
    rating: 4,
    category: "Graphic Design",
    image: "https://source.unsplash.com/random/300x400/?man,portrait"
  },
  {
    name: "Olivia Martinez",
    review: "Professional and easy to work with. Amazing experience!",
    rating: 5,
    category: "Digital Marketing",
    image: "https://source.unsplash.com/random/300x400/?girl,portrait"
  },
  {
    name: "Daniel Smith",
    review: "Exceptional service, will definitely hire again!",
    rating: 5,
    category: "AI & ML Services",
    image: "https://source.unsplash.com/random/300x400/?boy,portrait"
  }
];

export function ReviewsList() {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {sampleReviews.map((review, index) => (
        <ReviewsHome key={index} {...review} />
      ))}
    </div>
  );
}
