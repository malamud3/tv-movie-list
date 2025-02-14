export default function HomePage() {
  const fruits: { id: number; name: string }[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ];
  return (
    <>
      <main>
        <h1>Hello</h1>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit.id}>{fruit.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
