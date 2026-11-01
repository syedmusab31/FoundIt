import { ImagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';
import { SelectField, TextAreaField, TextField } from '../../../components/ui/FormField';
import { IMAGE_MAX_BYTES, ITEM_CATEGORIES, PROVINCES } from '../../../constants/items';

const CATEGORY_NAMES = ITEM_CATEGORIES.map((category) => category.name);
const INITIAL_VALUES = { title: '', description: '', category: '', province: '', phone: '' };

const validate = (values, image) => {
  const errors = {};
  if (values.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
  if (values.description.trim().length < 10) errors.description = 'Description must be at least 10 characters';
  if (!values.category) errors.category = 'Select a category';
  if (!values.province) errors.province = 'Select a province';
  if (!/^\+?\d{10,15}$/.test(values.phone.trim())) errors.phone = 'Phone number must be 10–15 digits';
  if (!image) errors.image = 'Upload a photo of the item';
  return errors;
};

const ItemForm = ({ submitLabel, onSubmit, isSubmitting, submitError, defaultPhone = '' }) => {
  const [values, setValues] = useState({ ...INITIAL_VALUES, phone: defaultPhone });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!image) return undefined;
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((current) => ({ ...current, image: 'Only image files are allowed' }));
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      setErrors((current) => ({ ...current, image: 'Image must be 5 MB or smaller' }));
      return;
    }
    setImage(file);
    setErrors((current) => ({ ...current, image: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values, image);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) formData.append(key, value.trim());
    formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-2xl bg-white p-6 shadow sm:p-8">
      <Alert>{submitError}</Alert>

      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700">Item photo</span>
        <div className="flex items-center gap-4">
          <div className="h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            {previewUrl ? (
              <img src={previewUrl} alt="Selected item preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <ImagePlus size={36} aria-hidden="true" />
              </div>
            )}
          </div>
          <div>
            <label className="inline-flex cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary">
              {image ? 'Change photo' : 'Upload photo'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={handleImageChange} />
            </label>
            <p className="mt-1 text-xs text-gray-500">JPEG, PNG, WEBP or GIF up to 5 MB</p>
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>
        </div>
      </div>

      <TextField
        label="Title"
        name="title"
        placeholder="e.g. Black wallet, iPhone 12"
        maxLength={120}
        value={values.title}
        error={errors.title}
        onChange={handleChange}
      />
      <TextAreaField
        label="Description"
        name="description"
        rows={4}
        maxLength={2000}
        placeholder="Identifying marks, contents, where and when…"
        value={values.description}
        error={errors.description}
        onChange={handleChange}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Category"
          name="category"
          placeholder="Select a category"
          options={CATEGORY_NAMES}
          value={values.category}
          error={errors.category}
          onChange={handleChange}
        />
        <SelectField
          label="Province"
          name="province"
          placeholder="Select a province"
          options={PROVINCES}
          value={values.province}
          error={errors.province}
          onChange={handleChange}
        />
      </div>
      <TextField
        label="Contact number (WhatsApp)"
        name="phone"
        type="tel"
        inputMode="tel"
        placeholder="03001234567"
        value={values.phone}
        error={errors.phone}
        onChange={handleChange}
      />

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? 'Publishing…' : submitLabel}
      </Button>
    </form>
  );
};

export default ItemForm;
