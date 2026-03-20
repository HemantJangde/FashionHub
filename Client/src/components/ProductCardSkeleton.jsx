import { useEffect } from "react";

export default function ProductCardSkeleton({setLoading}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div className="text-gray-700 animate-pulse">
      
      {/* Image Skeleton */}
      <div className="overflow-hidden">
        <div className="w-full h-64 bg-gray-300 rounded-md"></div>
      </div>

      {/* Title Skeleton */}
      <div className="pt-3 pb-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>

      {/* Price Skeleton */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

    </div>
  );
}