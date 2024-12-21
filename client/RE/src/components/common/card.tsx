export default function Card() {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-2xl border-2 border-blue-500 rounded-lg">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-t-lg"
          />
        </figure>
        <div className="card-body rounded-b-lg">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions flex justify-end mt-4 mb-4 mr-4">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
