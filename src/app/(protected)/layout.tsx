import Sidebar from "@/components/account/Sidebar";
import MainTemplate from "@/templates/MainTemplate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  // console.log("token", token);
  if (!token) {
    redirect("/");
  }

  return (
    <MainTemplate>
      <section className="flex justify-between items-center 2xl:max-w-360 lg:max-w-300 px-4 gap-4 mx-auto lg:py-4 py-8 lg:pb-16">
        {/* sidebar */}
        <div className="lg:w-[30%] w-full self-start">
          <Sidebar />
        </div>

        {/* pages */}
        <div className="lg:w-[70%] w-full self-start py-0 lg:py-1 hidden lg:block">
          {children}
        </div>
      </section>
    </MainTemplate>
  );
}
