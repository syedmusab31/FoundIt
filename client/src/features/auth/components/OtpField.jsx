import { TextField } from '../../../components/ui/FormField';

const OtpField = ({ value, onChange, error, label = 'Verification code' }) => (
  <TextField
    label={label}
    name="otp"
    inputMode="numeric"
    autoComplete="one-time-code"
    maxLength={6}
    placeholder="6-digit code"
    required
    value={value}
    error={error}
    onChange={(event) => onChange(event.target.value.replace(/\D/g, ''))}
  />
);

export default OtpField;
