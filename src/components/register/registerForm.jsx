import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../register/ui/FormInput';
import { Modal } from '../register/ui/Modal';
import { registerSchema } from '../../lib/validation';
import { registerUser, selectError, selectIsLoading } from '../../lib/store/slices/authSlice';

export function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(resultAction)) {
        setShowModal(true);
      }
    } catch (err) {
      if (err.status === 422) {
        Object.entries(err.data.errors).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          id="username"
          label="Username"
          type="text"
          icon={<User className="h-5 w-5" />}
          error={errors.username?.message}
          {...register('username')}
        />

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

        <FormInput
          id="phone"
          label="Phone Number"
          type="tel"
          icon={<Phone className="h-5 w-5" />}
          placeholder="+1234567890"
          error={errors.phone?.message}
          {...register('phone')}
        />

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Registration Successful!"
        message="Your account has been created successfully. You can now sign in with your credentials."
      />
    </>
  );
}