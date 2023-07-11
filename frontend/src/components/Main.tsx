const dummy = [
  {
    name: "todo",
    data: ["밥먹기"],
  },
  {
    name: "doing",
    data: ["씻기"],
  },
  {
    name: "done",
    data: ["일어나기"],
  },
];

export default function Main() {
  return (
    <main>
      <h2 className="blind">메인</h2>
      <ul>
        {dummy.map((category, index) => (
          <li key={index}>
            <Column category={category} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function Column({ category: { name, data } }: { category: { name: string; data: string[] } }) {
  return (
    <article>
      <h3>{name}</h3>
      <ul>
        {data.map((text, index) => (
          <li key={index}>
            <Card text={text} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function Card({ text }: { text: string }) {
  return (
    <article>
      <h4 className="카드">카드</h4>
      <p>{text}</p>
    </article>
  );
}