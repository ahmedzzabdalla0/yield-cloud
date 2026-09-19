type Props = {
  children: React.ReactNode;
};

export default function CalculatorsLayout({ children }: Props) {
  return (
    <>
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
