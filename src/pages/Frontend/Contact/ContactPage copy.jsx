import { Button, Card } from "@material-tailwind/react";
import MasterLayout from "../../../components/Frontend/MasterLayout/MasterLayout";
import { useState } from "react";
import { CardContent } from "@mui/material";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const contacts = [
    {
      name: "MOHAMMAD ARIFUR RAHMAN",
      position: "Project Director",
      office: "Exportable Mango Production Project",
      email: "tamrahman46@gmail.com",
      phone: "01819457574",
    },
    {
      name: "MD. SHAHIDULLAH",
      position: "Assistant Project Manager (Technology & Extension)",
      office: "Exportable Mango Production Project",
      email: "shahidullah29_dae@yahoo.com",
      phone: "01717440551",
    },
    {
      name: "NISHAT TABASSUM",
      position: "Assistant Project Director",
      office: "Exportable Mango Production Project",
      email: "tabassumkuhu@gmail.com",
      phone: "01756-357119",
    },
  ];

  return (
    <MasterLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-yellow-50 to-orange-100 min-h-screen">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-8 uppercase border-b-4 border-orange-500 inline-block">
          Contact Us
        </h2>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {contacts.map((contact, index) => (
            <Card
              key={index}
              className="bg-gradient-to-r from-yellow-200 to-orange-300 shadow-lg rounded-xl p-5 border border-orange-400"
            >
              <CardContent>
                <h3 className="text-lg font-bold text-gray-900">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-700">{contact.position}</p>
                <p className="text-sm text-gray-600">{contact.office}</p>
                <p className="text-sm text-gray-800 font-medium">
                  Email: {contact.email}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  Mobile: {contact.phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form & Map Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Map */}
          <div className="w-full">
            <iframe
              title="Google Map"
              className="w-full h-96 rounded-xl shadow-lg border-2 border-orange-500"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1825.834810649616!2d90.384428!3d23.759158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a62a26d147%3A0x63476d02b2c2c576!2sDepartment%20of%20Agricultural%20Extension!5e0!3m2!1sen!2sbd!4v1740850901633!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-orange-400">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}
