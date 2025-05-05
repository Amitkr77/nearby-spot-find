
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  href: string;
  color?: string;
}

const CategoryCard = ({
  title,
  icon,
  href,
  color = "bg-primary/10",
}: CategoryCardProps) => {
  return (
    <Link
      to={href}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border"
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn("category-icon mb-4", color)}>{icon}</div>
        <h3 className="font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
