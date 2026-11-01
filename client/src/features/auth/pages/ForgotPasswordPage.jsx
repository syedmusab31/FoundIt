import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import AuthCard from '../../../components/ui/AuthCard';
import Button from '../../../components/ui/Button';
import { TextField } from '../../../components/ui/FormField';
import { ROUTES } from '../../../constants/routes';
import { authApi } from '../api/authApi';
import OtpField from '../components/OtpField';
import { compactErrors, validateEmail, validateOtp, validatePassword } from '../validation';

const STEP = Object.freeze({ REQUEST: 'request', VERIFY: 'verify', RESET: 'reset' });

const STEP_COPY = {
  [STEP.REQUEST]: { title: 'Reset your password', subtitle: 'Enter your email to receive a reset code' },
  [STEP.VERIFY]: { title: 'Enter verification code', subtitle: 'Check your inbox for a 6-digit code' },
  [STEP.RESET]: { title: 'Create a new password', subtitle: 'Choose a password you have not used before' },
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEP.REQUEST);
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const requestMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => setStep(STEP.VERIFY),
  });
  const verifyMutation = useMutation({
    mutationFn: authApi.verifyPasswordResetOtp,
    onSuccess: () => setStep(STEP.RESET),
  });
  const resetMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (response) =>
      navigate(ROUTES.LOGIN, { replace: true, state: { email: form.email, message: response.message } }),
  });

  const activeMutation = { [STEP.REQUEST]: requestMutation, [STEP.VERIFY]: verifyMutation, [STEP.RESET]: resetMutation }[step];

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const runStep = (validationErrors, action) => {
    setErrors(validationErrors);
    if (!Object.keys(validationErrors).length) action();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = form.email.trim();

    if (step === STEP.REQUEST) {
      runStep(compactErrors({ email: validateEmail(form.email) }), () => requestMutation.mutate({ email }));
    } else if (step === STEP.VERIFY) {
      runStep(compactErrors({ otp: validateOtp(form.otp) }), () => verifyMutation.mutate({ email, otp: form.otp }));
    } else {
      runStep(
        compactErrors({
          newPassword: validatePassword(form.newPassword),
          confirmPassword: form.newPassword === form.confirmPassword ? '' : 'Passwords do not match',
        }),
        () => resetMutation.mutate({ email, otp: form.otp, newPassword: form.newPassword }),
      );
    }
  };

  return (
    <AuthCard
      {...STEP_COPY[step]}
      footer={
        <>
          Remember your password?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Alert>{activeMutation.error?.message}</Alert>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {step === STEP.REQUEST && (
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            error={errors.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        )}

        {step === STEP.VERIFY && (
          <OtpField value={form.otp} error={errors.otp} onChange={(value) => updateField('otp', value)} />
        )}

        {step === STEP.RESET && (
          <>
            <TextField
              label="New password"
              type="password"
              autoComplete="new-password"
              value={form.newPassword}
              error={errors.newPassword}
              onChange={(event) => updateField('newPassword', event.target.value)}
            />
            <TextField
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
            />
          </>
        )}

        <div className="flex items-center justify-between gap-4">
          {step === STEP.VERIFY && (
            <Button variant="ghost" onClick={() => setStep(STEP.REQUEST)}>
              Back
            </Button>
          )}
          <Button type="submit" fullWidth={step !== STEP.VERIFY} isLoading={activeMutation.isPending}>
            {step === STEP.REQUEST ? 'Send reset code' : step === STEP.VERIFY ? 'Verify code' : 'Reset password'}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
