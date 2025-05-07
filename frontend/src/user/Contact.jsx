import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-12 text-black text-center">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Get In Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Location</h3>
                <p className="text-gray-600">
                  123 Book Street, Rambazar, Pokhara, Nepal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone Number</h3>
                <p className="text-gray-600">+977 1234567890</p>
                <p className="text-gray-600">+977 9876543210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Address</h3>
                <p className="text-gray-600">info@booky.com</p>
                <p className="text-gray-600">support@booky.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
