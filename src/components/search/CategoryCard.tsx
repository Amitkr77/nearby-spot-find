
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
      className="block overflow-hidden group"
    >
      <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border hover:-translate-y-1 flex flex-col items-center text-center">
        <div className={cn("rounded-full mb-4 p-4 transition-colors", color, "group-hover:bg-primary group-hover:text-white")}>
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
