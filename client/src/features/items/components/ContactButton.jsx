import { MessageCircle } from 'lucide-react';
import { toWhatsAppLink } from '../../../lib/format';

const ContactButton = ({ phone }) => (
  <a
    href={toWhatsAppLink(phone)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
  >
    <MessageCircle size={16} aria-hidden="true" />
    Contact on WhatsApp
  </a>
);

export default ContactButton;
