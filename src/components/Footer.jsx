import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import paypal from "../assets/payment-methods/paypal.png"

const Footer = () => {
  return (
    <footer className="px-4 md:px-12 lg:px-28 bg-gray-100">
      <Separator/>
      <div className="flex justify-between mx-auto flex-wrap py-12">
        <div className="hidden md:flex flex-col">
          <Link
            to="/"
            className="text-xl md:text-2xl font-medium"
          >
            <span className="text-red-400">Z</span>shop
          </Link>
          <p className="italic mt-2">a store of qualityful products.</p>
        </div>
        <div className="flex flex-col">
          <h2 className="md:text-lg font-medium">
            About
          </h2>
          <div className="flex flex-col gap-1 mt-4">
            <Link className="hover:underline">Our Story</Link>
            <Link className="hover:underline">Team</Link>
            <Link className="hover:underline">Privacy Policy</Link>
            <Link className="hover:underline">Terms of Use</Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="md:text-lg font-medium">Category</h2>
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link className="hover:underline">FAQ</Link>
          </div>
        </div>
        <div>
          <h2 className="md:text-lg font-medium">
            Payment Method
          </h2>
          <img src={paypal} alt="payment method" className="w-24 h-12 mt-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
