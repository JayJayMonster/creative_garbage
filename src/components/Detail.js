export function Detail({ title, text }) {
  console.log('The detail page');
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
