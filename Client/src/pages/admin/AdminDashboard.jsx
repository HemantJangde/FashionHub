import { Link } from "react-router-dom";

function AdminDashboard() {
  const cards = [
    {
      title: "Manage Products",
      description: "View, edit, or delete existing products",
      link: "/admin/products",
    
    },
    {
      title: "Manage Orders",
      description: "Track and update all customer orders",
      link: "/admin/orders",
   
    },
    {
      title: "Add Product",
      description: "Create new products for your store",
      link: "/admin/add",
    
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            to={card.link}
            key={card.title}
            className={`p-6 rounded-lg shadow hover:shadow-lg transition ${card.color} text-gray-600 flex flex-col justify-between`}
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm">{card.description}</p>
            </div>
            <span className="mt-4 inline-block font-medium underline">
              Go &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;