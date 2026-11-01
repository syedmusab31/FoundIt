import { WORKFLOWS } from '../content';

const HowItWorksSection = () => (
  <section className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-light text-gray-900 lg:text-4xl">How FoundIt works</h2>
        <p className="text-lg text-gray-600">Simple steps to reunite with your belongings</p>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        {WORKFLOWS.map((workflow) => (
          <div key={workflow.title}>
            <h3 className="mb-8 text-xl font-medium text-gray-900">{workflow.title}</h3>
            <ol className="space-y-6">
              {workflow.steps.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  </div>
                  <p className="pt-2 leading-relaxed text-gray-700">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
