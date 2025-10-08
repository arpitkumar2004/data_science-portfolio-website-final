import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Download, Send, User, Mail, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  reason: string;
};

// Use the same .env variable from your contact form
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoD1wzkI7pmnps0_kXvFCRoL4MKfK-Bx5z7eahO9dHLw5-qMwQrvbRv9aNOnFvGGk3/exec';

const RequestCV: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Path to your resume in the 'public' folder
  const resumeUrl = '/Arpit_Kumar_Resume.pdf';

  // --- THIS IS THE UPDATED FUNCTION ---
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create a FormData object
    const formData = new FormData();
    formData.append('formType', 'cvRequest'); // Our crucial identifier
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('reason', data.reason);

    try {
      // Send the FormData object. No 'mode' or 'headers' needed.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting CV request:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Get My Resume</h1>
        <p className="text-lg text-gray-600 mb-10">
          The quickest way to get my resume is to download it directly.
        </p>

        {/* --- Direct Download Button --- */}
        <a
          href={resumeUrl}
          download="Arpit_Kumar_Resume.pdf"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 mb-12 shadow-lg"
        >
          <Download className="w-5 h-5 mr-3" />
          Download Now
        </a>

        {/* --- Email Form Section --- */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Or, have it sent to your email</h2>
          <p className="text-gray-500 mb-6">If you'd prefer, fill out the form below, and I'll be notified of your interest.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            {errors.name && <p className="text-sm text-red-600 -mt-3">{errors.name.message}</p>}
            {errors.email && <p className="text-sm text-red-600 -mt-3">{errors.email.message}</p>}

            {/* Company Input */}
            <div className="relative">
              <Building className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Company or College"
                {...register('company', { required: 'Company is required' })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {errors.company && <p className="text-sm text-red-600 -mt-3">{errors.company.message}</p>}

            {/* Reason Textarea */}
            <div className="relative">
              <MessageSquare className="absolute top-4 left-3 text-gray-400" size={20} />
              <textarea
                placeholder="Reason for your interest (e.g., job opportunity, collaboration)"
                rows={4}
                {...register('reason', { required: 'A brief reason is required' })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              ></textarea>
            </div>
            {errors.reason && <p className="text-sm text-red-600 -mt-3">{errors.reason.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {isSubmitting ? 'Submitting...' : 'Request via Email'}
            </button>
          </form>

          {/* Submission Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p>Thank you! Your interest has been logged.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>Submission failed. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCV;