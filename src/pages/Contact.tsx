import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your EmailJS service ID, template ID, and user ID
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        data,
        'YOUR_USER_ID'
      );
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try sending mail on mentioned Gmail manually. Average time to response is 1-2 hours. Have a Nice Day !!');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gradient text-center">Contact Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-sm text-gray-800 mb-2">
          I am always enthusiastic about exploring new opportunities and collaborating on impactful projects, particularly in the fields of Data Science, Machine learning, and Artificial intelligence. With my background in developing predictive models, advanced analytics, and integrated systems, I am eager to connect with like-minded professionals and organizations. Please feel free to reach out if you have any questions, potential projects, or opportunities that align with my expertise. 
          I look forward to hearing from you! Average time of response is 1-2 hours.
          </p>
          <p className="text-sm text-gray-800 mb-6">
          Have a Nice day !!
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-blue-600 mr-2" size={20} />
              <span className="text-sm">kumararpit17773@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-blue-600 mr-2" size={20} />
              <span className="text-sm">+91 9506035861</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-blue-600 mr-2" size={20} />
              <span className="text-sm">Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-900 mb-2 ml-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-900 mb-2 ml-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-base font-medium text-gray-900 mb-2 ml-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Message is required' })}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {submitSuccess && (
            <p className="mt-4 text-green-600">
              Thank you for your message. I'll get back to you soon! Have a Nice Day !!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;