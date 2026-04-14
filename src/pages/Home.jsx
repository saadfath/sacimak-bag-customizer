import BagViewer from '../components/BagViewer';
import Customizer from '../components/Customizer';
import OrderForm from '../components/OrderForm';
import useOrderStore from '../store/useOrderStore';

const BAG_TYPES = [
  {
    type: 'tote',
    title: 'Tote Bag',
    icon: 'Fish-scale sequins',
    style: 'from-[#ff7f50] to-[#a43c12]',
    description: 'Structured open-top tote with layered fish-scale sequins.',
  },
  {
    type: 'clutch',
    title: 'Clutch Bag',
    icon: 'Gold-frame minimal',
    style: 'from-[#006a6a] to-[#4ddad8]',
    description: 'Slim box clutch with rounded corners and metallic trim.',
  },
];

/**
 * Home page component
 * Main landing page with hero section, bag customizer, and order form
 */
export default function Home() {
  const setBagType = useOrderStore((state) => state.setBagType);

  /**
   * Scrolls to the customizer section.
   * @returns {void}
   */
  const scrollToCustomizer = () => {
    document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Sets selected bag type and scrolls to customizer.
   * @param {'tote' | 'clutch'} bagType - Selected bag type.
   * @returns {void}
   */
  const handleBagSelection = (bagType) => {
    setBagType(bagType);
    scrollToCustomizer();
  };

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-14 pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-sacimak-primary/15 blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sacimak-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-sacimak-primary/20 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sacimak-primary">
            Handmade in Morocco · Digital Atelier
          </p>
          <h1 className="mb-6 font-serif text-6xl font-black leading-none text-sacimak-on-surface sm:text-8xl">
            SACIMAK
          </h1>
          <p className="mx-auto mb-4 max-w-3xl text-lg text-sacimak-on-surface sm:text-2xl">
            Bold, colorful luxury bags crafted by hand.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sacimak-variant">
            Select your shape, tune every finish, and preview in a live atelier-style studio.
          </p>

          <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToCustomizer}
              className="rounded-full bg-gradient-to-r from-sacimak-primary to-sacimak-primary-container px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
            >
              Customize Your Bag
            </button>
            <a
              href="#order"
              className="rounded-full border border-stone-300 bg-white px-7 py-3 text-sm font-semibold text-sacimak-variant transition hover:border-sacimak-secondary hover:text-sacimak-secondary"
            >
              Place an Order
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {BAG_TYPES.map((bag) => (
              <button
                key={bag.type}
                onClick={() => handleBagSelection(bag.type)}
                className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white text-left shadow-[0_24px_50px_rgba(28,27,27,0.08)] transition hover:-translate-y-1 hover:border-sacimak-primary/40"
              >
                <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${bag.style}`}>
                  <span className="rounded-full border border-white/40 bg-white/15 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                    {bag.icon}
                  </span>
                </div>
                <div className="space-y-3 p-6">
                  <h2 className="font-serif text-3xl font-bold text-sacimak-on-surface">{bag.title}</h2>
                  <p className="text-sm leading-relaxed text-sacimak-variant">{bag.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-sacimak-primary transition group-hover:translate-x-1">
                    Start customizing <span aria-hidden>→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="customizer" className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="space-y-3 rounded-[28px] border border-stone-200 bg-white/75 p-6 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-secondary">
              Live 3D Studio
            </p>
            <h2 className="font-serif text-4xl text-sacimak-on-surface">
              Design your signature SACIMAK bag
            </h2>
            <p className="max-w-3xl text-sacimak-variant">
              Rotate, zoom, and preview your tote or clutch in real time. Every color and finish updates instantly.
            </p>
          </div>
          <div className="h-[520px] lg:col-span-2">
            <BagViewer />
          </div>
          <div className="lg:col-span-1">
            <Customizer />
          </div>
        </div>
      </section>

      <section id="order" className="px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-stone-200 bg-sacimak-container/60 p-8 shadow-[0_25px_60px_rgba(28,27,27,0.08)]">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-4xl text-sacimak-on-surface">Finalize Your Order</h2>
            <p className="mt-2 text-sacimak-variant">
              Share your details and we will prepare your handcrafted piece.
            </p>
          </div>
          <OrderForm />
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/70 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-serif text-2xl text-sacimak-primary">SACIMAK</p>
          <p className="mt-2 text-sm text-sacimak-variant">
            Moroccan-inspired luxury · handmade craftsmanship · custom expression
          </p>
        </div>
      </footer>
    </main>
  );
}
