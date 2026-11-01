import Button from '../../../components/ui/Button';
import { ROUTES } from '../../../constants/routes';

const CallToActionSection = () => (
  <section className="bg-primary py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
      <div className="space-y-6 text-white">
        <h2 className="text-3xl font-light leading-tight lg:text-4xl">Found an item?</h2>
        <p className="text-xl leading-relaxed text-blue-100">Reconnect it with its owner effortlessly through FoundIt</p>
        <p className="max-w-lg leading-relaxed text-blue-100">
          Our secure platform makes returning lost items simple and stress-free for everyone involved.
        </p>
        <Button to={ROUTES.NEW_FOUND_ITEM} size="lg" variant="inverse">
          List found item
        </Button>
      </div>
      <div className="flex justify-center lg:justify-end" aria-hidden="true">
        <div className="flex h-64 w-80 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
          <div className="space-y-4 text-center">
            <div className="text-6xl">🤝</div>
            <p className="font-medium text-white">Make someone&apos;s day</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CallToActionSection;
