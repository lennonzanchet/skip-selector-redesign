import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, CheckCircle, Info, Star } from 'lucide-react';

const SkipSelector = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  const mockSkips = [
    {id: 17933, size: 4, hire_period_days: 14, price_before_vat: 278, vat: 20, allowed_on_road: true, allows_heavy_waste: true},
    {id: 17934, size: 6, hire_period_days: 14, price_before_vat: 305, vat: 20, allowed_on_road: true, allows_heavy_waste: true},
    {id: 17935, size: 8, hire_period_days: 14, price_before_vat: 375, vat: 20, allowed_on_road: true, allows_heavy_waste: true},
    {id: 17936, size: 10, hire_period_days: 14, price_before_vat: 400, vat: 20, allowed_on_road: false, allows_heavy_waste: false},
    {id: 17937, size: 12, hire_period_days: 14, price_before_vat: 439, vat: 20, allowed_on_road: false, allows_heavy_waste: false},
    {id: 17938, size: 14, hire_period_days: 14, price_before_vat: 470, vat: 20, allowed_on_road: false, allows_heavy_waste: false}
  ];

  useEffect(() => {
    setTimeout(() => {
      setSkips(mockSkips);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateTotalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getPopularBadge = (size) => {
    return size === 6 || size === 8;
  };

  const getBestValue = () => {
    const pricesPerYard = skips.map(skip => ({
      ...skip,
      pricePerYard: calculateTotalPrice(skip.price_before_vat, skip.vat) / skip.size
    }));
    return pricesPerYard.reduce((best, current) => 
      current.pricePerYard < best.pricePerYard ? current : best
    );
  };

  const SkipCard = ({ skip, isSelected, onSelect }) => {
    const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
    const isPopular = getPopularBadge(skip.size);
    const isBestValue = getBestValue().id === skip.id;

    return (
      <div 
        className={`relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 ${
          isSelected 
            ? 'border-blue-500 shadow-blue-100 shadow-xl' 
            : 'border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => onSelect(skip)}
      >
        {/* Badges */}
        <div className="absolute -top-3 left-4 flex gap-2 z-10">
          {isPopular && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              Popular
            </span>
          )}
          {isBestValue && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Best Value
            </span>
          )}
        </div>

        {/* Skip Visual */}
        <div className="p-6 pb-4">
          <div className="relative mx-auto w-32 h-20 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg transform rotate-2 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-semibold text-yellow-900 mb-1">WE WANT</div>
                <div className="text-xs font-semibold text-yellow-900">WASTE</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {skip.size} Yard Skip
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Perfect for {skip.size <= 6 ? 'small' : skip.size <= 10 ? 'medium' : 'large'} projects
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              {skip.hire_period_days} days hire
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className={`w-4 h-4 ${skip.allowed_on_road ? 'text-green-500' : 'text-gray-400'}`} />
              {skip.allowed_on_road ? 'Road placement' : 'Private land only'}
            </div>
          </div>

          {skip.allows_heavy_waste && (
            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
              <CheckCircle className="w-4 h-4" />
              Suitable for heavy waste
            </div>
          )}
        </div>

        {/* Price */}
        <div className="px-6 pb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              £{totalPrice}
            </div>
            <div className="text-sm text-gray-500">
              inc. VAT (£{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT)
            </div>
            <div className="text-xs text-gray-400 mt-1">
              £{Math.round(totalPrice / skip.size)} per yard
            </div>
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="w-6 h-6 text-blue-500 fill-current" />
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skip options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Choose Your Skip</h1>
                <p className="text-sm text-gray-600">NR32, Lowestoft</p>
              </div>
            </div>
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showComparison ? 'Hide' : 'Compare'} All
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">1</div>
                <span className="font-medium">Postcode</span>
              </div>
              <div className="w-8 h-px bg-blue-600"></div>
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">2</div>
                <span className="font-medium">Waste Type</span>
              </div>
              <div className="w-8 h-px bg-blue-600"></div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">3</div>
                <span>Select Skip</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">4</div>
                <span>Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Perfect Skip for Your Project
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of skip sizes. All prices include delivery, collection, and disposal.
            14-day hire period with flexible scheduling.
          </p>
        </div>

        {/* Comparison Table (Mobile Hidden by default) */}
        {showComparison && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Skip Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Size</th>
                    <th className="text-left p-4 font-semibold">Price</th>
                    <th className="text-left p-4 font-semibold">Per Yard</th>
                    <th className="text-left p-4 font-semibold">Road Placement</th>
                    <th className="text-left p-4 font-semibold">Heavy Waste</th>
                  </tr>
                </thead>
                <tbody>
                  {skips.map((skip) => (
                    <tr key={skip.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{skip.size} Yards</td>
                      <td className="p-4 text-green-600 font-semibold">£{calculateTotalPrice(skip.price_before_vat, skip.vat)}</td>
                      <td className="p-4 text-gray-600">£{Math.round(calculateTotalPrice(skip.price_before_vat, skip.vat) / skip.size)}</td>
                      <td className="p-4">{skip.allowed_on_road ? '✅' : '❌'}</td>
                      <td className="p-4">{skip.allows_heavy_waste ? '✅' : '❌'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Skip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={setSelectedSkip}
            />
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">What's Included</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Delivery and collection within 2-hour time slots</li>
                <li>• 14-day hire period (extensions available)</li>
                <li>• Disposal and recycling of suitable waste</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Waste Type
          </button>
          
          <div className="flex items-center gap-4">
            {selectedSkip && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Selected: {selectedSkip.size} Yard Skip</div>
                <div className="font-semibold text-gray-900">£{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)}</div>
              </div>
            )}
            
            <button 
              disabled={!selectedSkip}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                selectedSkip 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSelector;
