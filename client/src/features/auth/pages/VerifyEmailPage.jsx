import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import AuthCard from '../../../components/ui/AuthCard';
import Button from '../../../components/ui/Button';
import { TextField } from '../../../components/ui/FormField';
import { ROUTES } from '../../../constants/routes';
import { authApi } from '../api/authApi';
import OtpField from '../components/OtpField';
import { compactErrors, validateEmail, validateOtp } from '../validation';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email ?? '');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(
    location.state?.message ??
      (location.state?.resend ? 'Your email is not verified yet. Request a code below.' : ''),
  );

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: (response) =>
      navigate(ROUTES.LOGIN, { replace: true, state: { email, message: response.message } }),
  });

  const resendMutation = useMutation({
    mutationFn: authApi.resendVerification,
    onSuccess: (response) => setNotice(response.message),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = compactErrors({ email: validateEmail(email), otp: validateOtp(otp) });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    verifyMutation.mutate({ email: email.trim(), otp });
  };

  const handleResend = () => {
    const emailError = validateEmail(email);
    setErrors(compactErrors({ email: emailError }));
    if (!emailError) resendMutation.mutate({ email: email.trim() });
  };

  return (
    <AuthCard
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox"
      footer={
        <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <Alert tone="info">{notice}</Alert>
      <Alert>{verifyMutation.error?.message ?? resendMutation.error?.message}</Alert>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <OtpField value={otp} onChange={setOtp} error={errors.otp} />
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={handleResend} isLoading={resendMutation.isPending}>
            Resend code
          </Button>
          <Button type="submit" isLoading={verifyMutation.isPending}>
            Verify email
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default VerifyEmailPage;
