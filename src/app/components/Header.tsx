import { angkor } from "./fonts";

const Header = () => {
    return (
      <div className="text-center mb-4">
        <p className={` text-xl text-gray-600 dark:text-gray-300 ${angkor.className} `}>
        Calculate Your <span className="text-blue-300">Savings </span> Goals Based on <span className="text-yellow-300">Salary</span>  and <span className="text-red-300">Expenses</span> 
        </p>
        <p className={`text-xl text-gray-600 dark:text-gray-300 ${angkor.className} `}>to Reach Your Desired <span className="text-purple-300">Amount</span>  Within Your Chosen <span className="text-gray-300">Timeframe</span>.</p>
      </div>
    );
  };
  
  export default Header;