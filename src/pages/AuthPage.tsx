import AuthForm from '../components/AuthForm/AuthForm';
export default function Home() {
  return (
    <>
      <header className="flex justify-center">
        <h1 className="mb-4 mt-5 text-3xl underline">Hello</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <AuthForm />
        <section className="mt-4 flex space-x-4 text-xl font-bold">
          {/* <NavLink
            href="/main"
            className="rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 text-white hover:from-blue-700 hover:to-blue-900"
          >
            Register
          </NavLink>
          <NavLink
            href="/main"
            className="rounded-md bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 text-white hover:from-green-700 hover:to-green-900"
          >
            Login
          </NavLink> */}
        </section>
      </main>
    </>
  );
}
