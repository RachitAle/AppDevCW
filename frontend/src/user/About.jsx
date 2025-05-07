import { Users, BookOpen, Award, Clock } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        About Booky
      </h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg mb-6">
          Welcome to Booky, your premier destination for books of all genres.
          Established in 2010, we've been serving book lovers with a carefully
          curated collection of titles from around the world.
        </p>
        <p className="text-lg mb-6">
          Our mission is to promote literacy and a love for reading by making
          quality books accessible to everyone. We believe that books have the
          power to educate, inspire, and transform lives.
        </p>
        <p className="text-lg">
          At Booky, we're not just selling books; we're sharing knowledge,
          stories, and experiences that can enrich your life and broaden your
          horizons.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <BookOpen size={40} className="text-green-600" />
          </div>
          <div className="text-4xl font-bold mb-2">10,000+</div>
          <div className="text-gray-600">Books Available</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Users size={40} className="text-green-600" />
          </div>
          <div className="text-4xl font-bold mb-2">50,000+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Award size={40} className="text-green-600" />
          </div>
          <div className="text-4xl font-bold mb-2">15+</div>
          <div className="text-gray-600">Industry Awards</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Clock size={40} className="text-green-600" />
          </div>
          <div className="text-4xl font-bold mb-2">13</div>
          <div className="text-gray-600">Years of Service</div>
        </div>
      </div>

      {/* Team */}
      <h2 className="text-2xl font-bold mb-8 text-black text-center">
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-32 h-32 bg-green-200 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-lg">John Doe</h3>
          <p className="text-gray-600">Founder & CEO</p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-green-200 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-lg">Jane Smith</h3>
          <p className="text-gray-600">Chief Curator</p>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-green-200 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-lg">Robert Johnson</h3>
          <p className="text-gray-600">Operations Manager</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;