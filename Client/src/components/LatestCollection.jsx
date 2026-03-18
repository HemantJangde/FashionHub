import React from 'react'

export default function LatestCollection() {
  return (
    <div>
        <div className="my-10">
    {/* Heading */}
      <div className="text-center py-8 text-3xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            LATEST <span className="text-gray-700 font-medium">COLLECTIONS</span>
          </p>
          <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
        </div>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((product) => (
          <a
            key={product.id}
            className="text-gray-700 cursor-pointer"
            href={`/product/${product.id}`}
          >
            <div className="overflow-hidden">
              <img
                className="hover:scale-110 transition ease-in-out"
                src={product.image}
                alt={product.name}
              />
            </div>
            <p className="pt-3 pb-1 text-sm">{product.name}</p>
            <p className="text-sm font-medium">{product.price}</p>
          </a>
        ))}
      </div>
</div>
      
    </div>
  )
}

const products = [
  {
    id: "6683da887f779795ecfa98fd",
    name: "Kid Tapered Slim Fit Trouser",
    price: "$38",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png",
  },
  {
    id: "6683d8897f779795ecfa98df",
    name: "Men Round Neck Pure Cotton T-shirt",
    price: "$64",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img8.png",
  },
  {
    id: "6683d5b67f779795ecfa98bb",
    name: "Boy Round Neck Pure Cotton T-shirt",
    price: "$60",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
  },
  {
    id: "6683d8d17f779795ecfa98e5",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "$74",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img35.png",
  },
  {
    id: "6683d5e07f779795ecfa98bd",
    name: "Men Tapered Fit Flat-Front Trousers",
    price: "$58",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img15.png",
  },
  {
    id: "6683d4b27f779795ecfa98ab",
    name: "Girls Round Neck Cotton Top",
    price: "$56",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img6.png",
  },
  {
    id: "6683daf67f779795ecfa9905",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "$68",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png",
  },
  {
    id: "6683dadf7f779795ecfa9903",
    name: "Kid Tapered Slim Fit Trouser",
    price: "$40",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img50.png",
  },
  {
    id: "6683d94e7f779795ecfa98ed",
    name: "Men Printed Plain Cotton Shirt",
    price: "$52",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img39.png",
  },
  {
    id: "6683d8f27f779795ecfa98e7",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "$78",
    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img36.png",
  },
];