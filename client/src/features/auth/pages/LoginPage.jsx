import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import AuthCard from '../../../components/ui/AuthCard';
import Button from '../../../components/ui/Button';
import { TextField } from '../../../components/ui/FormField';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { compactErrors, validateEmail } from '../validation';

const LoginPage = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: location.state?.email ?? '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = compactErrors({
      email: validateEmail(form.email),
      password: form.password ? '' : 'Password is required',
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitError('');
    try {
      await login({ email: form.email.trim(), password: form.password });
    } catch (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        navigate(ROUTES.VERIFY_EMAIL, { state: { email: form.email.trim(), resend: true } });
        return;
      }
      setSubmitError(error.message);
    }
  };

  return (
    <AuthCard
      title="Sign in to your account"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {location.state?.message && <Alert tone="success">{location.state.message}</Alert>}
      <Alert>{submitError}</Alert>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          error={errors.password}
          onChange={handleChange}
        />
        <div className="text-right text-sm">
          <Link to={ROUTES.FORGOT_PASSWORD} className="font-medium text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" fullWidth isLoading={isLoggingIn}>
          {isLoggingIn ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
