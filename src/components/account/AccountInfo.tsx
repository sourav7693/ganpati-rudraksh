"use client";

import { logout } from "@/api/customer";
import { useCustomer } from "@/context/CustomerContext";
import { allowOnlyNumbers, blockNumbersInText } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type EditSection = "personal" | "email" | "mobile";
export default function AccountInfo() {
  const router = useRouter();
  const [editPersonal, setEditPersonal] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { customer, loading, logoutCustomer, clearCustomer, refreshCustomer } = useCustomer();
  const [gender, setGender] = useState(customer?.gender || "male");
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [mobile, setMobile] = useState(customer?.mobile || "");


  const inputStyle = (editable: boolean) =>
    `border px-4 py-3 text-sm rounded-sm outline-none
     ${
       editable
         ? "border-gray-300 bg-white focus:border-[#2874F0]"
         : "border-gray-200 bg-gray-50 cursor-not-allowed"
     }`;

       const handleCancelEdit = (section: EditSection) => {
         if (!customer) return;

         // Reset values back to saved customer data
         if (section === "personal") {
           setName(customer.name || "");
           setGender(customer.gender || "male");
           setEditPersonal(false);
         }

         if (section === "email") {
           setEmail(customer.email || "");
           setEditEmail(false);
         }

         if (section === "mobile") {
           setMobile(customer.mobile || "");
           setEditMobile(false);
         }
       };
  const updateField = async (key: string, value: string) => {
    if (!customer?._id || !value.trim()) {
      console.log(customer?._id, value);
      console.warn("Invalid update attempt:", { key, value });
      return;
    };

    if (key === "mobile" && !value.startsWith("91")) {
      value = "91" + value;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/${customer._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ [key]: value }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Update failed");
      }

      const data = await res.json();

      toast.success("Update successful");
      return data.data;
    } catch (error: any) {
      toast.error(error.message || "Update failed");
      throw error;
    }
  };

  // const deleteAccount = async () => {
  //   if (!customer?._id) return;

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/customer/${customer._id}`,
  //     {
  //       method: "DELETE",
  //       credentials: "include",
  //     },
  //   );

  //   if (!res.ok) {
  //     toast.error("Failed to delete account");
  //     return;
  //   }

  //   toast.success("Account deleted");
  //   await logout();
  //   router.push("/");
  // };

  const deactivateAccount = async () => {
    try {
      await updateField("status", "false");
      await logoutCustomer();
      clearCustomer();

      toast.success("Account deactivated");
      await logout();
      router.push("/");
    } catch {}
  };

  useEffect(() => {
    if (!loading && customer) {
      setGender(customer?.gender || "male");
       setName(customer.name || "");
       setEmail(customer.email || "");
       setMobile(customer.mobile || "");
      setInitialized(true);
    }
  }, [customer, loading]);

  useEffect(() => {
    if (!customer || gender === customer.gender) return;

    // Only update if gender actually changed
    updateField("gender", gender).catch((error) => {
      console.error("Failed to update gender:", error);
    });
  }, [gender]); // Only run when gender changes

  const handleSaveName = async () => {
    await updateField("name", name);
    await refreshCustomer();
    setEditPersonal(false);
  };

  const handleSaveEmail = async () => {
    await updateField("email", email);
    await refreshCustomer();
    setEditEmail(false);
  };

const handleSaveMobile = async () => {
  let formattedMobile = mobile;

  if(!formattedMobile.trim()) {
    toast.error("Mobile number cannot be empty");
    return;
  }
  if(formattedMobile.length < 10) {
    toast.error("Enter valid mobile number");
    return;
  }

  if (!formattedMobile.startsWith("91")) {
    formattedMobile = "91" + formattedMobile;
  }

  // Same number check
  if (formattedMobile === customer?.mobile) {
    toast.error("Already your current number");
    return;
  }

  // Step 1: Check if mobile exists
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/check-mobile?mobile=${formattedMobile}`,
    {      
      credentials: "include",
    },
  );

  const data = await res.json();

  if (data.exists) {
    toast.error("Mobile already registered with another account");
    return;
  }

  // Step 2: Redirect to login OTP screen
  toast.success("OTP verification required");

  router.push(`/login?mode=update-mobile&mobile=${formattedMobile}`);
};



  if (loading || !initialized) {
    return (
      <div className="bg-white rounded-md p-6 md:p-8 md:pb-30 relative overflow-hidden">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white lg:px-8 lg:py-0 p-8 ">
      {/* ================= Personal Information ================= */}
      <section className="mb-14">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>

          <button
            onClick={() =>
              editPersonal
                ? handleCancelEdit("personal")
                : setEditPersonal(true)
            }
            className="text-sm font-bold text-define-brown"
          >
            {editPersonal ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex items-start gap-6 mb-6">
          {/* Name inputs (SMALL WIDTH) */}
          <div className="flex gap-6">
            <input
              placeholder="Full Name"
              disabled={!editPersonal}
              value={name}
              onKeyDown={blockNumbersInText}
              onChange={(e) => setName(e.target.value)}
              className={`${inputStyle(editPersonal)} w-[260px]`}
            />
          </div>

          {editPersonal && (
            <button
              onClick={handleSaveName}
              className="h-[46px] px-10 bg-define-brown text-white text-sm font-medium rounded-sm"
            >
              SAVE
            </button>
          )}
        </div>

        {/* Gender */}
        <div>
          <p className="text-sm text-gray-800 mb-4">Your Gender</p>

          <div className="flex gap-10 text-sm text-gray-900">
            {["male", "female"].map((g) => (
              <label
                key={g}
                className={`flex items-center gap-3 ${
                  !editPersonal && "opacity-60"
                }`}
              >
                <input
                  type="radio"
                  disabled={!editPersonal}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Email Address ================= */}
      <section className="mb-14">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Email Address</h2>

          <button
            onClick={() =>
              editEmail ? handleCancelEdit("email") : setEditEmail(true)
            }
            className="text-sm font-bold text-define-brown"
          >
            {editEmail ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex items-center gap-6">
          <input
            placeholder="Email Address"
            disabled={!editEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputStyle(editEmail)} w-[280px]`}
          />

          {editEmail && (
            <button
              onClick={handleSaveEmail}
              className="h-[46px] px-10 bg-define-brown text-white text-sm font-medium rounded-sm"
            >
              SAVE
            </button>
          )}
        </div>
      </section>

      {/* ================= Mobile Number ================= */}
      <section>
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Mobile Number</h2>

          <button
            onClick={() =>
              editMobile ? handleCancelEdit("mobile") : setEditMobile(true)
            }
            className="text-sm font-bold text-define-brown"
          >
            {editMobile ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex items-center gap-6">
          <input
            type="tel"
            maxLength={10}
            placeholder="Mobile No"
            disabled={!editMobile}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onKeyDown={allowOnlyNumbers}
            className={`${inputStyle(editMobile)} w-[260px]`}
          />

          {editMobile && (
            <button
              onClick={handleSaveMobile}
              className="h-[46px] px-10 bg-define-brown text-white text-sm font-medium rounded-sm"
            >
              SAVE
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
