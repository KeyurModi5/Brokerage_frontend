import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as yup from 'yup';
import { apiHandler } from '../../api/apiHandler';
import { EyeCloseIcon, EyeIcon } from '../../icons';
import { showToast } from '../../utils/helper';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const handleRegister = async (values: FormValues) => {
    try {
      const { data, status } = await apiHandler.authHandler.register(values);
      if (status === 200 || status === 201) {
        showToast('success', data?.message || 'Account created successfully!');
        navigate('/sign-in');
      }
    } catch (error: any) {
      showToast('error', error?.message || 'Registration failed. Please try again.');
      console.error('Register error:', error);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create your account to get started!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <Label>
                  Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    {...register('password')}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  disabled={isSubmitting}
                  name={isSubmitting ? 'Creating account...' : 'Sign Up'}
                />
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{' '}
              <Link
                to="/sign-in"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
