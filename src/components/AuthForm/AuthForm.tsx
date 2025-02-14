import { Form } from 'react-router-dom';

function AuthForm() {
  return (
    <Form className="flex flex-col">
      <p className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700">
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </p>
      <p className="mb-4">
        <label htmlFor="password" className="block font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </p>
    </Form>
  );
}

export default AuthForm;
