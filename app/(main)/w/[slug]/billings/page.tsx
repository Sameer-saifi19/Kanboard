import BillingClient from "./client";
export default async function Page() {
  return (
    <>
      <main className="flex flex-col gap-6 p-4 w-full max-7-wxl">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Billing</h1>
            <p className="text-sm text-muted-foreground">Manage Billings</p>
          </div>
        </div>
        <BillingClient />
      </main>
    </>
  );
}
