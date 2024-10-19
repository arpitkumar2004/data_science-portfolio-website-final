import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { FileText } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  reason: string;
};

const RequestCV: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your EmailJS service ID, template ID, and user ID
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_USER_ID');
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send CV request. Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Request CV</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Request My CV</h2>
          <p className="text-gray-600 mb-6">
            Interested in learning more about my qualifications? Fill out the form below to request my CV. I'll send it to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company or College</label>
              <input
                type="text"
                id="company"
                {...register('company', { required: 'Company or College is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Request</label>
              <textarea
                id="reason"
                rows={4}
                {...register('reason', { required: 'Reason is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Please briefly explain why you're interested in my CV"
              ></textarea>
              {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary flex items-center justify-center"
            >
              <FileText className="mr-2" size={20} />
              {isSubmitting ? 'Sending Request...' : 'Request CV'}
            </button>
          </form>
          {submitSuccess && (
            <p className="mt-4 text-green-600">Thank you for your request. Please check your email, I'll send my CV to you shortly!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCV;