"use client";

import { useCustomer } from "@/context/CustomerContext";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import AddressForm from "./AddressForm";
import ConfirmModal from "@/ui/ConfirmModal";

type AddressType = "Home" | "Office" | "Others";

type Address = {
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

const emptyForm: Address = {
  name: "",
  mobile: "",
  alternateMobile: "",
  pin: "",
  area: "",
  city: "",
  state: "",
  landmark: "",
  type: "Home",
};

export default function ManageAddress() {
  const { customer } = useCustomer();
const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | undefined>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState<Address | null>(null);
  const initialized = useRef(false);
  // const handleChange = (key: keyof Address, value: string) => {
  //   setForm({ ...form, [key]: value });
  // };

  useEffect(() => {
    if (!customer?.addresses) return;
    if (!initialized.current) {
      setAddresses(customer.addresses as Address[]);
      initialized.current = true;
    }
  }, [customer?._id]);

  /* ================= CREATE ================= */
  const createAddress = async () => {
    if (!customer?._id || !form) return;
    if(!form.name || !form.mobile || !form.pin || !form.area || !form.city || !form.state || !form.landmark){
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/${customer._id}/address`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();
      if (!res.ok || !data.address) throw new Error();

      setAddresses((prev) => [...prev, data.address]);
      toast.success("Address added");
      setForm(null);
    } catch {
      toast.error("Failed to add address");
    }
  };

  /* ================= UPDATE ================= */
  const updateAddress = async () => {
    if (!customer?._id || !form?._id) return;
      if (
        !form.name ||
        !form.mobile ||
        !form.pin ||
        !form.area ||
        !form.city ||
        !form.state ||
        !form.landmark
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      if (form.mobile.length !== 10) {
        toast.error("Mobile number must be 10 digits");
        return;
      }

      if (form.alternateMobile && form.alternateMobile.length !== 10) {
        toast.error("Alternate mobile number must be 10 digits");
        return;
      }

      if (form.pin.length !== 6) {
        toast.error("Pin code must be 6 digits");
        return;
      }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/${customer._id}/address/${form._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();
      if (!res.ok || !data.address) throw new Error();

      setAddresses((prev) =>
        prev.map((a) => (a._id === form._id ? data.address : a)),
      );
      toast.success("Address updated");
      setForm(null);
    } catch {
      toast.error("Failed to update address");
    }
  };

  /* ================= DELETE ================= */
  const removeAddress = async (id?: string) => {
    if (!customer?._id || !id) return;

    const prev = addresses;
    setAddresses((a) => a.filter((x) => x._id !== id));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/${customer._id}/address/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error();
      toast.success("Address removed");
    } catch {
      setAddresses(prev);
      toast.error("Failed to remove address");
    }
  };

  const handleConfirmDelete = async (id?: string) => {
    setConfirmOpen(false);
    if (!id) return;
    await removeAddress(id);
  };

  return (
    <div className="bg-white rounded-md px-6 flex flex-col gap-4">
      <div>
        <button
          onClick={() => setForm({ ...emptyForm })}
          className="bg-define-brown text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Address
        </button>
      </div>
      {/* ADD ADDRESS */}
      {form && (
        <div className="border border-gray-200 rounded-md p-4 space-y-4 shadow-defined-light">
          <AddressForm form={form} onChange={setForm} />

          <div className="flex gap-3">
            <button
              onClick={form._id ? updateAddress : createAddress}
              className="bg-define-brown text-white px-5 py-2 rounded-md text-sm"
            >
              {form._id ? "Update Address" : "Save Address"}
            </button>

            <button
              onClick={() => setForm(null)}
              className="border px-5 py-2 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SAVED ADDRESSES */}
      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="border border-gray-200 rounded-md p-4 flex justify-between shadow-defined-light"
          >
            <div>
              <span className="text-xs bg-define-brown text-white px-2 py-0.5 rounded">
                {addr.type}
              </span>

              <p className="font-semibold mt-1">
                {addr.name}{" "}
                <span className="text-sm text-gray-500">| {addr.mobile}</span>
              </p>

              <p className="text-sm text-gray-600">
                {[addr.area, addr.city, addr.state, addr.pin]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            <div className="flex gap-3">
              <BiPencil
                size={16}
                className="text-green-600 cursor-pointer"
                onClick={() => setForm(addr)}
              />
              <BsTrash2
                size={16}
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setSelectedId(addr._id);
                  setConfirmOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>  
      <ConfirmModal
        open={confirmOpen}
        id={selectedId}
        text="Are you sure you want to delete this address?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

