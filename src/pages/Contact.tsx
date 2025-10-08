import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

// Use the environment variable for your script URL for security
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoD1wzkI7pmnps0_kXvFCRoL4MKfK-Bx5z7eahO9dHLw5-qMwQrvbRv9aNOnFvGGk3/exec';

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // --- THIS IS THE FINAL, CORRECTED ONSUBMIT FUNCTION ---
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 1. Create a FormData object. This mimics a standard HTML form.
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    // Note: We do NOT append a 'formType', so our script correctly handles it as a contact message.

    try {
      // 2. Send the FormData object.
      // We remove 'mode: no-cors' and the 'headers' object for a more reliable request.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-5">
          
          {/* Contact Info Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 col-span-2">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 flex-shrink-0" />
                <span className="break-all">kumararpit17773@gmail.com</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-4 flex-shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 col-span-3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send me a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="relative">
                <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              
              <div className="relative">
                <MessageSquare className="absolute top-4 left-3 text-gray-400" size={20} />
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows={5}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {submitStatus === 'success' && (
              <div className="mt-4 flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>Failed to send. Please try emailing me directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;