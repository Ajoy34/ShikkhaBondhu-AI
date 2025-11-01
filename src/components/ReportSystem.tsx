import React, { useState, useEffect } from 'react';
import {
  AlertCircle, Phone, Building, MapPin, FileText,
  Clock, CheckCircle, Search, Filter, Plus, X,
  PhoneCall, MessageCircle, Shield, User, Calendar
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { awardPoints, PointAction } from '../utils/pointsSystem';
import PointsToast from './PointsToast';

interface Organization {
  id: string;
  name: string;
  name_bangla: string;
  type: string;
  contact_number: string;
  alternative_contact?: string;
  email?: string;
  address: string;
  district: string;
  service_areas: string[];
  representative_name?: string;
  representative_contact?: string;
  is_active: boolean;
}

interface Report {
  id: string;
  report_number: string;
  reporter_name: string;
  reporter_contact: string;
  incident_type: string;
  incident_description: string;
  incident_date: string;
  district: string;
  status: string;
  priority: string;
  created_at: string;
  assigned_organization_id?: string;
  organizations?: Organization;
}

interface ReportProgress {
  id: string;
  status: string;
  description: string;
  updated_by: string;
  created_at: string;
}

interface ReportSystemProps {
  user?: any;
  updateUserPoints?: (points: number) => void;
}

const ReportSystem: React.FC<ReportSystemProps> = ({ user, updateUserPoints }) => {
  const [activeView, setActiveView] = useState<'report' | 'track' | 'organizations'>('report');
  const [showOrgRegistration, setShowOrgRegistration] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportProgress, setReportProgress] = useState<ReportProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);

  const [reportForm, setReportForm] = useState({
    reporter_name: '',
    reporter_contact: '',
    reporter_email: '',
    victim_name: '',
    victim_age: '',
    incident_type: '',
    incident_description: '',
    incident_date: '',
    incident_location: '',
    district: ''
  });

  const [orgForm, setOrgForm] = useState({
    name: '',
    name_bangla: '',
    type: 'ngo',
    contact_number: '',
    alternative_contact: '',
    email: '',
    address: '',
    district: '',
    representative_name: '',
    representative_contact: ''
  });

  const incidentTypes = [
    'নারী নির্যাতন',
    'শিশু নির্যাতন',
    'গার্হস্থ্য সহিংসতা',
    'যৌন হয়রানি',
    'এসিড হামলা',
    'যৌতুক সহিংসতা',
    'বাল্যবিবাহ',
    'অন্যান্য'
  ];

  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল',
    'রংপুর', 'ময়মনসিংহ', 'কুমিল্লা', 'নারায়ণগঞ্জ'
  ];

  const statusLabels: { [key: string]: string } = {
    'registered': 'নিবন্ধিত',
    'received': 'প্রাপ্ত',
    'investigating': 'তদন্তাধীন',
    'action_taken': 'ব্যবস্থা নেওয়া হয়েছে',
    'closed': 'সমাপ্ত'
  };

  useEffect(() => {
    if (activeView === 'organizations') {
      loadOrganizations();
    } else if (activeView === 'track') {
      loadReports();
    }
  }, [activeView]);

  const loadOrganizations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (data) setOrganizations(data);
    setLoading(false);
  };

  const loadReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*, organizations(*)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (data) setReports(data);
    setLoading(false);
  };

  const loadReportProgress = async (reportId: string) => {
    const { data } = await supabase
      .from('report_progress')
      .select('*')
      .eq('report_id', reportId)
      .order('created_at', { ascending: true });

    if (data) setReportProgress(data);
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('reports')
      .insert([{
        ...reportForm,
        victim_age: reportForm.victim_age ? parseInt(reportForm.victim_age) : null,
        report_number: ''
      }])
      .select()
      .single();

    if (data && !error) {
      await supabase
        .from('report_progress')
        .insert([{
          report_id: data.id,
          status: 'registered',
          description: 'রিপোর্ট সফলভাবে নিবন্ধিত হয়েছে',
          updated_by: 'সিস্টেম'
        }]);

      alert(`রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে। রিপোর্ট নম্বর: ${data.report_number}`);
      
      // Award points for submitting report
      if (user) {
        awardPoints(user.email || 'user', 'SUBMIT_REPORT', (points, action) => {
          setPointsToast({ points, action });
          if (updateUserPoints) {
            updateUserPoints(points);
          }
        });
      }
      
      setReportForm({
        reporter_name: '',
        reporter_contact: '',
        reporter_email: '',
        victim_name: '',
        victim_age: '',
        incident_type: '',
        incident_description: '',
        incident_date: '',
        incident_location: '',
        district: ''
      });
    } else {
      alert('রিপোর্ট জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }

    setLoading(false);
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('organizations')
      .insert([orgForm]);

    if (!error) {
      alert('সংগঠন নিবন্ধন সফল হয়েছে। যাচাইয়ের পর সক্রিয় করা হবে।');
      setShowOrgRegistration(false);
      setOrgForm({
        name: '',
        name_bangla: '',
        type: 'ngo',
        contact_number: '',
        alternative_contact: '',
        email: '',
        address: '',
        district: '',
        representative_name: '',
        representative_contact: ''
      });
    } else {
      alert('নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }

    setLoading(false);
  };

  const handleViewReport = async (report: Report) => {
    setSelectedReport(report);
    await loadReportProgress(report.id);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-red-600 mr-3" />
            নারী ও শিশু নির্যাতন রিপোর্ট সিস্টেম
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
            নিরাপদ এবং গোপনীয়ভাবে রিপোর্ট করুন। আমরা আপনার পাশে আছি।
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <PhoneCall className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="text-xl font-bold text-red-800 font-bangla">জরুরি হেল্পলাইন</h3>
                <p className="text-gray-600 font-bangla">যেকোনো জরুরি পরিস্থিতিতে কল করুন</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="tel:121" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-700 transition-colors">
                121
              </a>
              <a href="tel:999" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-700 transition-colors">
                999
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveView('report')}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
              activeView === 'report' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-bangla">রিপোর্ট করুন</span>
          </button>
          <button
            onClick={() => setActiveView('track')}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
              activeView === 'track' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="font-bangla">রিপোর্ট ট্র্যাক করুন</span>
          </button>
          <button
            onClick={() => setActiveView('organizations')}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
              activeView === 'organizations' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="font-bangla">সহায়ক সংগঠন</span>
          </button>
        </div>

        {activeView === 'report' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800 font-bangla">
                    আপনার তথ্য সম্পূর্ণ গোপনীয় থাকবে। প্রয়োজনে বেনামে রিপোর্ট করতে পারেন।
                  </div>
                </div>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      রিপোর্টকারীর নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportForm.reporter_name}
                      onChange={(e) => setReportForm({...reportForm, reporter_name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      যোগাযোগ নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={reportForm.reporter_contact}
                      onChange={(e) => setReportForm({...reportForm, reporter_contact: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ইমেইল (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={reportForm.reporter_email}
                      onChange={(e) => setReportForm({...reportForm, reporter_email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ভুক্তভোগীর নাম (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={reportForm.victim_name}
                      onChange={(e) => setReportForm({...reportForm, victim_name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ভুক্তভোগীর বয়স
                    </label>
                    <input
                      type="number"
                      value={reportForm.victim_age}
                      onChange={(e) => setReportForm({...reportForm, victim_age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ঘটনার ধরণ *
                    </label>
                    <select
                      required
                      value={reportForm.incident_type}
                      onChange={(e) => setReportForm({...reportForm, incident_type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-bangla"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {incidentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ঘটনার তারিখ *
                    </label>
                    <input
                      type="date"
                      required
                      value={reportForm.incident_date}
                      onChange={(e) => setReportForm({...reportForm, incident_date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      জেলা *
                    </label>
                    <select
                      required
                      value={reportForm.district}
                      onChange={(e) => setReportForm({...reportForm, district: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-bangla"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                    ঘটনার স্থান *
                  </label>
                  <input
                    type="text"
                    required
                    value={reportForm.incident_location}
                    onChange={(e) => setReportForm({...reportForm, incident_location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                    ঘটনার বিস্তারিত বিবরণ *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={reportForm.incident_description}
                    onChange={(e) => setReportForm({...reportForm, incident_description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="যতটা সম্ভব বিস্তারিত লিখুন..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 font-bangla"
                  >
                    {loading ? 'জমা দেওয়া হচ্ছে...' : 'রিপোর্ট জমা দিন'}
                  </button>
                  <a
                    href="tel:121"
                    className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-bangla">121 এ কল করুন</span>
                  </a>
                </div>
              </form>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-bangla">
                সহায়তা প্রয়োজন?
              </h3>
              <p className="text-gray-700 mb-4 font-bangla">
                রিপোর্ট করতে বা আইনি পরামর্শের জন্য আমাদের কাস্টমার কেয়ার টিমের সাথে যোগাযোগ করুন।
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bangla">লাইভ চ্যাট</span>
                </button>
                <a href="tel:121" className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-bangla">ফোন সহায়তা</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeView === 'track' && (
          <div className="max-w-6xl mx-auto">
            {!selectedReport ? (
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex items-center space-x-4">
                    <Search className="w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="রিপোর্ট নম্বর দিয়ে খুঁজুন..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-bangla"
                    />
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-bangla">
                      খুঁজুন
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {report.report_number}
                          </h3>
                          <p className="text-gray-600 font-bangla mb-2">{report.incident_type}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {report.district}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(report.created_at).toLocaleDateString('bn-BD')}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-bangla ${
                            report.status === 'closed' ? 'bg-green-100 text-green-800' :
                            report.status === 'action_taken' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {statusLabels[report.status]}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            report.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.priority}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewReport(report)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-bangla"
                      >
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <X className="w-5 h-5" />
                  <span className="font-bangla">ফিরে যান</span>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedReport.report_number}
                </h2>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-bangla">রিপোর্ট অগ্রগতি</h3>
                  <div className="relative">
                    {reportProgress.map((progress, index) => (
                      <div key={progress.id} className="flex items-start space-x-4 mb-6 relative">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === reportProgress.length - 1 ? 'bg-green-600' : 'bg-blue-600'
                          }`}>
                            {index === reportProgress.length - 1 ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Clock className="w-6 h-6 text-white" />
                            )}
                          </div>
                          {index < reportProgress.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 ml-5 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 font-bangla">
                            {statusLabels[progress.status]}
                          </h4>
                          <p className="text-gray-600 text-sm font-bangla">{progress.description}</p>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(progress.created_at).toLocaleString('bn-BD')} - {progress.updated_by}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReport.organizations && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-bangla">
                      নিয়োজিত সংগঠন
                    </h3>
                    <div className="space-y-2">
                      <p className="font-bangla"><strong>নাম:</strong> {selectedReport.organizations.name_bangla}</p>
                      <p className="font-bangla"><strong>যোগাযোগ:</strong> {selectedReport.organizations.contact_number}</p>
                      {selectedReport.organizations.representative_name && (
                        <p className="font-bangla">
                          <strong>প্রতিনিধি:</strong> {selectedReport.organizations.representative_name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeView === 'organizations' && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-bangla">
                সহায়ক সংগঠন সমূহ
              </h3>
              <button
                onClick={() => setShowOrgRegistration(true)}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla"
              >
                <Plus className="w-5 h-5" />
                <span>সংগঠন নিবন্ধন করুন</span>
              </button>
            </div>

            {showOrgRegistration && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 font-bangla">
                    নতুন সংগঠন নিবন্ধন
                  </h3>
                  <button onClick={() => setShowOrgRegistration(false)}>
                    <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleOrgSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={orgForm.name}
                        onChange={(e) => setOrgForm({...orgForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        সংগঠনের নাম (বাংলায়) *
                      </label>
                      <input
                        type="text"
                        required
                        value={orgForm.name_bangla}
                        onChange={(e) => setOrgForm({...orgForm, name_bangla: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        সংগঠনের ধরণ *
                      </label>
                      <select
                        required
                        value={orgForm.type}
                        onChange={(e) => setOrgForm({...orgForm, type: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-bangla"
                      >
                        <option value="police">পুলিশ</option>
                        <option value="govt">সরকারি অফিস</option>
                        <option value="ngo">এনজিও</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        প্রধান যোগাযোগ নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={orgForm.contact_number}
                        onChange={(e) => setOrgForm({...orgForm, contact_number: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        বিকল্প যোগাযোগ
                      </label>
                      <input
                        type="tel"
                        value={orgForm.alternative_contact}
                        onChange={(e) => setOrgForm({...orgForm, alternative_contact: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={orgForm.email}
                        onChange={(e) => setOrgForm({...orgForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        জেলা *
                      </label>
                      <select
                        required
                        value={orgForm.district}
                        onChange={(e) => setOrgForm({...orgForm, district: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-bangla"
                      >
                        <option value="">নির্বাচন করুন</option>
                        {districts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        প্রতিনিধির নাম
                      </label>
                      <input
                        type="text"
                        value={orgForm.representative_name}
                        onChange={(e) => setOrgForm({...orgForm, representative_name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                        প্রতিনিধির যোগাযোগ
                      </label>
                      <input
                        type="text"
                        value={orgForm.representative_contact}
                        onChange={(e) => setOrgForm({...orgForm, representative_contact: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                      ঠিকানা *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={orgForm.address}
                      onChange={(e) => setOrgForm({...orgForm, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 font-bangla"
                  >
                    {loading ? 'নিবন্ধন হচ্ছে...' : 'সংগঠন নিবন্ধন করুন'}
                  </button>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map(org => (
                <div key={org.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      org.type === 'police' ? 'bg-blue-100' :
                      org.type === 'govt' ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      <Building className={`w-6 h-6 ${
                        org.type === 'police' ? 'text-blue-600' :
                        org.type === 'govt' ? 'text-green-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-bangla">{org.name_bangla}</h4>
                      <p className="text-sm text-gray-500 font-bangla">
                        {org.type === 'police' ? 'পুলিশ' : org.type === 'govt' ? 'সরকারি' : 'এনজিও'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{org.contact_number}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-bangla">{org.district}</span>
                    </div>
                    {org.representative_name && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-bangla">{org.representative_name}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`tel:${org.contact_number}`}
                    className="block w-full bg-red-600 text-white py-2 px-4 rounded-lg text-center hover:bg-red-700 transition-colors font-bangla"
                  >
                    যোগাযোগ করুন
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Points Toast Notification */}
      {pointsToast && (
        <PointsToast
          points={pointsToast.points}
          action={pointsToast.action}
          onClose={() => setPointsToast(null)}
        />
      )}
    </div>
  );
};

export default ReportSystem;
