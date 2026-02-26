"use client";

import { allowOnlyNumbers, blockNumbersInText } from "@/utils/inputHandlers";

type AddressType = "Home" | "Office" | "Others";

export type Address = {
  _id?: string;
  name: string;
  mobile: string;
  alternateMobile?: string;
  pin: string;
  area: string;
  city: string;
  state: string;
  landmark?: string;
  type: AddressType;
};

function AddressForm({
  form,
  onChange,
}: {
  form: Address;
  onChange: (v: Address) => void;
}) {
  const update = (k: keyof Address, v: string) => onChange({ ...form, [k]: v });

  /* ================= PIN FETCH ================= */
  async function fetchFromPin(pin: string) {
    if (pin.length !== 6) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pickup/location/${pin}`,
      );

      if (!res.ok) return;

      const data = await res.json();

      const postOffice =
        data?.PostOffice || (Array.isArray(data) ? data[0]?.PostOffice : null);

      if (postOffice?.length > 0) {
        onChange({
          ...form,
          pin, // preserve correct 6-digit pin
          city: postOffice[0]?.District || "",
          state: postOffice[0]?.State || "",
        });
      }
    } catch (err) {
      console.error("Error fetching pin code details:", err);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {/* Name */}
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          onKeyDown={blockNumbersInText}
          className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
        />

        {/* Mobile */}
        <div>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            maxLength={10}
            onKeyDown={allowOnlyNumbers}
            onChange={(e) => {
              const v = e.target.value;
              if (!/^\d*$/.test(v) || v.length > 10) return;
              update("mobile", v);
            }}
            className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
          />

          {form.mobile && form.mobile.length < 10 && (
            <p className="text-xs text-red-500 mt-1">Must be 10 digits</p>
          )}
        </div>

        {/* PIN */}
        <div>
          <input
            type="tel"
            placeholder="Pin Code"
            value={form.pin}
            maxLength={6}            
            onKeyDown={allowOnlyNumbers}
            onChange={(e) => {
              const v = e.target.value;

              if (!/^\d*$/.test(v) || v.length > 6) return;

              update("pin", v);

              if (v.length === 6) {
                fetchFromPin(v);
              }
            }}
            className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
          />

          {form.pin && form.pin.length < 6 && (
            <p className="text-xs text-red-500 mt-1">Must be 6 digits</p>
          )}
        </div>

        {/* Area */}
        <input
          placeholder="Area"
          value={form.area}
          onChange={(e) => update("area", e.target.value)}
          onKeyDown={blockNumbersInText}
          className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
        />

        {/* City */}
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          onKeyDown={blockNumbersInText}
          className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
        />

        {/* State */}
        <input
          placeholder="State"
          value={form.state}
          onChange={(e) => update("state", e.target.value)}
          onKeyDown={blockNumbersInText}
          className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
        />

        {/* Landmark */}
        <input
          placeholder="Landmark"
          value={form.landmark || ""}
          onChange={(e) => update("landmark", e.target.value)}
          onKeyDown={blockNumbersInText}
          className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
        />

        {/* Alternate Mobile */}
        <div>
          <input
            type="tel"
            placeholder="Alternative Phone"
            value={form.alternateMobile || ""}
            maxLength={10}            
            onKeyDown={allowOnlyNumbers}
            onChange={(e) => {
              const v = e.target.value;
              if (!/^\d*$/.test(v) || v.length > 10) return;
              update("alternateMobile", v);
            }}
            className="border border-gray-200 rounded-md px-4 py-3 text-sm w-full outline-none"
          />

          {form.alternateMobile &&
            form.alternateMobile.length > 0 &&
            form.alternateMobile.length < 10 && (
              <p className="text-xs text-red-500 mt-1">Must be 10 digits</p>
            )}
        </div>
      </div>

      {/* Address Type */}
      <div className="mt-4 flex gap-6 text-sm text-defined-green">
        {(["Home", "Office", "Others"] as AddressType[]).map((t) => (
          <label key={t} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={form.type === t}
              onChange={() => update("type", t)}
            />
            {t}
          </label>
        ))}
      </div>
    </>
  );
}

export default AddressForm;
