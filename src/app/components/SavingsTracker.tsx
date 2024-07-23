"use client";

import React, { useState } from "react";
import { audiowide, honk } from "./fonts";
import Coin from "./coin";
import Header from "./Header";

interface Currency {
  code: string;
  symbol: string;
}

interface TimeFrame {
  years: number;
  months: number;
  days: number;
}

interface Expenses {
  food: string;
  rent: string;
  utilities: string;
  familyObligations: string;
  other: string;
}

export default function SavingsTracker() {
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>({
    years: 0,
    months: 1,
    days: 0,
  });
  const [currency, setCurrency] = useState<string>("USD");
  const [result, setResult] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expenses>({
    food: "",
    rent: "",
    utilities: "",
    familyObligations: "",
    other: "",
  });

  const currencies: Currency[] = [
    { code: "USD", symbol: "$" }, // United States Dollar
    { code: "EUR", symbol: "€" }, // Euro
    { code: "GBP", symbol: "£" }, // British Pound Sterling
    { code: "JPY", symbol: "¥" }, // Japanese Yen
    { code: "AUD", symbol: "A$" }, // Australian Dollar
    { code: "CAD", symbol: "C$" }, // Canadian Dollar
    { code: "CHF", symbol: "CHF" }, // Swiss Franc
    { code: "CNY", symbol: "¥" }, // Chinese Yuan
    { code: "HKD", symbol: "HK$" }, // Hong Kong Dollar
    { code: "NZD", symbol: "NZ$" }, // New Zealand Dollar
    { code: "SEK", symbol: "kr" }, // Swedish Krona
    { code: "KRW", symbol: "₩" }, // South Korean Won
    { code: "SGD", symbol: "S$" }, // Singapore Dollar
    { code: "NOK", symbol: "kr" }, // Norwegian Krone
    { code: "MXN", symbol: "$" }, // Mexican Peso
    { code: "INR", symbol: "₹" }, // Indian Rupee
    { code: "RUB", symbol: "₽" }, // Russian Ruble
    { code: "ZAR", symbol: "R" }, // South African Rand
    { code: "TRY", symbol: "₺" }, // Turkish Lira
    { code: "BRL", symbol: "R$" }, // Brazilian Real
    { code: "TWD", symbol: "NT$" }, // New Taiwan Dollar
    { code: "DKK", symbol: "kr" }, // Danish Krone
    { code: "PLN", symbol: "zł" }, // Polish Zloty
    { code: "THB", symbol: "฿" }, // Thai Baht
    { code: "MYR", symbol: "RM" }, // Malaysian Ringgit
    { code: "IDR", symbol: "Rp" }, // Indonesian Rupiah
    { code: "HUF", symbol: "Ft" }, // Hungarian Forint
    { code: "CZK", symbol: "Kč" }, // Czech Koruna
    { code: "ILS", symbol: "₪" }, // Israeli New Shekel
    { code: "CLP", symbol: "$" }, // Chilean Peso
    { code: "PHP", symbol: "₱" }, // Philippine Peso
    { code: "AED", symbol: "د.إ" }, // United Arab Emirates Dirham
    { code: "VND", symbol: "₫" }, // Vietnamese Dong
    { code: "SAR", symbol: "﷼" }, // Saudi Riyal
    { code: "EGP", symbol: "£" }, // Egyptian Pound
    { code: "BDT", symbol: "৳" }, // Bangladeshi Taka
    { code: "PKR", symbol: "₨" }, // Pakistani Rupee
    { code: "KWD", symbol: "د.ك" }, // Kuwaiti Dinar
    { code: "QAR", symbol: "﷼" }, // Qatari Riyal
    { code: "OMR", symbol: "﷼" }, // Omani Rial
    { code: "IQD", symbol: "ع.د" }, // Iraqi Dinar
    { code: "LKR", symbol: "₨" }, // Sri Lankan Rupee
    { code: "NGN", symbol: "₦" }, // Nigerian Naira
    { code: "MAD", symbol: "د.م." }, // Moroccan Dirham
    { code: "DZD", symbol: "د.ج" }, // Algerian Dinar
    { code: "TND", symbol: "د.ت" }, // Tunisian Dinar
    { code: "KES", symbol: "KSh" }, // Kenyan Shilling
    { code: "UGX", symbol: "USh" }, // Ugandan Shilling
    { code: "TZS", symbol: "TSh" }, // Tanzanian Shilling
    { code: "ETB", symbol: "ብር" }, // Ethiopian Birr
    { code: "GHS", symbol: "₵" }, // Ghanaian Cedi
    { code: "XOF", symbol: "CFA" }, // West African CFA Franc
    { code: "XAF", symbol: "FCFA" }, // Central African CFA Franc
    { code: "ZMW", symbol: "ZK" }, // Zambian Kwacha
    { code: "BWP", symbol: "P" }, // Botswanan Pula
    { code: "NAD", symbol: "N$" }, // Namibian Dollar
    { code: "MUR", symbol: "₨" }, // Mauritian Rupee
    { code: "SCR", symbol: "₨" }, // Seychellois Rupee
    { code: "MWK", symbol: "MK" }, // Malawian Kwacha
    { code: "MZN", symbol: "MT" }, // Mozambican Metical
    { code: "AOA", symbol: "Kz" }, // Angolan Kwanza
    { code: "BHD", symbol: ".د.ب" }, // Bahraini Dinar
    { code: "KZT", symbol: "₸" }, // Kazakhstani Tenge
    { code: "UZS", symbol: "лв" }, // Uzbekistani Som
    { code: "BYN", symbol: "Br" }, // Belarusian Ruble
    { code: "UAH", symbol: "₴" }, // Ukrainian Hryvnia
    { code: "GEL", symbol: "₾" }, // Georgian Lari
    { code: "AMD", symbol: "֏" }, // Armenian Dram
    { code: "AZN", symbol: "₼" }, // Azerbaijani Manat
    { code: "KGS", symbol: "лв" }, // Kyrgyzstani Som
    { code: "TJS", symbol: "SM" }, // Tajikistani Somoni
    { code: "MNT", symbol: "₮" }, // Mongolian Tugrik
    { code: "LAK", symbol: "₭" }, // Laotian Kip
    { code: "KHR", symbol: "៛" }, // Cambodian Riel
    { code: "MMK", symbol: "K" }, // Myanmar Kyat
    { code: "NPR", symbol: "₨" }, // Nepalese Rupee
    { code: "LKR", symbol: "₨" }, // Sri Lankan Rupee
    { code: "BND", symbol: "B$" }, // Brunei Dollar
    { code: "FJD", symbol: "$" }, // Fijian Dollar
    { code: "PGK", symbol: "K" }, // Papua New Guinean Kina
    { code: "SBD", symbol: "$" }, // Solomon Islands Dollar
    { code: "TOP", symbol: "T$" }, // Tongan Pa'anga
    { code: "VUV", symbol: "VT" }, // Vanuatu Vatu
    { code: "WST", symbol: "WS$" }, // Samoan Tala
    { code: "BBD", symbol: "$" }, // Barbadian Dollar
    { code: "BZD", symbol: "BZ$" }, // Belize Dollar
    { code: "BMD", symbol: "$" }, // Bermudian Dollar
    { code: "KYD", symbol: "$" }, // Cayman Islands Dollar
    { code: "GYD", symbol: "$" }, // Guyanaese Dollar
    { code: "JMD", symbol: "J$" }, // Jamaican Dollar
    { code: "XCD", symbol: "$" }, // East Caribbean Dollar
    { code: "SRD", symbol: "$" }, // Surinamese Dollar
    { code: "TTD", symbol: "TT$" }, // Trinidad and Tobago Dollar
    { code: "BSD", symbol: "$" }, // Bahamian Dollar
    { code: "CUP", symbol: "₱" }, // Cuban Peso
    { code: "DOP", symbol: "RD$" }, // Dominican Peso
    { code: "HTG", symbol: "G" }, // Haitian Gourde
    { code: "NIO", symbol: "C$" }, // Nicaraguan Córdoba
    { code: "PYG", symbol: "₲" }, // Paraguayan Guarani
    { code: "PEN", symbol: "S/" }, // Peruvian Sol
  ];

  const resetForm = () => {
    setMonthlySalary("");
    setProductPrice("");
    setTimeFrame({ years: 0, months: 1, days: 0 });
    setCurrency("USD");
    setResult(null);
    setExpenses({
      food: "",
      rent: "",
      utilities: "",
      familyObligations: "",
      other: "",
    });
  };

  const calculateSavings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalDays =
      timeFrame.years * 365 + timeFrame.months * 30 + timeFrame.days;
    if (totalDays < 30) {
      setResult("Time frame must be at least 1 month!");
      return;
    }

    const totalMonths =
      timeFrame.years * 12 + timeFrame.months + timeFrame.days / 30;
    const totalExpenses = Object.values(expenses).reduce(
      (sum, expense) => sum + (parseFloat(expense) || 0),
      0
    );
    const monthlySavingsNeeded = parseFloat(productPrice) / totalMonths;
    const availableSavings = parseFloat(monthlySalary) - totalExpenses;

    if (monthlySavingsNeeded > availableSavings) {
      setResult(
        "Oops! Unless you're a time traveler or have a secret money tree, that's impossible! Try a longer time frame, reduce expenses, or choose a cheaper desired amount."
      );
    } else {
      const currencySymbol =
        currencies.find((c) => c.code === currency)?.symbol || "$";
      setResult(
        `You need to save ${currencySymbol}${monthlySavingsNeeded.toFixed(
          2
        )} per month. Your available savings after expenses: ${currencySymbol}${availableSavings.toFixed(
          2
        )}. Total savings over ${totalMonths.toFixed(
          1
        )} months: ${currencySymbol}${(
          monthlySavingsNeeded * totalMonths
        ).toFixed(2)}`
      );
    }
  };

  const renderExpenseInput = (key: keyof Expenses, placeholder: string) => (
    <input
      type="number"
      value={expenses[key]}
      onChange={(e) => setExpenses({ ...expenses, [key]: e.target.value })}
      className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
      placeholder={placeholder}
    />
  );

  const handleTimeFrameChange = (field: keyof TimeFrame, value: string) => {
    const numValue = parseInt(value) || 0;
    setTimeFrame((prev) => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-200 rounded">
      <h1 className={`text-5xl text-center mb-6 ${honk.className}`}>
        Savings Tracker
      </h1>
      <Header />
      <div className="flex justify-center mt-5">
        <Coin />
      </div>
      <form onSubmit={calculateSavings} className="space-y-4">
        <div>
          <label
            htmlFor="monthlySalary"
            className={`block mb-1 ${audiowide.className}`}
          >
            Monthly Salary:
          </label>
          <input
            type="number"
            id="monthlySalary"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="productPrice"
            className={`block mb-1 ${audiowide.className}`}
          >
            Desired Amount:
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className={`block mb-1 ${audiowide.className}`}>
            Time Frame:
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={timeFrame.years || ""}
              onChange={(e) => handleTimeFrameChange("years", e.target.value)}
              min="0"
              className="w-1/3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Years"
            />
            <input
              type="number"
              value={timeFrame.months || ""}
              onChange={(e) => handleTimeFrameChange("months", e.target.value)}
              min="0"
              max="11"
              className="w-1/3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Months"
            />
            <input
              type="number"
              value={timeFrame.days || ""}
              onChange={(e) => handleTimeFrameChange("days", e.target.value)}
              min="0"
              max="30"
              className="w-1/3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Days"
            />
          </div>
        </div>

        <div>
          <label className={`block mb-1 ${audiowide.className}`}>
            Monthly Expenses:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {renderExpenseInput("food", "Food")}
            {renderExpenseInput("rent", "Rent")}
            {renderExpenseInput("utilities", "Utilities")}
            {renderExpenseInput("familyObligations", "Family Obligations")}
          </div>
          <div className="mt-2 flex justify-center">
            {renderExpenseInput("other", "Other Expenses")}
          </div>
        </div>

        <div>
          <label
            htmlFor="currency"
            className={`block mb-1 ${audiowide.className}`}
          >
            Currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-600 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  );
}
