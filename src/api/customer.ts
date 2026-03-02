import { Customer } from "@/types/types";
import axios, { AxiosError } from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  customer: Customer;
  message: string;
  isNewUser: boolean;
  forceLogout?: boolean;
}

export type ApiErrorResponse = {
  message: string;
};

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  withCredentials: true,
});

export const sendOtp = async (mobile: string): Promise<SendOtpResponse> => {
  try {
    const { data } = await api.post<SendOtpResponse>("/customer/send-otp", {
      mobile,
    });
    console.log(data);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "OTP send failed");
  }
};

export const verifyOtp = async (
  mobile: string,
  otp: string,  
): Promise<VerifyOtpResponse> => {
  try {
    const res = await api.post<VerifyOtpResponse>("/customer/verify-otp", {
      mobile,
      otp,      
    });
    console.log("verify otp wala data",res);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "OTP verify failed");
  }
};
export const verifyOtpUpdateMobile = async (
  mobile: string,
  otp: string,
  mode: string = "update-mobile",
): Promise<VerifyOtpResponse> => {
  try {
    const { data } = await api.post<VerifyOtpResponse>(
      "/customer/verify-update-mobile-otp",
      {
        mobile,
        otp,
        mode,
      },
    );
    // console.log("verify otp wala data",data);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "OTP verify failed");
  }
};

export const getMe = async (): Promise<Customer> => {
  try {
    const { data } = await api.get<Customer>("/customer/me");
    // console.log("getMe wala data",data);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "Failed to get customer");
  }
};

export const getCustomer = async (): Promise<Customer> => {
  try {
    const { data } = await api.get<Customer>("/customer");
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "Failed to get customers");
  }
};

export const logout = async () => {
  try {
    await api.post("/customer/logout", {}, { withCredentials: true });
    localStorage.removeItem("LOCAL_CART");
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw new Error(err.response?.data?.message ?? "Failed to logout");
  }
};
