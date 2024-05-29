export default function OfferGoods({ items }: { items?: string[] }) {
  return (
    <div className="offer__inside" data-testid="offer__inside-container">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {items?.map((name) => (
          <li key={name} className="offer__inside-item" data-testid="offer__inside-value">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
