import useOrderStore from '../store/useOrderStore';

const BAG_OPTIONS = [
  { id: 'tote', label: 'Tote', icon: '👜', subtitle: 'Fish-scale sequins' },
  { id: 'clutch', label: 'Clutch', icon: '✨', subtitle: 'Metal frame elegance' },
];

const TOTE_PRESETS = [
  { name: 'Multicolor', color: '#FF6B9D' },
  { name: 'Black + Navy', color: '#111827' },
  { name: 'Gold + Silver', color: '#C9A84C' },
  { name: 'Coral', color: '#F97373' },
  { name: 'Teal', color: '#14B8A6' },
  { name: 'Violet', color: '#8B5CF6' },
];

const FRAME_OPTIONS = [
  { id: 'gold', label: 'Gold', color: '#C9A84C' },
  { id: 'silver', label: 'Silver', color: '#C0C0C0' },
  { id: 'rose-gold', label: 'Rose Gold', color: '#E0BFB8' },
];

/**
 * Customizer control panel component.
 * Provides premium controls for bag type, colors, finish, and quantity.
 * @returns {JSX.Element} Interactive customization panel.
 */
export default function Customizer() {
  const {
    bagType,
    sequinColor,
    sequinStyle,
    frameColor,
    panelColor,
    quantity,
    setBagType,
    setSequinColor,
    setSequinStyle,
    setFrameColor,
    setPanelColor,
    setQuantity,
  } = useOrderStore();

  return (
    <aside className="space-y-6 rounded-[28px] border border-stone-200 bg-sacimak-container/75 p-6 shadow-[0_20px_40px_rgba(28,27,27,0.08)]">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-secondary">Digital Atelier</p>
        <h3 className="mt-2 font-serif text-3xl text-sacimak-on-surface">Craft Your Piece</h3>
      </header>

      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Bag type</p>
        <div className="grid grid-cols-2 gap-3">
          {BAG_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setBagType(option.id)}
              className={`rounded-2xl border p-3 text-left transition ${
                bagType === option.id
                  ? 'border-sacimak-primary/50 bg-sacimak-primary/10'
                  : 'border-stone-300 bg-white hover:border-sacimak-secondary/50'
              }`}
            >
              <p className="text-lg">{option.icon}</p>
              <p className="font-semibold text-sacimak-on-surface">{option.label}</p>
              <p className="text-xs text-sacimak-variant">{option.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      {bagType === 'tote' && (
        <>
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Sequin palette</p>
            <div className="grid grid-cols-2 gap-2">
              {TOTE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSequinColor(preset.color)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                    sequinColor === preset.color
                      ? 'border-sacimak-primary/60 bg-sacimak-primary/10 text-sacimak-primary'
                      : 'border-stone-300 bg-white text-sacimak-variant hover:border-sacimak-secondary/50'
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
            <label className="block text-xs text-sacimak-variant">
              Custom Color
              <input
                type="color"
                value={sequinColor}
                onChange={(event) => setSequinColor(event.target.value)}
                className="mt-2 h-12 w-full cursor-pointer rounded-xl border border-stone-300 bg-white p-1"
              />
            </label>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Material feel</p>
            <div className="grid grid-cols-2 gap-3">
              {['glossy', 'matte'].map((finish) => (
                <button
                  key={finish}
                  onClick={() => setSequinStyle(finish)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition ${
                    sequinStyle === finish
                      ? 'border-sacimak-primary/60 bg-sacimak-primary/10 text-sacimak-primary'
                      : 'border-stone-300 bg-white text-sacimak-variant hover:border-sacimak-secondary/50'
                  }`}
                >
                  {finish}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {bagType === 'clutch' && (
        <>
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Frame finish</p>
            <div className="grid grid-cols-3 gap-2">
              {FRAME_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFrameColor(option.id)}
                  className={`rounded-xl border px-2 py-2 text-center text-xs font-semibold transition ${
                    frameColor === option.id
                      ? 'border-sacimak-primary/60 bg-sacimak-primary/10 text-sacimak-primary'
                      : 'border-stone-300 bg-white text-sacimak-variant hover:border-sacimak-secondary/50'
                  }`}
                >
                  <span
                    className="mx-auto mb-1 block h-4 w-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: option.color }}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">
              Front panel color
              <input
                type="color"
                value={panelColor}
                onChange={(event) => setPanelColor(event.target.value)}
                className="mt-2 h-12 w-full cursor-pointer rounded-xl border border-stone-300 bg-white p-1"
              />
            </label>
          </section>
        </>
      )}

      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="h-11 w-11 rounded-xl border border-stone-300 bg-white text-xl font-bold text-sacimak-variant transition hover:border-sacimak-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(parseInt(event.target.value, 10) || 1)}
            className="h-11 flex-1 rounded-xl border border-stone-300 bg-white text-center text-lg font-bold text-sacimak-on-surface outline-none transition focus:border-sacimak-primary"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-11 w-11 rounded-xl border border-stone-300 bg-white text-xl font-bold text-sacimak-variant transition hover:border-sacimak-primary"
          >
            +
          </button>
        </div>
      </section>
    </aside>
  );
}
