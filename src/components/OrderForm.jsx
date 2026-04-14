import { useState } from 'react';
import useOrderStore from '../store/useOrderStore';

/**
 * Order form component.
 * Collects customer information and submits customized bag orders.
 * @returns {JSX.Element} Styled order form with summary preview.
 */
export default function OrderForm() {
  const {
    bagType,
    sequinColor,
    sequinStyle,
    frameColor,
    panelColor,
    quantity,
    addOrder,
    resetCustomization,
  } = useOrderStore();

  const [formData, setFormData] = useState({ customerName: '', email: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles form input changes.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Input change event.
   * @returns {void}
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  /**
   * Handles order submission and stores order data.
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event.
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    addOrder({
      customerName: formData.customerName,
      email: formData.email,
      bagType,
      config: bagType === 'tote' ? { sequinColor, sequinStyle } : { frameColor, panelColor },
      quantity,
      notes: formData.notes,
    });

    setFormData({ customerName: '', email: '', notes: '' });
    setSubmitted(true);
    resetCustomization();
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="rounded-[28px] border border-stone-200 bg-white/80 p-6 shadow-[0_20px_45px_rgba(28,27,27,0.08)]">
      <h3 className="font-serif text-3xl text-sacimak-on-surface">Place Your Order</h3>
      <p className="mt-2 text-sm text-sacimak-variant">We will confirm details and artisan turnaround by email.</p>

      {submitted && (
          <p className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-700">
            Order received — thank you for choosing SACIMAK.
          </p>
        )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-sacimak-variant">
            Name
            <input
              required
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sacimak-on-surface outline-none transition focus:border-sacimak-primary"
              placeholder="Your full name"
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-sacimak-variant">
            Email
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sacimak-on-surface outline-none transition focus:border-sacimak-primary"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold text-sacimak-variant">
          Notes
          <textarea
            rows="3"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-sacimak-on-surface outline-none transition focus:border-sacimak-primary"
            placeholder="Optional details for your artisan request."
          />
        </label>

        <div className="space-y-3 rounded-2xl border border-stone-200 bg-sacimak-container/55 p-4 text-sm text-sacimak-variant">
          <p className="font-semibold text-sacimak-on-surface">Order Summary</p>
          <div className="flex items-center justify-between">
            <span>Bag type</span>
            <span className="font-semibold uppercase text-sacimak-on-surface">{bagType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Quantity</span>
            <span className="font-semibold text-sacimak-on-surface">{quantity}</span>
          </div>
          {bagType === 'tote' ? (
            <>
                <div className="flex items-center justify-between">
                  <span>Sequin color</span>
                  <span className="flex items-center gap-2 font-semibold text-sacimak-on-surface">
                    <span className="h-4 w-4 rounded-full border border-stone-300" style={{ backgroundColor: sequinColor }} />
                    {sequinColor}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Finish</span>
                  <span className="font-semibold capitalize text-sacimak-on-surface">{sequinStyle}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span>Frame</span>
                  <span className="font-semibold capitalize text-sacimak-on-surface">{frameColor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Panel color</span>
                  <span className="flex items-center gap-2 font-semibold text-sacimak-on-surface">
                    <span className="h-4 w-4 rounded-full border border-stone-300" style={{ backgroundColor: panelColor }} />
                    {panelColor}
                  </span>
                </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-sacimak-primary to-sacimak-primary-container px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
        >
          Add to Order
        </button>
      </form>
    </div>
  );
}
