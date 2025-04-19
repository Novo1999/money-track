import React from 'react';
import { 
  ShoppingBag, 
  Home, 
  Car, 
  Lightbulb, 
  Stethoscope,
  Film,
  Plane,
  BookOpen,
  Scissors,
  Gift,
  DollarSign,
  Coffee
} from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'food':
      return <Coffee className="h-5 w-5 text-blue-500" />;
    case 'shopping':
      return <ShoppingBag className="h-5 w-5 text-blue-500" />;
    case 'housing':
      return <Home className="h-5 w-5 text-blue-500" />;
    case 'transportation':
      return <Car className="h-5 w-5 text-blue-500" />;
    case 'utilities':
      return <Lightbulb className="h-5 w-5 text-blue-500" />;
    case 'healthcare':
      return <Stethoscope className="h-5 w-5 text-blue-500" />;
    case 'entertainment':
      return <Film className="h-5 w-5 text-blue-500" />;
    case 'travel':
      return <Plane className="h-5 w-5 text-blue-500" />;
    case 'education':
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case 'personal':
      return <Scissors className="h-5 w-5 text-blue-500" />;
    case 'gifts':
      return <Gift className="h-5 w-5 text-blue-500" />;
    default:
      return <DollarSign className="h-5 w-5 text-blue-500" />;
  }
};