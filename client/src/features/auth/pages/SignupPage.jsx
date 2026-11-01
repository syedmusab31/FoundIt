import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import AuthCard from '../../../components/ui/AuthCard';
import Button from '../../../components/ui/Button';
import { TextField } from '../../../components/ui/FormField';
import { ROUTES } from '../../../constants/routes';
import { authApi } from '../api/authApi';
import { compactErrors, validateEmail, validatePassword, validatePhone } from '../validation';

const INITIAL_FORM = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

const validate = (form) =>
  compactErrors({
    name: form.name.trim().length >= 2 ? '' : 'Name must be at least 2 characters',
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    password: validatePassword(form.password),
    confirmPassword: form.password === form.confirmPassword ? '' : 'Passwords do not match',
  });

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response, variables) =>
      navigate(ROUTES.VERIFY_EMAIL, {
        state: { email: variables.email, message: response.message },
      }),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    registerMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Fill in your details to get started"
      footer={
        <>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Alert>{registerMutation.error?.message}</Alert>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <TextField label="Full name" name="name" autoComplete="name" value={form.name} error={errors.name} onChange={handleChange} />
        <TextField label="Email address" name="email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={handleChange} />
        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="03001234567"
          value={form.phone}
          error={errors.phone}
          onChange={handleChange}
        />
        <TextField label="Password" name="password" type="password" autoComplete="new-password" value={form.password} error={errors.password} onChange={handleChange} />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth isLoading={registerMutation.isPending}>
          {registerMutation.isPending ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignupPage;
