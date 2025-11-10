import React, { useState } from 'react';
import {
  AlertTriangle, Phone, Heart, Shield, X, MapPin, 
  Ambulance,
  Home, Stethoscope, UserCheck, Map, Navigation
} from 'lucide-react';
// ElderEmergencyReport removed — replaced with official resource links per request

interface SOSButtonProps {
  user?: any;
}

const SOSButton: React.FC<SOSButtonProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('nearby'); // Changed default to 'nearby'

  const emergencyContacts = [
    { name: 'জাতীয় জরুরি সেবা', number: '৯৯৯', type: 'জরুরি', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'স্বাস্থ্য বাতায়ন', number: '১৬২৬৩', type: 'স্বাস্থ্য', icon: Stethoscope, color: 'bg-green-500' },
    { name: 'বয়স্ক সেবা হটলাইন', number: '১০৯', type: 'সেবা', icon: Heart, color: 'bg-purple-500' },
    { name: 'পুলিশ হেল্পলাইন', number: '১০০', type: 'নিরাপত্তা', icon: Shield, color: 'bg-blue-500' },
    { name: 'ফায়ার সার্ভিস', number: '১০১', type: 'দুর্যোগ', icon: Ambulance, color: 'bg-orange-500' },
    { name: 'অ্যাম্বুলেন্স সেবা', number: '১০২', type: 'চিকিৎসা', icon: Ambulance, color: 'bg-pink-500' }
  ];

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  if (!isOpen) {
    return (
      <div className="fixed right-8 bottom-8 z-50 animate-bounce-in">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-2xl transition-all duration-300 hover:scale-110 group overflow-hidden flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-2xl min-w-[140px]"
          title="SOS - Make a report and get help"
        >
          {/* Animated ping effect */}
          <div className="absolute inset-0 bg-red-500 rounded-2xl animate-ping opacity-30"></div>
          
          {/* Pulsing border */}
          <div className="absolute inset-0 rounded-2xl border-4 border-yellow-400 animate-pulse"></div>
          
          {/* Icon */}
          <AlertTriangle className="w-10 h-10 relative z-10 group-hover:rotate-12 transition-transform duration-300 animate-wiggle" />
          
          {/* Text */}
          <div className="relative z-10 text-center">
            <div className="text-2xl font-black tracking-wider">SOS</div>
            <div className="text-xs font-semibold uppercase tracking-wide bg-yellow-400 text-red-900 px-2 py-0.5 rounded-full mt-1">
              Emergency
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-400/20 to-yellow-400/20 rounded-2xl animate-shimmer"></div>
        </button>
        
        {/* Help text */}
        <div className="mt-2 text-center bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
          <p className="text-xs font-bold text-red-600">Click for Help</p>
        </div>
      </div>
    );
  }

  // Help locations data
  const helpLocations = [
    {
      id: 1,
      name: 'Dhaka Metropolitan Police Headquarters',
      type: 'police',
      address: '36 Shaheed Faruk Road, Dhaka 1000',
      district: 'Dhaka',
      phone: '02-9559353',
      coordinates: { lat: 23.7465, lng: 90.3768 },
      active: true,
      volunteers: 12
    },
    {
      id: 2,
      name: 'BRAC - Elder Support Program',
      type: 'ngo',
      address: '75 Mohakhali, Dhaka 1212',
      district: 'Dhaka',
      phone: '02-9881265',
      coordinates: { lat: 23.7805, lng: 90.4046 },
      active: true,
      volunteers: 25
    },
    {
      id: 3,
      name: 'Dhaka Medical College Hospital',
      type: 'hospital',
      address: 'Bakshibazar, Dhaka 1000',
      district: 'Dhaka',
      phone: '02-55165088',
      coordinates: { lat: 23.7268, lng: 90.3988 },
      active: true,
      volunteers: 8
    },
    {
      id: 4,
      name: 'Elder Care Support Center',
      type: 'support-center',
      address: 'Banani, Dhaka 1213',
      district: 'Dhaka',
      phone: '01711-123456',
      coordinates: { lat: 23.7937, lng: 90.4066 },
      active: true,
      volunteers: 15
    },
    {
      id: 5,
      name: 'Mirpur Police Station',
      type: 'police',
      address: 'Mirpur-10, Dhaka 1216',
      district: 'Dhaka',
      phone: '02-9004400',
      coordinates: { lat: 23.8065, lng: 90.3688 },
      active: true,
      volunteers: 7
    },
    {
      id: 6,
      name: 'ASK - Ain o Salish Kendra',
      type: 'ngo',
      address: 'Purana Paltan, Dhaka 1000',
      district: 'Dhaka',
      phone: '02-9330542',
      coordinates: { lat: 23.7352, lng: 90.4144 },
      active: true,
      volunteers: 18
    },
    {
      id: 7,
      name: 'Uttara Central Hospital',
      type: 'hospital',
      address: 'Uttara Sector 3, Dhaka 1230',
      district: 'Dhaka',
      phone: '02-8952451',
      coordinates: { lat: 23.8759, lng: 90.3795 },
      active: true,
      volunteers: 10
    },
    {
      id: 8,
      name: 'HelpAge International Bangladesh',
      type: 'ngo',
      address: 'Dhanmondi, Dhaka 1209',
      district: 'Dhaka',
      phone: '02-8119984',
      coordinates: { lat: 23.7461, lng: 90.3742 },
      active: true,
      volunteers: 22
    },
    {
      id: 9,
      name: 'Gulshan Police Station',
      type: 'police',
      address: 'Gulshan Avenue, Dhaka 1212',
      district: 'Dhaka',
      phone: '02-9881212',
      coordinates: { lat: 23.7808, lng: 90.4170 },
      active: true,
      volunteers: 9
    },
    {
      id: 10,
      name: 'Dhanmondi Police Station',
      type: 'police',
      address: 'Road 27, Dhanmondi, Dhaka 1209',
      district: 'Dhaka',
      phone: '02-9671150',
      coordinates: { lat: 23.7465, lng: 90.3765 },
      active: true,
      volunteers: 8
    },
    {
      id: 11,
      name: 'Motijheel Police Station',
      type: 'police',
      address: 'Motijheel C/A, Dhaka 1000',
      district: 'Dhaka',
      phone: '02-9565566',
      coordinates: { lat: 23.7330, lng: 90.4175 },
      active: true,
      volunteers: 11
    },
    {
      id: 12,
      name: 'Banani Police Station',
      type: 'police',
      address: 'Banani Road 11, Dhaka 1213',
      district: 'Dhaka',
      phone: '02-9892333',
      coordinates: { lat: 23.7943, lng: 90.4067 },
      active: true,
      volunteers: 6
    },
    {
      id: 13,
      name: 'Uttara Police Station',
      type: 'police',
      address: 'Sector 7, Uttara, Dhaka 1230',
      district: 'Dhaka',
      phone: '02-8918875',
      coordinates: { lat: 23.8759, lng: 90.3795 },
      active: true,
      volunteers: 10
    },
    {
      id: 14,
      name: 'Mohammadpur Police Station',
      type: 'police',
      address: 'Mohammadpur, Dhaka 1207',
      district: 'Dhaka',
      phone: '02-9129090',
      coordinates: { lat: 23.7651, lng: 90.3566 },
      active: true,
      volunteers: 8
    },
    {
      id: 15,
      name: 'Tejgaon Police Station',
      type: 'police',
      address: 'Tejgaon I/A, Dhaka 1208',
      district: 'Dhaka',
      phone: '02-8878787',
      coordinates: { lat: 23.7598, lng: 90.3918 },
      active: true,
      volunteers: 7
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'police': return Shield;
      case 'ngo': return Heart;
      case 'hospital': return Ambulance;
      case 'support-center': return Home;
      default: return MapPin;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'police': return 'blue';
      case 'ngo': return 'green';
      case 'hospital': return 'red';
      case 'support-center': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white p-6 relative overflow-hidden animate-gradient">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-white animate-shimmer"></div>
          </div>
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full animate-scale-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">SOS Emergency</h2>
                <p className="text-red-100">Make a report and get help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          {[
            { id: 'nearby', label: 'Find Help Nearby', icon: MapPin },
            { id: 'emergency', label: 'Emergency Contacts', icon: Phone },
            { id: 'report', label: 'Make Report', icon: AlertTriangle }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-4 border-b-2 font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap min-w-fit ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 bg-white scale-105'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-all duration-300 ${activeTab === tab.id ? 'animate-bounce' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Emergency Contacts Tab */}
          {activeTab === 'emergency' && (
            <div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 text-red-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold font-bangla">জরুরি অবস্থায় দ্রুত কল করুন</span>
                </div>
                <p className="text-sm text-red-600 font-bangla">
                  নিচের যেকোনো নম্বরে ক্লিক করে সরাসরি কল করতে পারবেন
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleEmergencyCall(contact.number)}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-xl p-6 text-left shadow-sm hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${contact.color} p-3 rounded-full text-white group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 font-bangla group-hover:text-red-600 transition-colors">{contact.name}</h3>
                          <div className="text-3xl font-bold text-red-600 mb-1 group-hover:scale-110 transition-transform inline-block">{contact.number}</div>
                          <div className="text-sm text-gray-500 font-bangla">{contact.type}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-blue-900 font-bangla mb-1">আপনার অবস্থান শেয়ার করুন</h4>
                    <p className="text-sm text-blue-700 font-bangla">
                      জরুরি সেবা দ্রুত পৌঁছাতে আপনার বর্তমান অবস্থান শেয়ার করা গুরুত্বপূর্ণ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Report Tab - simplified: show official links only */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-bangla">জরুরি ও সহায়তা লিঙ্ক</h3>
              <p className="text-sm text-gray-700 mb-2 font-bangla">দ্রুত সহায়তার জন্য নিচের অফিসিয়াল লিঙ্কগুলো দেখুন:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a href="https://gd.police.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    https://gd.police.gov.bd/
                  </a>
                </li>
                <li>
                  <a href="https://www.cid.gov.bd/hot-line-number-for-cyber-complain" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    https://www.cid.gov.bd/hot-line-number-for-cyber-complain
                  </a>
                </li>
                <li>
                  <a href="https://www.police.gov.bd/en/police_cyber_support_for_women" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    https://www.police.gov.bd/en/police_cyber_support_for_women
                  </a>
                </li>
                <li>
                  <a href="https://digitalliteracy.gov.bd/literacy-for/ze-kon-prkar-saibar-kraim-zthazth-krtrripkshke-jananor-pddhti-zogazoger-thikana-mobail-nmbr-2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    https://digitalliteracy.gov.bd/literacy-for/ze-kon-prkar-saibar-kraim-zthazth-krtrripkshke-jananor-pddhti-zogazoger-thikana-mobail-nmbr-2
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Find Help Nearby Tab */}
          {activeTab === 'nearby' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  <Map className="w-6 h-6 mr-2 text-blue-600" />
                  Help Locations Near You - Dhaka
                </h3>
                <p className="text-gray-600 mb-4">Police stations, NGOs, hospitals, and support centers ready to help</p>
                
                {/* Interactive Map Placeholder */}
                <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.25487837759632!3d23.78097572377912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1640000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                  
                  {/* Map Legend */}
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
                    <h4 className="font-bold text-sm mb-2">Location Types</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>Police</div>
                      <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>NGO</div>
                      <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>Hospital</div>
                      <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>Support Center</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Locations Directory */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Available Help Locations ({helpLocations.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpLocations.map((location, index) => {
                    const IconComponent = getLocationIcon(location.type);
                    const color = getLocationColor(location.type);
                    
                    return (
                      <div 
                        key={location.id}
                        className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-3 bg-${color}-100 rounded-lg`}>
                            <IconComponent className={`w-6 h-6 text-${color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-gray-800">{location.name}</h4>
                              {location.active && (
                                <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 capitalize mb-2 font-medium">
                              {location.type.replace('-', ' ')}
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {location.address}
                            </p>
                            <div className="flex items-center justify-between">
                              <a 
                                href={`tel:${location.phone}`}
                                className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                {location.phone}
                              </a>
                              {location.volunteers > 0 && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  {location.volunteers} volunteers
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                              className={`mt-3 w-full bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center`}
                            >
                              <Navigation className="w-4 h-4 mr-2" />
                              Get Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Access Info */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-1">Emergency Quick Access</h4>
                    <p className="text-sm text-yellow-700">
                      In case of immediate emergency, call <strong>999</strong> (National Emergency Service) or <strong>10921</strong> (Elder Helpline).
                      These locations are available for non-emergency support and assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSButton;
