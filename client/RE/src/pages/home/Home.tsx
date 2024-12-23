import Card from "../../components/common/card";
export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Left Panel (Card and other content) */}
      {/* Cards or other content */}
      <div className="flex flex-wrap gap-y-8 gap-x-4 justify-start pt-8 pl-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
