import Card from "../../components/common/card";
export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/homepage.jpg')",
      }}
    >
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
    </div>
  );
}
