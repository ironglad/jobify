
import React from 'react';

export default function About() {
    return (
        <div className="py-16">
            <div className="container mx-auto px-6 text-gray-700 md:px-12 xl:px-6">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="md:w-6/12">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Who We Are</h2>
                        <p className="mt-4 text-lg leading-relaxed">
                            Welcome to <span className="text-indigo-600 font-semibold">Job Hunt</span>, your go-to platform for finding your dream job or hiring top talent. 
                            We bridge the gap between job seekers and recruiters, making the hiring process seamless, efficient, and hassle-free.
                        </p>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Our Mission</h2>
                        <p className="mt-4 text-lg leading-relaxed">
                            At <span className="text-indigo-600 font-semibold">Job Hunt</span>, our mission is to <span className="font-semibold">empower careers</span> and <span className="font-semibold">streamline recruitment</span>. 
                            Whether you're a recent graduate looking for your first job, a seasoned professional aiming for career growth, or a recruiter searching for the perfect candidate, we’ve got you covered.
                        </p>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Why Choose Job Hunt?</h2>
                        <ul className="mt-4 space-y-3 text-lg">
                            <li>✅ <span className="font-semibold">User-Friendly Experience</span> – Simple and intuitive platform for job searching and hiring.</li>
                            <li>✅ <span className="font-semibold">Verified Employers & Job Listings</span> – Ensuring quality job opportunities.</li>
                            <li>✅ <span className="font-semibold">Career Resources</span> – Resume tips, interview guides, and career advice.</li>
                            <li>✅ <span className="font-semibold">24/7 Support</span> – Dedicated support to assist you whenever needed.</li>
                        </ul>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Join Us Today!</h2>
                        <p className="mt-4 text-lg leading-relaxed">
                            Ready to take the next step in your career? Looking to hire top talent? 
                            <span className="text-indigo-600 font-semibold"> Sign up today</span> and let <span className="font-semibold">Job Hunt</span> help you achieve your goals!
                        </p>
                    </div>
                    <div className="md:w-5/12">
                        <img src="https://media.istockphoto.com/id/475352876/photo/man-applying-for-a-job-on-the-internet.jpg?s=612x612&w=0&k=20&c=SQeciz8vqdGWu_KJoGC7yK8xmpBl69UewPtZSyWSrOI=" alt="Job Hunt" className="w-full rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
