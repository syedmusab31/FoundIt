import { useId } from 'react';

const CONTROL_CLASSES =
  'block w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary';

const controlClassName = (error) =>
  `${CONTROL_CLASSES} ${error ? 'border-red-400' : 'border-gray-300'}`;

const FieldWrapper = ({ id, label, error, hint, children }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    {children}
    {error ? (
      <p id={`${id}-error`} className="text-sm text-red-600">
        {error}
      </p>
    ) : (
      hint && <p className="text-xs text-gray-500">{hint}</p>
    )}
  </div>
);

export const TextField = ({ label, error, hint, id, ...props }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldWrapper id={fieldId} label={label} error={error} hint={hint}>
      <input
        id={fieldId}
        className={controlClassName(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
};

export const TextAreaField = ({ label, error, hint, id, ...props }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldWrapper id={fieldId} label={label} error={error} hint={hint}>
      <textarea
        id={fieldId}
        className={controlClassName(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
};

export const SelectField = ({ label, error, hint, id, options, placeholder, ...props }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldWrapper id={fieldId} label={label} error={error} hint={hint}>
      <select
        id={fieldId}
        className={`${controlClassName(error)} bg-white`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
