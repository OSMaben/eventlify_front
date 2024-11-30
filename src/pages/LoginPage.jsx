import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../lib/validation';
import { loginUser, selectIsLoading, selectError } from '../lib/store/slices/authSlice';
import { FormInput } from '../components/register/ui/FormInput';
import { Modal } from '../components/register/ui/Modal';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading); // Selector for loading state
  const error = useSelector(selectError); // Selector for error state
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      // Login successful
      setShowModal(true);
    } else if (loginUser.rejected.match(result)) {
      // Handle errors from Redux
      if (result.payload === 'Invalid credentials') {
        setError('password', {
          type: 'server',
          message: 'Invalid email or password',
        });
      } else {
        console.error('Login failed:', result.payload);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="email"
            label="Email"
            type="email"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            icon={<Lock className="h-5 w-5" />}
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <Modal
          isOpen={showModal}
          onClose={handleModalClose}
          title="Login Successful!"
          message="Welcome back! You have successfully signed in to your account."
        />
      </div>
    </div>
  );
}
