import { Header } from "@/core/presentation/components/header";
import { TotalCorn } from "@/core/presentation/components/total-corn";
import { Purchase } from "@/core/presentation/components/purchase";
import { Policy } from "@/core/presentation/components/policy";
import { RecentPurchases } from "@/core/presentation/components/recent-purchases";
import { Footer } from "@/core/presentation/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl space-y-10 px-2 sm:px-4">
        {/* Header */}
        <Header />

        {/* Total Corn */}
        <TotalCorn />

        {/* Purchase Section */}
        <Purchase />

        {/* Policy */}
        <Policy />

        {/* Recent Purchases */}
        <RecentPurchases />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
