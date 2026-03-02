"use client";

import { sendOtp, verifyOtp, verifyOtpUpdateMobile } from "@/api/customer";
import { useCustomer } from "@/context/CustomerContext";
import { allowOnlyNumbers } from "@/utils/inputHandlers";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Step = "MOBILE" | "OTP";

export default function Login() {
  const { refreshCustomer, clearCustomer, logoutCustomer } = useCustomer();
  const OTP_COOLDOWN = 600; // 10 minutes in seconds

  const [cooldown, setCooldown] = useState(0);

  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  const presetMobile = searchParams.get("mobile");

  const isUpdateMobile = mode === "update-mobile";

  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<Step>("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("otpCooldownUntil");

    if (stored) {
      const diff = Math.floor((Number(stored) - Date.now()) / 1000);

      if (diff > 0) setCooldown(diff);
      else localStorage.removeItem("otpCooldownUntil");
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpCooldownUntil");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (presetMobile) {
      setMobile(presetMobile.replace("91", ""));
      setAuthMode("login");
    }
  }, [presetMobile]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSendOtp = async () => {
    if (loading) return;

    if (mobile.length !== 10) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }

    if (cooldown > 0) return;

    try {
      setLoading(true);

      const res = await sendOtp(mobile);
      console.log(res);

      if (res.success) {
        toast.success(res.message || "OTP sent successfully!");

        setStep("OTP");

        const expiry = Date.now() + OTP_COOLDOWN * 1000;
        localStorage.setItem("otpCooldownUntil", String(expiry));
        setCooldown(OTP_COOLDOWN);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (update?: boolean) => {
    if (loading) return;

    if (otp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

     const res = update ? await verifyOtpUpdateMobile(mobile, otp, "update-mobile") : await verifyOtp(mobile, otp);


      if (res.success) {
        await refreshCustomer();

        // Reset cooldown
        localStorage.removeItem("otpCooldownUntil");
        setCooldown(0);

        setMobile("");
        setOtp("");
        setStep("MOBILE");

        // ✅ Flipkart logic
        if (res.forceLogout) {
          toast.success(res.message || "Number updated. Please login again.");

          clearCustomer(); // only clear frontend state

          router.replace("/login");
          return;
        }


        // ✅ Normal Login Flow
        toast.success("Login successful!");
        router.replace("/");
      }
    } catch (err: any) {
      toast.error(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resetOtpFlow = () => {
    setOtp("");
    setStep("MOBILE");
    localStorage.removeItem("otpCooldownUntil");
    setCooldown(0);
  };
  return (
    <div className="w-full bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-200  mx-auto bg-white rounded-md overflow-hidden flex shadow-sm">
        <div className="hidden md:flex relative bg-linear-to-b gap-2 from-[#5a1d0c] to-[#8a3a28] text-white p-8 md:p-10 flex-col justify-between">
          <h2 className="text-xl font-semibold leading-snug">
            Looks like you&apos;re a<br />
            member!
          </h2>

          <div className="mt-8 md:mt-0 flex justify-center">
            <Image
              src="/images/login.png"
              alt="Login Illustration"
              width={280}
              height={280}
              className="object-contain"
            />
          </div>
        </div>

        <div className="p-8 md:p-10">
          {step === "MOBILE" ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isUpdateMobile
                  ? "Verify Mobile Number"
                  : authMode === "login"
                    ? "Enter Login Details"
                    : "Enter Signup Details"}
              </h3>

              <input
                type="tel"
                maxLength={10}
                placeholder="Enter Mob No."
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                onKeyDown={allowOnlyNumbers}
                className="w-full border text-define-brown border-gray-300 rounded-sm px-4 py-3 text-sm outline-none focus:border-define-brown"
              />

              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                By continuing, you agree to{" "}
                <span className="text-[#5a1d0c] font-medium cursor-pointer">
                  Ganpati Rudraksh
                </span>{" "}
                <span className="underline cursor-pointer">Terms of Use</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
                .
              </p>

              <button
                onClick={handleSendOtp}
                disabled={loading || mobile.length !== 10 || cooldown > 0}
                className="w-full mt-6 bg-[#5a1d0c] hover:bg-[#4a1609] text-white py-3 rounded-sm text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Sending OTP..."
                  : cooldown > 0
                    ? `Resend in ${formatTime(cooldown)}`
                    : authMode === "login"
                      ? "Request OTP"
                      : "Continue"}
              </button>

              {/* Switch Login / Signup Mode */}
              {authMode === "login" ? (
                <button
                  onClick={() => setAuthMode("signup")}
                  className="w-full mt-20 text-[14px] text-define-brown"
                >
                  New to Ganpati Rudraksham? Create an account
                </button>
              ) : (
                <button
                  onClick={() => setAuthMode("login")}
                  className="w-full mt-4 bg-[#FFBB00] text-black py-3 rounded-sm text-sm font-medium"
                >
                  Existing User? Log In
                </button>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enter OTP
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                OTP sent to +91 {mobile}
              </p>

              {/*  Warning */}
              {isUpdateMobile && (
                <p className="text-xs text-red-600 mb-3">
                  You will be logged out after changing your mobile number.
                </p>
              )}

              <input
                type="tel"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onKeyDown={allowOnlyNumbers}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm outline-none focus:border-[#5a1d0c]"
              />

              <button
                onClick={() =>
                  isUpdateMobile ? handleVerifyOtp(true) : handleVerifyOtp()
                }
                disabled={loading || otp.length !== 6}
                className="w-full mt-6 bg-[#5a1d0c] hover:bg-[#4a1609] text-white py-3 rounded-sm text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Verifying..."
                  : isUpdateMobile
                    ? "Verify & Update Number"
                    : "Verify & Continue"}
              </button>

              {/* Change Mobile */}
              <button
                onClick={resetOtpFlow}
                className="block w-full mt-4 text-sm underline text-gray-600"
              >
                Change mobile number
              </button>

              {/* Resend */}
              {cooldown > 0 ? (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Resend OTP in{" "}
                  <span className="font-semibold">{formatTime(cooldown)}</span>
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="block w-full mt-3 text-sm underline text-[#5a1d0c]"
                >
                  Resend OTP
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
