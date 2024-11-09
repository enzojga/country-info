import CountryList from "../components/CountryList";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col bg-primary mx-auto min-h-svh gap-4">
       <CountryList />
    </main>
  );
}
