import MenuClient from "./components/MenuClient";

export const metadata = {
  title: "Create new Contest",
};

export default function RootLayout({
  params,
  children,
}: {
  params: { id: number };
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center">
        {children}
        <MenuClient contest_id={params.id} />
      </div>
    </>
  );
}
